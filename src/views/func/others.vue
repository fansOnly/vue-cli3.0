<template>
    <div class="container">
        <a-button @click="openLoading">开启遮罩层</a-button>
        <Loading :spinning="spinning" />
        <a-divider />

        <a-pagination
            showSizeChanger
            @showSizeChange="onShowSizeChange"
            :itemRender="itemRender"
            :defaultCurrent="3"
            :total="500"
        />
    </div>
</template>
<script>
import Loading from "@/components/Loading.vue";

export default {
    components: {
        Loading
    },
    data() {
        return {
            spinning: false
        };
    },
    methods: {
        openLoading() {
            this.spinning = true;

            setTimeout(() => {
                this.spinning = false;
            }, 5000);
        },
        onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        },
        itemRender(current, type, originalElement) {
            if (type === "prev") {
                return <a>上一页</a>;
            } else if (type === "next") {
                return <a>下一页</a>;
            }
            return originalElement;
        }
    }
};
</script>
