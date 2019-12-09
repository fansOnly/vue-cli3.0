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
	export default {
		name: 'SiderComponent',
		props: {
			collapsed: {
				type: Boolean,
				default: function () {
					return false
				}
			}
		},
		data() {
			return {
				menus: [],
				defaultOpenKeys: [],
				selectedKeys: ['index'],
				openKeys: [],
			};
		},
		created() {
			this.menus = this.createMenu();

			const currentPath = localStorage.getItem('currentPath') || '';
			const flatMenus = arr => arr.reduce((res, cur) => res.concat(cur.subs ? flatMenus(cur.subs) : cur), []);
			const currentKey = flatMenus(this.menus).filter(item => item.path === currentPath)[0].key;
			this.selectedKeys = [currentKey];

			const openKeys = currentKey.split('.').reduce((res, key, index) => [...res, res[index - 1] ? `${res[index - 1]}.${key}` :  key], []);
			openKeys.length--;
			this.openKeys = openKeys;
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
			createMenu() {
				return [
					{
						key: 'index',
						// name: '站点首页',
						name: this.$t('menu.menu1'),
						icon: 'home',
						path: '/admin/index',
					},
					{
						key: 'siteinfo',
						// name: '站点设置',
						name: this.$t('menu.menu2'),
						icon: 'setting',
						path: '',
						subs: [
							{
								key: 'siteinfo.site',
								// name: '基本设置',
								name: this.$t('menu.menu2-1'),
								icon: '',
								path: '/admin/siteinfo/site'
							},
							{
								key: 'siteinfo.banner',
								// name: '幻灯片管理',
								name: this.$t('menu.menu2-2'),
								icon: '',
								path: '/admin/siteinfo/banner'
							},
							{
								key: 'siteinfo.upload',
								// name: '上传设置',
								name: this.$t('menu.menu2-3'),
								icon: '',
								path: '/admin/siteinfo/upload'
							},
						],
					},
					{
						key: 'member',
						// name: '会员管理',
						name: this.$t('menu.menu3'),
						icon: 'user',
						path: '',
						subs: [
							{
								key: 'member.index',
								// name: '会员列表',
								name: this.$t('menu.menu3-1'),
								icon: '',
								path: '/admin/member/index'
							},
						]
					},
					{
						key: 'info',
						// name: '信息发布',
						name: this.$t('menu.menu4'),
						icon: 'table',
						path: '',
						subs: [
							{
								key: 'info.index',
								// name: '文章管理',
								name: this.$t('menu.menu4-1'),
								icon: '',
								path: '/admin/info/index'
							},
							{
								key: 'info.class',
								// name: '文章分类管理',
								name: this.$t('menu.menu4-2'),
								icon: '',
								path: '/admin/info/class'
							},
							{
								key: 'info.recycle',
								// name: '文章回收站',
								name: this.$t('menu.menu4-3'),
								icon: '',
								path: '/admin/info/recycle'
							},
						]
					},
					{
						key: 'message',
						// name: '留言管理',
						name: this.$t('menu.menu5'),
						icon: 'contacts',
						path: '',
						subs: [
							{
								key: 'message.index',
								// name: '全部留言',
								name: this.$t('menu.menu5-1'),
								icon: '',
								path: '/admin/message/index'
							},
						]
					},
					{
						key: 'assets',
						// name: '资源管理',
						name: this.$t('menu.menu6'),
						icon: 'file',
						path: '/admin/assets/index',
					},
					{
						key: 'account',
						// name: '账号管理',
						name: this.$t('menu.menu7'),
						icon: 'team',
						path: '',
						subs: [
							{
								key: 'account.index',
								// name: '管理员列表',
								name: this.$t('menu.menu7-1'),
								icon: '',
								path: '/admin/account/index'
							},
							{
								key: 'account.class',
								// name: '管理员分类',
								name: this.$t('menu.menu7-2'),
								icon: '',
								path: '/admin/account/class'
							},
							{
								key: 'account.permisson',
								// name: '管理员权限',
								name: this.$t('menu.menu7-3'),
								icon: '',
								path: '/admin/account/permission'
							},
						]
					},
					{
						key: 'user',
						// name: '个人设置',
						name: this.$t('menu.menu8'),
						icon: 'export',
						path: '',
						subs: [
							{
								key: 'user.userinfo',
								// name: '编辑资料',
								name: this.$t('menu.menu8-1'),
								icon: '',
								path: '/admin/user/userinfo'
							},
							{
								key: 'user.changepass',
								// name: '修改密码',
								name: this.$t('menu.menu8-2'),
								icon: '',
								path: '/admin/user/changepass'
							},
							{
								key: 'user.logout',
								// name: '退出登陆',
								name: this.$t('menu.menu8-3'),
								icon: '',
								path: ''
							},
						]
					},
					// {
					// 	key: 'lev1',
					// 	name: '一级分类',
					// 	icon: 'table',
					// 	path: '',
					// 	subs: [
					// 		{
					// 			key: 'lev1.lev2',
					// 			name: '二级分类',
					// 			icon: '',
					// 			path: ''
					// 		},
					// 		{
					// 			key: 'lev1.lev21',
					// 			name: '二级分类',
					// 			icon: '',
					// 			path: '',
					// 			subs: [
					// 				{
					// 					key: 'lev1.lev21.lev3',
					// 					name: '三级分类',
					// 					icon: '',
					// 					path: ''
					// 				}
					// 			]
					// 		}
					// 	]
					// },
				];
			}
		},
	};
</script>
<style scoped>
	.ant-menu-submenu,
	.ant-menu-item {
		text-align: left;
	}
</style>
