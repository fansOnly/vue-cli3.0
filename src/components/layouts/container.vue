<template>
    <div :style="{minHeight:getContainerHeight}">
        <transition>
            <keep-alive :max="10">
                <router-view />
            </keep-alive>
        </transition>
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