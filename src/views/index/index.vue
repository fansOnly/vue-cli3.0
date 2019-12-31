<template>
    <div class="page" :style="{ minHeight: clientHeight }">
        <!-- <div class="page"> -->
        <a-layout-sider class="sidebar" v-model="collapsed">
            <div class="logo-wrap">
                <img class="logo" src="../../assets/images/antd.svg" alt />
                <h1 class="logo-title">{{ $t("GLOBAL.LOGO") }}</h1>
            </div>
            <Sider :selectedKey="selectedKey" :openKey="openKey" />
        </a-layout-sider>
        <a-layout class="main">
            <a-layout-header>
                <Header :collapsed="collapsed" @onToggleCollapsed="toggleCollapsed" />
            </a-layout-header>
            <Breadcrumb :showBreadcrumb="showBreadcrumb" :showBackbtn="showBackbtn" :routes="routes" />
            <a-layout-content>
                <Container />
            </a-layout-content>
            <a-layout-footer>
                <Footer />
            </a-layout-footer>
        </a-layout>
        <SideSetting :visible="visible" @toggleVisiable="toggleVisiable" @onClose="onClose" />
    </div>
</template>

<script>
import Sider from "@/components/layouts/Sider.vue"
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"
import Container from "@/components/layouts/Container.vue"
import SideSetting from "@/components/SideSetting.vue"
import Breadcrumb from "@/components/layouts/Breadcrumb.vue"

import { deepCopy } from '@/utils/util'
import viewRoutes from '@/router/views'

export default {
    name: "Index",
    components: {
        Header,
        Footer,
        Container,
        Sider,
        SideSetting,
        Breadcrumb
    },
    data() {
        return {
            windowHeight: 0,
            collapsed: false,
            visible: false,
            showBreadcrumb: false,
            showBackbtn: false,
            routes: [],
            selectedKey: '',
            openKey: ''
        };
    },
    computed: {
        clientHeight: function() {
            // return window.screen.availHeight + 'px';
            return document.documentElement.clientHeight + "px";
        }
    },
    watch: {
        '$route': {
            handler(to, from) {
                // console.log("watch route", to, from);
                this.showBreadcrumb = to.meta.depth > 1;
                this.showBackbtn = to.meta.depth > 2;
                this.routes = this.updateBreadcrumbRoutes(to);
                this.selectedKey = to.matched[to.matched.length - 1].meta.key;
                this.openKey = to.matched.filter(item => item.meta.depth == 1)[0].name;
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        toggleCollapsed(collapsed) {
            this.collapsed = collapsed;
        },
        toggleVisiable() {
            this.visible = !this.visible;
        },
        onClose() {
            this.visible = false;
        },
        updateBreadcrumbRoutes(route) {
            let _routes = [];
            route.matched.filter(item => item.meta.breadcrumbName).map(item => {
                _routes.push({path: item.path, name: item.name, meta: item.meta})
            })
            return _routes;
        },
    }
};
</script>
<style scoped>
.page {
    background: #f0f2f5;
    overflow: hidden;
    display: flex;
}
.sidebar {
    overflow-y: auto;
}
.logo-wrap {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    overflow: hidden;
}
.logo-title {
    display: inline-block;
    margin: 0 0 0 15px;
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    transition: all ease 0.2s;
}
.logo {
    width: 32px;
    vertical-align: middle;
}
.main {
    display: block;
    overflow: auto;
    transition: all ease 0.2s;
}
/* antd style reset */
.ant-layout-header {
    padding: 0;
}
</style>
