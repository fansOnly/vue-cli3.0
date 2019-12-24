<template>
	<div>
		<a-menu
			:selectedKeys="selectedKeys"
			:defaultOpenKeys="defaultOpenKeys"
			:openKeys="openKeys"
			mode="inline"
			theme="dark"
			:inlineCollapsed="collapsed"
			@openChange="onOpenMenu"
			@select="selectKeys"
			@click="clickMenuItem"
		>
			<template v-for="item in menus">
				<template v-if="!item.subs">
					<a-menu-item :key="item.key">
						<router-link v-if="item.path" :to="item.path">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</router-link>
						<a v-else href="javascript:;">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</a>
					</a-menu-item>
				</template>

				<template v-else>
					<!-- 包含二级分类 -->
					<a-sub-menu :key="item.key">
						<span slot="title">
							<a-icon v-if="item.icon" :type="item.icon" />
							<span>{{item.name}}</span>
						</span>
						<template v-for="second in item.subs">
							<template v-if="!second.subs">
								<a-menu-item :key="second.key">
									<router-link v-if="second.path" :to="second.path">
										<a-icon v-if="second.icon" :type="second.icon" />
										<span>{{second.name}}</span>
									</router-link>
									<a v-else href="javascript:;">
										<a-icon v-if="second.icon" :type="second.icon" />
										<span>{{second.name}}</span>
									</a>
								</a-menu-item>
							</template>
							<!-- 包含三级分类 -->
							<template v-else>
								<a-sub-menu :key="second.key" :title="second.name">
									<template v-for="third in second.subs">
										<a-menu-item :key="third.key">
											<router-link v-if="third.path" :to="third.path">
												<a-icon v-if="third.icon" :type="third.icon" />
												<span>{{third.name}}</span>
											</router-link>
											<a v-else href="javascript:;">
												<a-icon v-if="third.icon" :type="third.icon" />
												<span>{{third.name}}</span>
											</a>
										</a-menu-item>
									</template>
								</a-sub-menu>
							</template>
						</template>
					</a-sub-menu>
				</template>
			</template>
		</a-menu>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	// const { mapGetters } = createNamespacedHelpers('locale')
	const localeStore = createNamespacedHelpers('locale')
	const stateStore = createNamespacedHelpers('state')

	export default {
		name: 'SiderComponent',
		props: {
			collapsed: {
				type: Boolean,
				default: function () {
					return false
				}
			},
		},
		data() {
			return {
				// menus: [],
				defaultOpenKeys: [],
				selectedKeys: ['index'],
				openKeys: [],
			};
		},
		computed: {
			...localeStore.mapGetters(['menus']),
			...stateStore.mapGetters(['currentPath']),
		},
		created() {
			// console.log('menus', this.menus)

			// const currentPath = sessionStorage.getItem('currentPath') || '';
			const openKeys = sessionStorage.getItem('openKeys') || '';
			
			const flatMenus = arr => arr.reduce((res, cur) => res.concat(cur.subs ? flatMenus(cur.subs) : cur), []);
			const currentMenu = flatMenus(this.menus).filter(item => item.path === this.currentPath);
			this.selectedKeys = currentMenu.length ? [currentMenu[0].key] : [];

			this.openKeys = openKeys ? [openKeys] : [];
		},
		mounted() {
			this.rootKeys = this.menus.map(item => item.key);
		},
		methods: {
			onOpenMenu(openKeys) {
				const latestOpenKey = openKeys.length && openKeys.find(key => this.openKeys.indexOf(key) === -1);
				if (this.rootKeys.indexOf(latestOpenKey) == '-1') {
					this.openKeys = openKeys;
				} else {
					this.openKeys = [latestOpenKey] || [];
				}
				sessionStorage.setItem('openKeys', this.openKeys[0]);
			},
			clickMenuItem({ key, keyPath }) {
				// console.log('clickMenuItem', item, key, keyPath);
				if (keyPath.length == 1) {
					this.openKeys = [];
				}
				if (key == 'user.logout') {
					this.$message.success('退出登陆', 1).then(() => {
						localStorage.clear();
						this.$router.push('/login');
					});
				}
			},
			selectKeys({ selectedKeys }) {
				// console.log('selectKeys', { item, key, selectedKeys });
				this.selectedKeys = selectedKeys;
			},
		},
	};
</script>
<style scoped>
	.ant-menu-submenu,
	.ant-menu-item {
		text-align: left;
	}
</style>
