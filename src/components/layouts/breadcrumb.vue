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
    padding: 18px 24px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
