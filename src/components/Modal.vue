<template>
    <a-modal :visible="visible" :width="width" :okButtonProps="{props: {disabled: okBtnDisabled}}" :maskClosable="false" @ok="() => {$emit('ok')}" @cancel="() => {$emit('cancel')}">
        <div class="modal-header">
            <div class="modal-header_title">{{modalTitle}}</div>
        </div>
        <!-- 节点插槽 -->
        <slot></slot>
    </a-modal>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        visible: {
            type: Boolean,
            default: function () {
                return false;
            }
        },
        width: {
            type: String,
            default: function () {
                return '520px';
            }
        },
        modalTitle: {
            type: String,
        },
        okBtnDisabled: {
            type: Boolean,
            default: function () {
                return false
            }
        },
    },
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