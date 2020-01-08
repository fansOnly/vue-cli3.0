<template>
    <div class="page" :style="{ minHeight: clientHeight }">
        <!-- <div class="page"> -->
        <a-layout-sider class="sidebar" breakpoint="sm" :theme="menuTheme" :collapsed="collapsed">
            <div class="logo-wrap">
                <img class="logo" src="../../assets/images/antd.svg" alt />
                <h1 class="logo-title">{{ $t("GLOBAL.LOGO") }}</h1>
            </div>
            <Sider :menuTheme="menuTheme" :menuMode="menuMode" :selectedKey="selectedKey" :openKey="openKey" />
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
        <SideSetting :visible="visible" :menuTheme="menuTheme" :menuMode="menuMode" @toggleVisiable="toggleVisiable" @onClose="onClose" @changeMenuTheme="changeMenuTheme" />
    </div>
</template>

<script>
import Sider from "@/components/layouts/Sider.vue"
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"
import Container from "@/components/layouts/Container.vue"
import SideSetting from "@/components/SideSetting.vue"
import Breadcrumb from "@/components/layouts/Breadcrumb.vue"

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
            // transitionName: 'slide-left',
            collapsed: false,
            menuTheme: localStorage.getItem('menuTheme') || 'dark',
            menuMode: localStorage.getItem('menuMode') || 'inline',
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
                // const toDepth = to.path.split('/').length
                // const fromDepth = from.path.split('/').length
                // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

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
    mounted() {
        const nowHour = new Date().getHours();
        let cur = 0;
        if (nowHour < 11) {
            cur = 1;
        } else if (nowHour >= 11 && nowHour < 15) {
            cur = 1;
        } else if (nowHour >= 15 && nowHour < 19) {
            cur = 2;
        } else {
            cur = 3;
        }
        const notice = ['上午好，起这么早不困吗，要不再睡会吧', '中午好，阳光明媚的天气适合睡觉啊', '下午好，困了就睡会吧', '晚上好，夜深了，赶紧休息吧'];
        this.$notification.success({
            message: '欢迎回来',
            description: notice[cur],
            duration: 2.5
        });
    },
    methods: {
        toggleCollapsed(collapsed) {
            this.collapsed = collapsed;
            this.$nextTick(function() {
                if (!this.collapsed) {
					document.querySelector('.ant-menu-submenu-selected .ant-menu-sub').style.display = 'block';
				}
            })
        },
        toggleVisiable() {
            this.visible = !this.visible;
        },
        onClose() {
            this.visible = false;
        },
        changeMenuTheme(theme) {
            this.menuTheme = theme;
        },
        changeMenuMode(mode) {
            this.MenuMode = mode;
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
    box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}
.logo-wrap {
    position: relative;
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
}
.ant-layout-sider-light .logo-wrap {
    box-shadow: 1px 1px 3px 0 #e8e8e8;
}
.ant-layout-sider-dark .logo-wrap {
    background: #002140;
}
.logo-title {
    display: inline-block;
    margin: 0 0 0 15px;
    color: #fff;
    font-size: 20px;
    vertical-align: middle;
    transition: all ease 0.2s;
}
.ant-layout-sider-light .logo-title {
    color: #13c2c2;
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
