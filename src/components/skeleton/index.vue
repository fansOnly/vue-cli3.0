<template>
	<div>
        <template v-if="withBreadcrumb">
            <BreadCrumbComponent />
        </template>
        <div class="container">
            <!-- 筛选区域 -->
            <a-form v-if="withFilter" ref="filterForm" class="ant-advanced-search-form" :form="form" @submit.prevent="handleFilter">
                <a-row :gutter="24">
                    <a-col v-if="filters.hasID" :span="6">
                        <a-form-item label="数据编号">
                            <a-input v-decorator="['fid', {rules: [{message: '请输入数据ID',}], initialValue: ''}]"
                                placeholder="请输入数据ID" />
                        </a-form-item>
                    </a-col>
                    <slot name="filterBeforeSlot"></slot>
                    <a-col v-if="filters.hasTitle" :span="6">
                        <a-form-item label="数据标题">
                            <a-input v-decorator="['ftitle', {rules: [{message: '请输入数据标题',}], initialValue: ''}]"
                                placeholder="请输入数据标题" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.hasName" :span="6">
                        <a-form-item label="数据名称" >
                            <a-input v-decorator="['fname', {rules: [{message: '请输入数据名称',}], initialValue: ''}]"
                                placeholder="请输入数据名称" />
                        </a-form-item>
                    </a-col>
                    <slot name="filterAfterSlot"></slot>
                    <a-col v-if="filters.hasPhone" :span="6">
                        <a-form-item label="手机号码" >
                            <a-input v-decorator="['fphone', {rules: [{message: '请输入手机号码',}], initialValue: ''}]"
                                placeholder="请输入手机号码" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.hasAdmin" :span="6">
                        <a-form-item label="发布人员" >
                            <a-input v-decorator="['fadmin', {rules: [{message: '请输入发布人',}], initialValue: ''}]"
                                placeholder="请输入发布人" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.hasCreateTime" :span="6">
                        <a-form-item label="发布日期" >
                            <a-date-picker v-decorator="['fcreate_time', {rules: [{type: 'object',message: '请选择发布日期',}]}]"
                                placeholder="请选择发布日期" style="width: 100%" />
                        </a-form-item>
                    </a-col>
                    <a-col v-if="filters.hasState" :span="6">
                        <a-form-item label="数据状态" >
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
                            <a-button type="primary" html-type="submit">搜索</a-button>
                            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div v-if="withOptionBar" class="option-bar">
                <!-- 内容操作区域 -->
                <a-button v-if="allowAdd" style="margin-right:10px;" type="primary" @click="showModal('add')">新增</a-button>
                <template v-if="selectedRowKeys.length">
                    <a-button style="margin-right:10px;" type="danger" @click="delMultiItems">批量删除</a-button>
                    <slot name="optionSlot"></slot>
                    <div>
                        当前共选择
                        <strong style="color:#1890ff;">{{selectedRowKeys.length}}</strong> 条信息
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
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

    export default {
        name: 'PageSkeleton',
        components: {
            BreadCrumbComponent,
        },
        props: {
            withBreadcrumb: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
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
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
			delItem(index) {
                this.$emit('delItem', index)
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
    top: -7px;
    text-align: center;
}
.modal-header_title {
    font-size: 18px;
    line-height: 2;
}
</style>