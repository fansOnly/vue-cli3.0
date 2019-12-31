<template>
    <div :style="{minHeight:getContainerHeight}">
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'Container',
    computed: {
        getContainerHeight: function() {
            // return window.screen.availHeight - 64 - 48 - 69 + 'px';
            return document.documentElement.clientHeight - 64 - 24 - 69 + 'px';
        },
    },
}
</script>
<style scoped>
    .ant-back-top-icon {
		background-size: 100%!important;
	}
</style>