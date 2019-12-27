<template>
	<div id="app">
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
	const { mapGetters } = createNamespacedHelpers('locale')

	export default {
		name: 'App',
		data() {
			return {
				spinning: true,
			};
		},
		computed: {
			...mapGetters(['LAN'])
		},
		// mixins: [],
		mounted() {
			this.spinning = false;
		},
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
</style>