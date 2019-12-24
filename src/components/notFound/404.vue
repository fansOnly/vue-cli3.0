<template>
	<div class="notfound">
		<img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" style="width:300px;height:auto;" alt="404" />
		<!-- <img src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg" style="width:300px;height:auto;" alt="403" /> -->
		<!-- <img src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg" style="width:300px;height:auto;" alt="500" /> -->
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
