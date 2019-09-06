<template>
	<PageSkeleton
        :withModal="withModal"
        :withFilter="withFilter"
        :allowAdd="allowAdd"
        :visible="visible"
        :modalTitle="modalTitle"
        :okBtnDisabled="okBtnDisabled"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        @delItem="delItem"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >

        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="infoClassList" :pagination="false" :rowSelection="null" bordered >
            <template slot="thumbnailSlot" slot-scope="action">
                <span v-if="!action">暂无</span>
                <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action" style="width:30px;height:30px;" alt=""></a>
            </template>
            <span slot="actionSlot" slot-scope="action, record">
                <a-button size="small" @click="showModal('add', record.id)">新增</a-button>
                <span>&nbsp;</span>
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
                <a-form-item v-if="action == 'edit'" label="栏目ID">
                    <a-input v-decorator="['id', {initialValue: initialInfoClass.id}]" disabled />
                </a-form-item>
                <a-form-item label="栏目分类">
                    <!-- <a-input v-decorator="['parent_id', {rules: [{required: true,}], initialValue: initialInfoClass.parent_id || ''}]" /> -->
                    <a-tree-select
                        style="width: 100%"
                        v-decorator="['parent_id', {rules: [{required: true,}], initialValue: initialInfoClass.parent_id || ''}]"
                        :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                        placeholder='请选择栏目分类'
                        showSearch
                        allowClear
                        treeDefaultExpandAll
                        :treeData="infoClassTree"
                        treeDataSimpleMode
                    />
                </a-form-item>
                <a-form-item label="栏目名称">
                    <a-input v-decorator="['name', {rules: [{required: true,}], initialValue: initialInfoClass.name || ''}]" />
                </a-form-item>
                <a-form-item label="链接地址">
                    <a-input v-decorator="['url', {initialValue: initialInfoClass.url || ''}]" />
                </a-form-item>
                <a-form-item label="栏目描述">
                    <a-textarea v-decorator="['content', {initialValue: initialInfoClass.content || ''}]" />
                </a-form-item>
                <a-form-item >
                    <span slot="label">缩略图<span style="color:rgba(0,0,0,0.45);font-size:13px;">(只能上传jpg,png,gif)</span></span>
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        v-decorator="['thumbnail', {rules: [{required: true, validator: validateImage}]}]"
                        :fileList="initialInfoClass.thumbnail"
                        :beforeUpload="beforeUpload"
                        @preview="handlePhotoPreview"
                        @change="handlePhotoChange"
                    >
                        <div v-if="initialInfoClass.thumbnail && initialInfoClass.thumbnail.length == 0">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>
            </a-form>
        </template>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue'

    import { getInfoClassList, addInfoClass, getInfoClassDetail, updateInfoClass, deleteInfoClass, getInfoClassTree } from '@/api/info'
    import config from './config'

    export default {
        name: 'infoClass',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                infoClassList: [],
                infoClassTree: [],
                columns: config.columns,
                loading: true,
                // 传递给PageSkeleton组件的props
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                withFilter: config.withFilter,
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                filters: config.filters,
                // ***************************
                action: '',
                initialInfoClass: {},
                photoPreviewVisible: false,
                previewPhoto: '',
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created () {
            this.getInfoClassListFn();
            this.getInfoClassTreeFn();
        },
        methods: {
			delItem(id) {
                this.deleteInfoClassFn([id]);
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
                this.initialInfoClass.thumbnail = fileList;
            },
            validateImage (rule, value, callback) {
                console.log('validateImage',  value)
                if (!this.initialInfoClass.thumbnail.length) {
                    if (!value || !value.fileList.length) {
                        callback(new Error('请上传用户头像'));
                    }
                }
                callback();
            },
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增栏目分类';
                    this.initialInfoClass.parent_id = editId;
                    this.initialInfoClass.thumbnail = [];
                    this.visible = true;
                } else if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = '编辑栏目分类';
                    this.getInfoClassDetailFn();
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
                        console.log('form values: ', values);
                        if (!err) {
                            if (this.form.isFieldsTouched()) {
                                // 处理参数
                                // console.log('form values: ', values);
                                if (this.action == 'add') {
                                    this.addInfoClassFn(values);
                                }
                                if(this.action == 'edit') {
                                    this.updateInfoClassFn(values);
                                }
                            } else {
                                this.handleCancel();
                            }
                        }
                    })
                }
            },
            resetFormData () {
                this.initialInfoClass = {};
                this.fileList = [];
                this.allowEdit && this.form.resetFields();
            },
            // api
            async getInfoClassListFn () {
                const data = await getInfoClassList();
                this.loading = false;
				this.infoClassList = data.data;

                this.resetFormData();
            },
            async getInfoClassTreeFn () {
                const data = await getInfoClassTree();
				this.infoClassTree = data.data;
            },
            async getInfoClassDetailFn () {
                const data = await getInfoClassDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialInfoClass = data.data;
                    this.visible = true;
                }
            },
            async addInfoClassFn (params) {
                this.okBtnDisabled = true;
                const data = await addInfoClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getInfoClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateInfoClassFn (params) {
                this.okBtnDisabled = true;
                const data = await updateInfoClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getInfoClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async deleteInfoClassFn (ids) {
                const params = { ids: ids };
                const data = await deleteInfoClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.getInfoClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>