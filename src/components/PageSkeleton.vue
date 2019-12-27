<template>
	<div>
        <!-- <template v-if="withBreadcrumb">
            <BreadCrumbComponent />
        </template> -->
        <div class="container">
            <!-- 筛选区域 -->
            <a-form v-if="withFilter" ref="filterForm" class="ant-advanced-search-form" :form="form" @submit.prevent="handleFilter">
                <a-row :gutter="24">
                    <a-col v-if="filters.filterID" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_ID')">
                            <a-input v-decorator="['fid', {rules: [{message: '请输入数据ID',}], initialValue: ''}]"
                                placeholder="请输入数据ID" />
                        </a-form-item>
                    </a-col>
                    <slot name="filterBeforeSlot"></slot>
                    <a-col v-if="filters.filterTtile" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_TITLE')">
                            <a-input v-decorator="['ftitle', {rules: [{message: '请输入数据标题',}], initialValue: ''}]"
                                placeholder="请输入数据标题" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.filterName" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_NAME')">
                            <a-input v-decorator="['fname', {rules: [{message: '请输入数据名称',}], initialValue: ''}]"
                                placeholder="请输入数据名称" />
                        </a-form-item>
                    </a-col>
                    <slot name="filterAfterSlot"></slot>
                    <a-col v-if="filters.filterPhone" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_PHONE')">
                            <a-input v-decorator="['fphone', {rules: [{message: '请输入手机号码',}], initialValue: ''}]"
                                placeholder="请输入手机号码" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.filterAdmin" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_ADMIN')">
                            <a-input v-decorator="['fadmin', {rules: [{message: '请输入发布人',}], initialValue: ''}]"
                                placeholder="请输入发布人" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.filterCreateTime" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_PUBLISHDATE')">
                            <a-date-picker v-decorator="['fcreate_time', {rules: [{type: 'object',message: '请选择发布日期',}]}]"
                                placeholder="请选择发布日期" style="width: 100%" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.filterState" :span="6">
                        <a-form-item :label="$t('GLOBAL.DATA_FILTER_STATE')">
                            <a-select v-decorator="['fstate', {rules: [{message: '请选择数据状态',}], initialValue: ''}]"
                                placeholder="请选择数据状态">
                                <a-select-option value="">全部</a-select-option>
                                <template v-for="(item, index) in filters.STATUS">
                                    <a-select-option :key="index" :value="index+''">{{item}}</a-select-option>
                                </template>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <a-form-item style="margin-bottom:0;text-align: right;">
                            <a-button type="primary" html-type="submit">{{$t('GLOBAL.BTN_SEARCH')}}</a-button>
                            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">{{$t('GLOBAL.BTN_RESET')}}</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div v-if="withOptionBar" class="option-bar">
                <!-- 内容操作区域 -->
                <a-button v-if="allowAdd" style="margin-right:10px;" type="primary" @click="showModal('add')">{{$t('GLOBAL.BTN_ADD')}}</a-button>
                <a-button v-if="showAllSelect" style="margin-right:10px;" @click="checkAllItems">{{allChecked ? $t('GLOBAL.BTN_UNSELECT_ALL') : $t('GLOBAL.BTN_SELECT_ALL')}}</a-button>
                <template v-if="selectedRowKeys.length">
                    <div v-if="excelConfig.showExportBtn" style="margin-right:10px;">
                        <ExportExcel :excelFields="excelConfig.excelFields" :excelData="excelData" :excelName='excelConfig.excelName' :btnName="$t('GLOBAL.BTN_EXPORT') + ' Excel'" @exportExcel="exportExcel" />
                    </div>
                    <a-button style="margin-right:10px;" type="danger" @click="delMultiItems">{{$t('GLOBAL.BTN_BATCH_DELETE')}}</a-button>
                    <slot name="optionSlot"></slot>
                    <div v-html="$t('GLOBAL.DATA_CURRENTLY_SELECT', [selectedRowKeys.length])">
                        <!-- 当前共选择
                        <strong style="color:#1890ff;">{{selectedRowKeys.length}}</strong> 条信息 -->
                    </div>
                </template>
            </div>
            <!-- 内容展示区域 -->
            <slot name="tableSlot"></slot>
            <!-- 信息查看/修改弹窗 -->
            <template v-if="withModal">
                <a-modal :visible="visible" width="50%" :okButtonProps="{props: {disabled: okBtnDisabled}}" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
                    <div class="modal-header">
                        <div class="modal-header_title">{{modalTitle}}</div>
                    </div>
                    <slot name="formSlot"></slot>
                </a-modal>
            </template>
            <a-modal :visible="photoPreviewVisible" :zIndex=1001 :footer="null" @cancel="handlePhotopreviewCancel">
                <img alt="" style="width: 100%" :src="previewPhoto" />
            </a-modal>
        </div>
    </div>
</template>

<script>
    // import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue'
    import ExportExcel from '@/components/ExportExcel.vue'

    export default {
        name: 'PageSkeleton',
        components: {
            // BreadCrumbComponent,
            ExportExcel
        },
        props: {
            // withBreadcrumb: {
            //     type: Boolean,
            //     default: function () {
            //         return true
            //     }
            // },
            withFilter: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            withOptionBar: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            withModal: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            allowAdd: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            showAllSelect: {
                type: Boolean,
                default: function() {
                    return false
                }
            },
            dataList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            selectedRowKeys: {
                type: Array,
                default: function () {
                    return []
                }
            },
            filters: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            photoPreviewVisible: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            previewPhoto: {
                type: String,
                default: function () {
                    return ''
                }
            },
            visible: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            modalTitle: {
                type: String,
                default: function () {
                    return ''
                }
            },
            okBtnDisabled: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            excelConfig: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                allChecked: false,
                excelData: [],
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
            exportExcel() {
                let exportList = this.dataList.filter(item => this.selectedRowKeys.includes(item.id));
                console.log('导出的数据列表', exportList);
                this.excelData = exportList;
                if (!this.excelData.length) {
                    this.$message.info('没有选中数据');
                    return;
                }
            },
			delItem(index) {
                this.$emit('delItem', index);
            },
            checkAllItems() {
                this.allChecked = !this.allChecked;
                this.$emit('checkAllItems', this.allChecked);
            },
			delMultiItems() {
				const that = this;
				this.$confirm({
					title: '删除提醒',
					content: '确认删除当前选中的信息吗?',
					okType: 'danger',
					onOk() {
                        that.$emit('delMultiItems');
					},
					onCancel() {
						console.log('Cancel');
					}
                });
            },
            handlePhotopreviewCancel() {
				this.$emit('handlePhotopreviewCancel');
            },
			handlePhotoChange({ fileList }) {
                // console.log('handlePhotoChange', fileList);
                this.fileList = fileList;
            },
            showModal (action) {
                this.$emit('showModal', action);
            },
            handleCancel () {
                this.$emit('handleCancel');
            },
            handleSubmit () {
                this.$emit('handleSubmit');
            },
            handleFilter () {
                this.form.validateFields((err, fieldsValue) => {
                    if (!err) {
                        const values = {
                            // ...fieldsValue,
                            id: fieldsValue['fid'],
                            phone: fieldsValue['fphone'],
                            name: fieldsValue['fname'],
                            title: fieldsValue['ftitle'],
                            admin: fieldsValue['fadmin'],
                            state: fieldsValue['fstate'],
                            create_time: fieldsValue['fcreate_time'] && fieldsValue['fcreate_time'].format('YYYY-MM-DD'),
                            delete_time: fieldsValue['fdelete_time'] && fieldsValue['fdelete_time'].format('YYYY-MM-DD'),
                        };
                        // console.log('handleFilter form: ', values);
                        this.$emit('handleFilter', values);
                    }
                })
            },
            handleReset () {
                this.form.resetFields();
                this.$emit('handleFilterReset');
            },
        }
    }
</script>
<style scoped>
.modal-header {
    position: relative;
    top: -24px;
    text-align: center;
}
.modal-header::after {
    content: "";
    position: absolute;
    left: -24px;
    right: -24px;
    bottom: 0;
    height: 0;
    border-bottom: 1px solid #e8e8e8;
}
.modal-header_title {
    font-size: 18px;
    line-height: 54px;
}
</style>