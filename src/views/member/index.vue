<template>
	<PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :filters="filters"
        :withModal="withModal"
        :allowAdd="allowAdd"
        :visible="visible"
        :modalTitle="modalTitle"
        :okBtnDisabled="okBtnDisabled"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterAfterSlot="{ filterForm }">
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="memberList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <template slot="avatarSlot" slot-scope="action">
                    <span v-if="!action">暂无</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action" style="width:30px;height:30px;" alt=""></a>
                </template>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="MEMBER_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="showModal('edit', record.id)">{{allowEdit ? '编辑' : '查看'}}</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
        <template slot="formSlot">
            <a-form layout="vertical" :form="form">
                <a-form-item v-if="action == 'edit'" label="会员ID">
                    <a-input v-decorator="['id', {initialValue: initialMember.id}]" disabled />
                </a-form-item>
                <a-form-item label="会员序号">
                    <a-input v-decorator="['sortnum', {initialValue: initialMember.sortnum}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="会员姓名">
                    <a-input v-decorator="['name', {rules: [{required: allowEdit,}], initialValue: initialMember.name || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item >
                    <span slot="label">会员头像<span v-if="allowEdit" style="color:rgba(0,0,0,0.45);font-size:13px;">(只能上传jpg,png,gif)</span></span>
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        v-decorator="['fileList', {rules: [{required: allowEdit, validator: allowEdit && validateImage}]}]"
                        :disabled="!allowEdit"
                        :fileList="fileList"
                        :remove="() => { return allowEdit;}"
                        :beforeUpload="beforeUpload"
                        @preview="handlePhotoPreview"
                        @change="handlePhotoChange"
                    >
                        <div v-if="fileList.length == 0">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="会员手机">
                    <a-input v-decorator="['phone', {rules: [{required: allowEdit, pattern: allowEdit && /^1[3456789]\d{9}$/, message: '错误的手机号码'}], initialValue: initialMember.phone || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="会员邮箱">
                    <a-input v-decorator="['email', {initialValue: initialMember.email || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="会员性别">
                    <a-radio-group v-decorator="['gender', {initialValue: initialMember.gender+''}]" :disabled="!allowEdit" buttonStyle="solid" >
                        <a-radio-button value="0">女</a-radio-button>
                        <a-radio-button value="1">男</a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="会员状态">
                    <a-radio-group v-decorator="['state', {initialValue: initialMember.state}]" :disabled="!allowEdit" buttonStyle="solid" >
                        <a-radio-button value="已冻结">已冻结</a-radio-button>
                        <a-radio-button value="待审核">待审核</a-radio-button>
                        <a-radio-button value="已审核">已审核</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </template>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getMemberList, addMember, getMemberDetail, updateMember, deleteMember } from '@/api/member';
    import config from './config'
    import Tools from '@/utils/Tools';

    export default {
        name: 'Banner',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                MEMBER_STATUS: config.MEMBER_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                memberList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                filters: config.filters,
                // ***************************
                action: '',
                initialMember: {},
                photoPreviewVisible: false,
                previewPhoto: '',
                fileList: [],
            }
        },
        computed: {
			rowSelection () {
				let { selectedRowKeys } = this;
				return {
					selectedRowKeys,
					onChange: this.checkItems,
				}
			}
		},
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created () {
            this.getMemberListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(id) {
                this.deleteMemberFn([id]);
			},
			delMultiItems() {
				const deleteList = this.memberList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = Tools.pluck(deleteList, 'id');
                this.deleteMemberFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilterValues', values);
                this.getMemberListFn(values);
            },
            handleFilterReset () {
                this.getMemberListFn();
            },
            handleChange (pagination) {
                if (!this.memberList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getMemberListFn();
			},
            handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
            },
			handlePhotoPreview(file) {
                if (typeof file === 'string') {
                    this.previewPhoto = file;
                }
                if (typeof file === 'object') {
                    this.previewPhoto = file.url || file.thumbUrl;
                }
				this.photoPreviewVisible = true;
            },
            beforeUpload (file, fileList) {
                console.log('beforeUpload', file, fileList);
                // TODO 此处自行处理上传逻辑
                // return false;
            },
			handlePhotoChange({ fileList }) {
                // console.log('handlePhotoChange', fileList);
                this.fileList = fileList;
            },
            validateImage (rule, value, callback) {
                console.log('validateImage',  value)
                if (!this.fileList.length) {
                    if (!value || !value.fileList.length) {
                        callback(new Error('请上传用户头像'));
                    }
                }
                callback();
            },
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增信息';
                    this.visible = true;
                } else if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = this.allowEdit ? '编辑信息' : '查看信息';
                    this.getMemberDetailFn();
                } else {
                    this.$message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                if (!this.allowEdit) {
                    this.handleCancel();
                } else {
                    console.log('form.isFieldsTouched()', this.form.isFieldsTouched());
                    this.form.validateFields((err, values) => {
                        if (!err) {
                            if (this.form.isFieldsTouched()) {
                                // 处理参数
                                if (typeof values.fileList !== 'undefined') {
                                    let imageArr = [];
                                    values.fileList.fileList.length && values.fileList.fileList.map(item => {
                                        imageArr.push({url: item.response.url, name: item.name, size: item.size, type: item.type})
                                    })
                                    values.image = imageArr;
                                } else {
                                    values.image = this.fileList;
                                }
                                delete values.fileList;

                                console.log('form values: ', values);
                                if (this.action == 'add') {
                                    this.addMemberFn(values);
                                }
                                if(this.action == 'edit') {
                                    this.updateMemberFn(values);
                                }
                            } else {
                                this.handleCancel();
                            }
                        }
                    })
                }
            },
            resetFormData () {
                this.initialMember = {};
                this.fileList = [];
                this.allowEdit && this.form.resetFields();
            },
            // api
            async getMemberListFn (filters={}) {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getMemberList(params);
                this.loading = false;
				this.memberList = data.data;
                this.currentPage = data.current;
				this.pagination = {
					total: data.total,
					...config.pagination
				};

                this.allowEdit && this.resetFormData();
            },
            async getMemberDetailFn () {
                const data = await getMemberDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialMember = data.data;
                    this.fileList = [{
                        name: 'avatar',
                        url: data.data.avatar,
                        status: 'done',
                        uid: '-1',
                    }];
                    this.visible = true;
                }
            },
            async addMemberFn (params) {
                this.okBtnDisabled = true;
                const data = await addMember(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getMemberListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateMemberFn (params) {
                this.okBtnDisabled = true;
                const data = await updateMember(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getMemberListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async deleteMemberFn (ids) {
                const params = { ids: ids };
                const data = await deleteMember(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getMemberListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>