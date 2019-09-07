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
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="messageList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="MESSAGE_STATUS[action]" />
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
                <a-form-item v-if="action == 'edit'" label="留言ID">
                    <a-input v-decorator="['id', {initialValue: initialMessage.id}]" disabled />
                </a-form-item>
                <a-form-item label="留言序号">
                    <a-input v-decorator="['sortnum', {initialValue: initialMessage.sortnum}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="留言姓名">
                    <a-input v-decorator="['name', {rules: [{required: allowEdit,}], initialValue: initialMessage.name || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="留言手机">
                    <a-input v-decorator="['phone', {rules: [{required: allowEdit, pattern: allowEdit && /^1[3456789]\d{9}$/, message: '错误的手机号码'}], initialValue: initialMessage.phone || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item label="留言邮箱">
                    <a-input v-decorator="['email', {rules: [{type: 'email'}],initialValue: initialMessage.email || ''}]" :disabled="!allowEdit" />
                </a-form-item>
                <a-form-item >
                    <span slot="label">附件图片<span v-if="allowEdit" style="color:rgba(0,0,0,0.45);font-size:13px;">(只能上传jpg,png,gif)</span></span>
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        v-decorator="['fileList', {rules: [{required: allowEdit, validator: allowEdit && validateImage}]}]"
                        :disabled="!allowEdit"
                        :fileList="initialMessage.photos"
                        @preview="handlePhotoPreview"
                    >
                        <div v-if="initialMessage.photos && initialMessage.photos.length == 0">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
                <a-form-item label="留言状态">
                    <a-radio-group v-decorator="['state', {initialValue: initialMessage.state}]" :disabled="!allowEdit" buttonStyle="solid" >
                        <a-radio-button value="未查看">未查看</a-radio-button>
                        <a-radio-button value="已查看">已查看</a-radio-button>
                        <a-radio-button value="已回复">已回复</a-radio-button>
                        <a-radio-button value="已置顶">已置顶</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </template>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getMessageList, getMessageDetail, updateMessage, deleteMessage } from '@/api/message';
    import config from './config'

    export default {
        name: 'Message',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                MESSAGE_STATUS: config.MESSAGE_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                messageList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                filters: config.filters,
                photoPreviewVisible: false,
                previewPhoto: '',
                // ***************************
                action: '',
                initialMessage: {},
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
            this.getMessageListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(id) {
                this.deleteMessageFn([id]);
			},
			delMultiItems() {
				const deleteList = this.messageList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = deleteList.map(item => item.id);
                this.deleteMessageFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilterValues', values);
                this.getMessageListFn(values);
            },
            handleFilterReset () {
                this.getMessageListFn();
            },
            handleChange (pagination) {
                if (!this.messageList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getMessageListFn();
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
			handlePhotoChange({ fileList }) {
                // console.log('handlePhotoChange', fileList);
                this.initialMessage.photos = fileList;
            },
            showModal (action, editId) {
                if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = this.allowEdit ? '编辑留言' : '查看留言';
                    this.getMessageDetailFn();
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
                    // console.log('form.isFieldsTouched()', this.form.isFieldsTouched());
                    this.form.validateFields((err, values) => {
                        if (!err) {
                            if (this.form.isFieldsTouched()) {
                                console.log('form values: ', values);
                                if(this.action == 'edit') {
                                    this.updateMessageFn(values);
                                }
                            } else {
                                this.handleCancel();
                            }
                        }
                    })
                }
            },
            resetFormData () {
                this.initialMessage.reply = '';
                this.allowEdit && this.form.resetFields();
            },
            // api
            async getMessageListFn (filters={}) {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getMessageList(params);
                this.loading = false;
				this.messageList = data.data;
                this.currentPage = data.current;
				this.pagination = {
					total: data.total,
					...config.pagination
				};

                this.allowEdit && this.resetFormData();
            },
            async getMessageDetailFn () {
                const data = await getMessageDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialMessage = data.data;
                    this.visible = true;
                }
            },
            async updateMessageFn (params) {
                this.okBtnDisabled = true;
                const data = await updateMessage(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getMessageListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async deleteMessageFn (ids) {
                const params = { ids: ids };
                const data = await deleteMessage(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getMessageListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>