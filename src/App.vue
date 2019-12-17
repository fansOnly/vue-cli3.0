<template>
	<div id="app">
		<div class="progress" v-show="progress"><a-progress strokeColor="#1890ff" :showInfo="false" :strokeWidth="2" strokeLinecap="square" :percent="percent" /></div>
		<a-locale-provider :locale="LAN">
			<a-spin :spinning="spinning">
				<a-back-top />
				<router-view></router-view>
			</a-spin>
		</a-locale-provider>
	</div>
</template>
<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapState } = createNamespacedHelpers('locale')

	import process from '@/mixins/process'

	export default {
		name: 'App',
		data() {
			return {
				spinning: true,
				progress: true,
				percent: 0
			};
		},
		computed: {
			...mapState(['LAN'])
		},
		mixins: [process],
		mounted() {
			this.spinning = false;
		}
	};
</script>
<style scoped>
	#app {
		font-family: "-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 14px;
		color: #2c3e50;
	}
	.progress {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 2px;
		transform: translateY(-11px);
		/* overflow: hidden; */
	}
</style>