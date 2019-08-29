<template>
    <PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :filters="filters"
        :visible="visible"
        :modalTitle="modalTitle"
        :okBtnDisabled="okBtnDisabled"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerList" :pagination="pagination" :rowSelection="rowSelection" bordered >
                <span slot="imageSlot" slot-scope="action">
                    <span v-if="!action.length">暂无</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action[0])"><img :src="action[0].url" style="width:50px;height:50px;" alt=""></a>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="BANNER_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
        <template slot="formSlot">
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
        </template>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getBannerList, addBanner, getBannerDetail, updateBanner, deleteBanner } from '@/api/banner';

    import config from './config'

    import Tools from '@/utils/Tools'

    export default {
        name: 'Banner',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                BANNER_STATUS: config.BANNER_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                bannerList: [],
                columns: config.columns,
                pagination: false,
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                filters: config.filters,
                // ***************************
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
			delItem(id) {
                this.deleteBannerFn([id]);
			},
			delMultiItems() {
				const deleteList = this.bannerList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = Tools.pluck(deleteList, 'id');
                this.deleteBannerFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilter', values);
                this.getBannerListFn(values);
            },
            handleFilterReset () {
                this.getBannerListFn();
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
            async getBannerListFn (filters) {
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, classid: this.classid, ...filters };
                const data = await getBannerList(params);
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
                this.okBtnDisabled = true;
                const data = await addBanner(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateBannerFn (params) {
                this.okBtnDisabled = true;
                const data = await updateBanner(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getBannerListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async deleteBannerFn (ids) {
                const params = { ids: ids };
                const data = await deleteBanner(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getBannerListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            }
        }
    }
</script>