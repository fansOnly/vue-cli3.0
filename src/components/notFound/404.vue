<template>
	<div class="notfound">
		<img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" style="width:200px;height:auto;" alt="404" />
		<!-- 403 https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg -->
		<!-- 500 https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg -->
		<br />
		<h1>404</h1>
		<p>Sorry, the page you visited does not exist.</p>
		<a href="./">返回首页</a>
	</div>
</template>

<script>
export default {
	name: 'notFound',
}
</script>
<style scoped>
.notfound {
	min-height: 800px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
