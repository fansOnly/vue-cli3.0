<template>
    <div class="breadcrumb">
        <a-breadcrumb :routes="routes">
            <template slot="itemRender" slot-scope="{route, params, routes}">
                <span v-if="routes.indexOf(route) === routes.length - 1">
                    {{route.breadcrumbName}}
                </span>
                <!-- <router-link v-else :to="`${paths.join('/')}`"> -->
                <router-link v-else :to="`${route.path}`">
                    {{route.breadcrumbName}}
                </router-link>
            </template>
        </a-breadcrumb>
        <a class="back" href="javascript: history.back(-1);">后退</a>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('breadcrumb');

export default {
    name: 'BreadCrumbComponent',
    data () {
        return {
            // routes: [{
            //     path: '/',
            //     breadcrumbName: '首页'
            // }, {
            //     path: '/admin/table/1',
            //     breadcrumbName: '一级面包屑'
            // }, {
            //     path: '/ss/2',
            //     breadcrumbName: '二级面包屑'
            // }, {
            //     path: '',
            //     breadcrumbName: '当前页面'
            // }]
        }
    },
    computed: {
        ...mapState(['routes'])
    },
}
</script>
<style scoped>
    .breadcrumb {
        padding: 18px 24px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>