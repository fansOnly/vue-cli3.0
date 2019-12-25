<template>
	<div class>
		<div class="page" :style="{minHeight: clientHeight}">
		<!-- <div class="page"> -->
			<a-layout-sider class="sidebar" v-model="collapsed">
				<div class="logo-wrap">
					<img class="logo" src="../../assets/images/antd.svg" alt />
					<h1>{{$t('GLOBAL.LOGO')}}</h1>
				</div>
				<SiderComponent />
			</a-layout-sider>
			<a-layout class="main">
				<a-layout-header>
					<HeaderComponent :collapsed="collapsed" @onToggleCollapsed="toggleCollapsed" />
				</a-layout-header>
				<a-layout-content>
					<ContainerComponent />
				</a-layout-content>
				<a-layout-footer>
					<FooterComponent />
				</a-layout-footer>
			</a-layout>
			<a-drawer title="主题设置" placement="right" :closable="false" @close="onClose" :visible="visible">
				<template slot="handle">
					<div @click="toggleVisiable" class="fix-setting"><a-icon :type="this.visible ? 'close' : 'setting'" class="icon-setting" /></div>
				</template>
				<ThemePicker />
			</a-drawer>
		</div>
	</div>
</template>

<script>
	import SiderComponent from '@/components/layouts/sider.vue'
	import HeaderComponent from '@/components/layouts/header.vue'
	import FooterComponent from '@/components/layouts/footer.vue'
	import ContainerComponent from '@/components/layouts/container.vue'
	import ThemePicker from '@/components/ThemePicker.vue'

	export default {
		name: 'Index',
		components: {
			HeaderComponent,
			FooterComponent,
			ContainerComponent,
			SiderComponent,
			ThemePicker
		},
		data() {
			return {
				windowHeight: 0,
				collapsed: false,
				visible: false
			};
		},
		computed: {
			clientHeight: function() {
				// return window.screen.availHeight + 'px';
				return document.documentElement.clientHeight + 'px';
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
				this.visible = false
			}
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
.logo {
	width: 32px;
	vertical-align: middle;
}
.logo-wrap h1 {
	display: inline-block;
	margin: 0 0 0 5px;
	color: #fff;
	font-size: 20px;
	font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
	vertical-align: middle;
	transition: all ease .2s;
}
.main {
	display: block;
	overflow: auto;
    transition: all ease .2s;
}
/* antd style reset */
.ant-layout-header {
	padding: 0;
}
.fix-setting {
	position: absolute;
	right: 256px;
	top: 130px;
	width: 45px;
	height: 45px;
	background: #1890ff;
	border-radius: 3px;
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
