<template>
    <div id="app">
        <!-- <a-locale-provider :locale="LAN"> -->
            <!-- <a-spin :spinning="spinning" size="large" tip=""> -->
                <!-- <Loading :spinning="spinning" /> -->
                <a-back-top />
                <router-view />
            <!-- </a-spin> -->
        <!-- </a-locale-provider> -->
    </div>
</template>
<script>
// import { createNamespacedHelpers } from "vuex";
// const { mapGetters } = createNamespacedHelpers("lang");
// import loading from '@/mixins/loading'
// import Loading from '@/components/Loading.vue'

export default {
    name: "App",
    // components: {
    //     Loading
    // },
    // data() {
    //     return {
    //         spinning: true
    //     };
    // },
    // computed: {
    //     ...mapGetters(["LAN"])
    // },
    // mixins: [loading],
    // mounted() {
    //     setTimeout(() => {
    //         this.spinning = false;
    //     }, 3000)
    // }
};
</script>
<style scoped>
#app {
    font-family: "-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
}
</style>
