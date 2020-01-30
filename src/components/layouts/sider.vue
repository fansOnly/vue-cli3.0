<template>
	<a-menu
		:selectedKeys="selectedKeys"
		:openKeys="openKeys"
		:mode="menuMode"
		:theme="menuTheme"
		:inlineCollapsed="collapsed"
		@openChange="onOpenMenu"
		@select="selectKeys"
		@click="clickMenuItem"
		style="padding: 8px 0;border-right-color:transparent;"
	>
		<template v-for="item in menus">
			<template v-if="!item.meta.hidden">
				<template v-if="!item.children || item.meta.hiddenChildren">
					<a-menu-item :key="item.meta.key">
						<router-link v-if="item.path" :to="item.path">
							<a-icon v-if="item.meta.icon" :type="item.meta.icon" />
							<span>{{$t(item.meta.breadcrumbName)}}</span>
						</router-link>
						<a v-else href="javascript:;">
							<a-icon v-if="item.meta.icon" :type="item.meta.icon" />
							<span>{{$t(item.meta.breadcrumbName)}}</span>
						</a>
					</a-menu-item>
				</template>

				<template v-else>
					<!-- 包含二级分类 -->
					<a-sub-menu :key="item.meta.key">
						<span slot="title">
							<a-icon v-if="item.meta.icon" :type="item.meta.icon" />
							<span>{{$t(item.meta.breadcrumbName)}}</span>
						</span>
						<template v-for="second in item.children">
							<template v-if="!second.meta.hidden">
								<template v-if="!second.children || second.meta.hiddenChildren">
									<a-menu-item :key="second.meta.key">
										<router-link v-if="second.path" :to="second.path">
											<a-icon v-if="second.meta.icon" :type="second.meta.icon" />
											<span>{{$t(second.meta.breadcrumbName)}}</span>
										</router-link>
										<a v-else href="javascript:;">
											<a-icon v-if="second.meta.icon" :type="second.meta.icon" />
											<span>{{$t(second.meta.breadcrumbName)}}</span>
										</a>
									</a-menu-item>
								</template>
								<!-- 包含三级分类 -->
								<template v-else>
									<a-sub-menu :key="second.meta.key" :title="second.meta.breadcrumbName">
										<template v-for="third in second.children">
											<template v-if="!third.meta.hidden">
												<template v-if="!third.children || third.meta.hiddenChildren">
													<a-menu-item :key="third.meta.key">
														<router-link v-if="third.path" :to="third.path">
															<a-icon v-if="third.meta.icon" :type="third.meta.icon" />
															<span>{{$t(third.meta.breadcrumbName)}}</span>
														</router-link>
														<a v-else href="javascript:;">
															<a-icon v-if="third.meta.icon" :type="third.meta.icon" />
															<span>{{$t(third.meta.breadcrumbName)}}</span>
														</a>
													</a-menu-item>
												</template>
											</template>
										</template>
									</a-sub-menu>
								</template>
							</template>
						</template>
					</a-sub-menu>
				</template>
			</template>
		</template>
	</a-menu>
</template>

<script>
	import viewRoutes from '@/router/views'

	export default {
		name: 'Sider',
		props: {
			collapsed: {
				type: Boolean,
				default: function () {
					return false
				}
			},
			menuMode: {
				type: String,
				default: function() {
					return 'inline'
				}
			},
			menuTheme: {
				type: String,
				default: function() {
					return 'dark'
				}
			},
			selectedKey: {
				type: String,
				default: function () {
					return ''
				}
			},
			openKey: {
				type: String,
				default: function () {
					return ''
				}
			},
		},
		data() {
			return {
				menus: viewRoutes,
				openKeys: [],
			};
		},
		computed: {
			selectedKeys: {
				get() {
					return [this.selectedKey]
				},
				set(val) {
					this.selectedKeys = val
				}
			},
			defaultOpenKey() {
				return this.openKey
			},
			rootKeys() {
				return this.menus.map(item => item.meta.key)
			},
		},
		watch: {
			defaultOpenKey: {
				handler() {
					this.openKeys = [this.openKey]
				},
				immediate: true,
			},
			openKeys: {
				handler(val) {
					this.openKeys = val
				},
				deep: true
			},
		},
		methods: {
			onOpenMenu(openKeys) {
				const latestOpenKey = openKeys.length && openKeys.find(key => this.openKeys.indexOf(key) === -1);
				if (this.rootKeys.indexOf(latestOpenKey) == '-1') {
					this.openKeys = openKeys;
				} else {
					this.openKeys = [latestOpenKey] || [];
				}
			},
			clickMenuItem({ key, keyPath }) {
				// console.log('clickMenuItem', item, key, keyPath);
				if (keyPath.length == 1) {
					this.openKeys = [];
				}
				if (key === 'user.logout') {
					this.$message.success('退出登陆', 1).then(() => {
						sessionStorage.clear();
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
