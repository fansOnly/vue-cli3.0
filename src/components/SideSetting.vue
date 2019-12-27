<template>
    <a-drawer
        title="主题设置"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
    >
        <template slot="handle">
            <div @click="toggleVisiable" class="fix-setting">
                <a-icon
                    :type="this.visible ? 'close' : 'setting'"
                    class="icon-setting"
                />
            </div>
        </template>
        <ThemePicker />
    </a-drawer>
</template>

<script>
import ThemePicker from "@/components/ThemePicker.vue";

export default {
    name: "Index",
    components: {
        ThemePicker
    },
    props: {
        visible: {
            type: Boolean,
            default: function() {
                return false
            }
        }
    },
    methods: {
        toggleVisiable() {
            this.$emit('toggleVisiable');
        },
        onClose() {
            this.$emit('onClose');
        }
    }
};
</script>
<style lang="less" scoped>
.fix-setting {
    position: absolute;
    right: 256px;
    top: 130px;
    width: 45px;
    height: 45px;
    background: #1890ff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    z-index: 8888;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-setting {
    color: #fff;
    font-size: 20px;
}
</style>
