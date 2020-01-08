<template>
    <div v-if="showBreadcrumb" class="breadcrumb">
        <a-breadcrumb :routes="routes" separator="/">
            <template slot="itemRender" slot-scope="{ route, params, routes }">
                <span v-if="routes.indexOf(route) === routes.length - 1 || route.meta.depth == 1">
                    {{ $t(route.meta.breadcrumbName) }}
                </span>
                <!-- <router-link v-else :to="`${paths.join('/')}`"> -->
                <router-link v-else :to="`${route.path}`">
                    {{ $t(route.meta.breadcrumbName) }}
                </router-link>
            </template>
        </a-breadcrumb>
        <a v-if="showBackbtn" class="back" href="javascript: history.back(-1);" >{{ $t("GLOBAL.BTN_BACK") }}</a>
    </div>
</template>
<script>
export default {
    name: "BreadCrumb",
    props: {
        routes: {
            type: Array,
            default: function() {
                return [];
            }
        },
        showBreadcrumb: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        showBackbtn: {
            type: Boolean,
            default: function() {
                return false;
            }
        }
    }
};
</script>
<style scoped>
.breadcrumb {
    position: relative;
    padding: 18px 24px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    text-align: left;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.breadcrumb::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 1px 0 2px 0 #e8e8e8 inset;
	z-index: -1;
}
</style>
