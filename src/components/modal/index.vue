<template>
    <div>
        <a-modal :visible="visible" :width="width" :okButtonProps="{props: {disabled: okBtnDisabled}}" :maskClosable="false" @ok="() => {$emit('ok')}" @cancel="() => {$emit('cancel')}">
            <div class="modal-header">
                <div class="modal-header_title">{{modalTitle}}</div>
            </div>
            <!-- 节点插槽 -->
            <slot></slot>
        </a-modal>
    </div>
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
    top: -7px;
    text-align: center;
}
.modal-header_title {
    font-size: 18px;
    line-height: 2;
}
</style>