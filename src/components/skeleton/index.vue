<template>
	<div>
        <template v-if="withBreadcrumb">
            <BreadCrumbComponent />
        </template>
        <div class="container">
            <!-- 内容区域 -->
            <div v-if="withOptionBar" class="option-bar">
                <!-- 内容操作区域 -->
                <a-button v-if="allowAdd" style="margin-right:10px;" type="primary" @click="showModal('add')">新增</a-button>
                <template v-if="selectedRowKeys.length">
                    <a-button style="margin-right:10px;" type="default" @click="delMultiItems">批量删除</a-button>
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
                <!-- <Modal :visible="visible" :modalTitle="modalTitle" :okBtnDisabled="okBtnDisabled" @cancel="handleCancel" @ok="handleSubmit">
                    <slot name="formSlot"></slot>
                </Modal> -->
                <a-modal :visible="visible" :okButtonProps="{props: {disabled: okBtnDisabled}}" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
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
    // import Modal from '@/components/modal/index.vue';

    export default {
        name: 'PageSkeleton',
        components: {
            BreadCrumbComponent,
            // Modal,
        },
        props: {
            withBreadcrumb: {
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