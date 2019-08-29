<template>
	<div class="notfound">
		<img src="https://gw.alipayobjects.com/zos/antfincdn/wsE2Pw%243%26L/noFound.svg" style="width:200px;height:auto;" alt="404" />
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
