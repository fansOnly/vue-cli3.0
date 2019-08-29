<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容区域 -->
            <div class="option-bar">
                <!-- 内容操作区域 -->
                <a-button style="margin-right:10px;" type="primary" @click="showModal('add')">新增</a-button>
                <template v-if="selectedRowKeys.length">
                    <a-button style="margin-right:10px;" type="default" @click="delMultiItems">批量删除</a-button>
                    <div>
                        当前共选择
                        <strong style="color:#1890ff;">{{selectedRowKeys.length}}</strong> 条信息
                    </div>
                </template>
            </div>
            <!-- 内容展示区域 -->
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerList" :pagination="pagination" :rowSelection="rowSelection" bordered >
                <span slot="imagex" slot-scope="action">
                    <span v-if="!action.length">暂无</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action[0])"><img :src="action[0].url" style="width:50px;height:50px;" alt=""></a>
                </span>
                <span slot="actionx" slot-scope="action, record, index">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
            <!-- banner新增/修改弹窗 -->
            <Modal :visible="visible" :modalTitle="modalTitle" @cancel="handleCancel" @ok="handleSubmit">
                <a-form layout="vertical" :form="form">
                    <a-form-item v-if="action == 'edit'" label="幻灯片ID">
                        <a-input v-decorator="['id', {initialValue: initialBanner.id}]" disabled />
                    </a-form-item>
                    <a-form-item label="幻灯片名称">
                        <a-input v-decorator="['title', {rules: [{required: true,}], initialValue: initialBanner.title || ''}]" />
                    </a-form-item>
                    <a-form-item >
                        <span slot="label">幻灯片图片<span style="color:rgba(0,0,0,0.45);font-size:13px;">(只能上传jpg,png,gif,mp4)</span></span>
                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            v-decorator="['fileList', {rules: [{validator: validateImage}]}]"
                            :fileList="fileList"
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
                    <a-form-item label="幻灯片链接">
                        <a-input v-decorator="['url', {initialValue: initialBanner.url || ''}]" />
                    </a-form-item>
                    <a-form-item label="幻灯片描述">
                        <a-input v-decorator="['content', {initialValue: initialBanner.content || ''}]" />
                    </a-form-item>
                </a-form>
            </Modal>
            <a-modal :visible="photoPreviewVisible" :footer="null" @cancel="handlePhotopreviewCancel">
                <img alt="" style="width: 100%" :src="previewPhoto" />
            </a-modal>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import Modal from '@/components/modal/index.vue';

    import { getBannerList, addBanner, getBannerDetail, updateBanner } from '@/api/banner';

    const columns = [
        {
			title: '幻灯片ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '幻灯片名称',
			dataIndex: 'title',
        },
        {
			title: '幻灯片描述',
			dataIndex: 'content',
        },
        {
			title: '幻灯片链接',
			dataIndex: 'url',
        },
        {
			title: '幻灯片图片',
            dataIndex: 'image',
            scopedSlots: {customRender: 'imagex'}
        },
        {
			title: '发布时间',
			dataIndex: 'create_time',
            width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionx' },
			width: '120px'
		}
	];

    export default {
        name: 'Banner',
        components: {
            BreadCrumbComponent,
            Modal,
        },
        data () {
            return {
                bannerList: [],
                columns,
                pagination: false,
                loading: true,
                visible: false,
                modalTitle: '',
                selectedRowKeys: [],
                action: '',
                initialBanner: {},
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
            this.classid = this.$route.params.classid;
            this.getBannerListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.bannerList.splice(index, 1);
			},
			delMultiItems() {
				const that = this;
				this.$confirm({
					title: '删除提醒',
					content: '确认删除当前选中的信息吗?',
					okType: 'danger',
					onOk() {
						that.bannerList = that.bannerList.filter(
							item => !that.selectedRowKeys.includes(item.id)
						);
						that.selectedRowKeys = [];
					},
					onCancel() {
						console.log('Cancel');
					}
                });
			},
            handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
            },
			handlePhotoPreview(file) {
                this.previewPhoto = file.url || file.thumbUrl;
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
                        callback(new Error('请上传幻灯片图片'));
                    }
                }
                callback();
            },
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增幻灯片';
                    this.visible = true;
                } else if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = '编辑幻灯片';
                    this.getBannerDetailFn();
                } else {
                    this.$message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                console.log('form.isFieldsTouched()', this.form.isFieldsTouched());
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if (this.form.isFieldsTouched()) {
                            // 处理参数
                            values.classid = this.classid;
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
                                this.addBannerFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateBannerFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialBanner = {};
                this.fileList = [];
                this.form.resetFields();
            },
            // api
            async getBannerListFn () {
                const data = await getBannerList({classid: this.classid});
				this.loading = false;
                this.bannerList = data.data;

                this.resetFormData();
            },
            async getBannerDetailFn () {
                const data = await getBannerDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialBanner = data.data;
                    this.fileList = data.data.image;
                    this.visible = true;
                }
            },
            async addBannerFn (params) {
                const data = await addBanner(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateBannerFn (params) {
                const data = await updateBanner(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>