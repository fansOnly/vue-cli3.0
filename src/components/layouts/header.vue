<template>
	<div class="header">
		<div class="header-left">
			<a-icon
				@click="onToggleCollapsed"
				:type="collapsed ? 'menu-unfold' : 'menu-fold'"
				style="color:#777;font-size:28px;vertical-align:middle;cursor:pointer;"
			/>
		</div>
		<div class="header-right">
			<div class="search">
				<a-input-search placeholder="input search text" @search="handleSearch" enterButton />
			</div>
			<router-link to='/admin/message/index' class="notice">
				<a-badge dot>
					<a-icon type="bell" style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;" />
				</a-badge>
			</router-link>
			<div>
				<a-dropdown overlayClassName="user-options" placement="topRight">
					<div class="user-opt">
						<a-avatar icon="user" />
						<span style="margin-left:10px;text-transform:uppercase;">admin</span>
					</div>
					<a-menu slot="overlay" @click="switchUserOption">
						<a-menu-item key="user.userinfo">
							<router-link to='/admin/user/userinfo'>
								<a-icon type="user" style="margin-right:5px;" />{{$t('GLOBAL.USER_MODI_INFO')}}
							</router-link>
						</a-menu-item>
						<a-menu-item key="user.changepass">
							<router-link to='/admin/user/changepass'>
								<a-icon type="setting" style="margin-right:5px;" />{{$t('GLOBAL.USER_MODI_PASS')}}
							</router-link>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="user.logout">
							<a href="javascript:;">
								<a-icon type="poweroff" style="margin-right:5px;" />{{$t('GLOBAL.USER_LOG_OUT')}}
							</a>
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
			<div>
				<a-dropdown overlayClassName="language-options" placement="topRight">
					<div class="language">
						<a-icon
							type="global"
							style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;"
						/>
					</div>
					<a-menu slot="overlay" :selectedKeys="[currentLocale]" @click="selectLocale">
						<template v-for="(item, index) in locales">
							<a-menu-item :key="item">
								<a href="javascript:;">{{languageIcons[item]}} {{languageLabels[currentLocale][index]}}</a>
							</a-menu-item>
						</template>
					</a-menu>
				</a-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters, mapActions } = createNamespacedHelpers('locale')
	
	export default {
		name: 'Header',
		props: {
			collapsed: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		data() {
			return {
				locales: ['cn', 'hk', 'en'],
				languageLabels: {
					'cn': ['简体中文', '繁体中文', '英文'],
					'hk': ['簡體中文', '繁體中文', '英文'],
					'en': ['Chinese', 'Chinese2', 'English'],
				},
				languageIcons: {
					'cn': '🇨🇳',
					'hk': '🇭🇰',
					'en': '🇬🇧'
				},
				currentLocale: ''
			};
		},
		computed: {
			...mapGetters(['locale']),
			defaultLocale() {
				return this.locale
			}
		},
		watch: {
			defaultLocale: {
				handler: function(val, oldVal) {
					this.currentLocale = val;
				},
				immediate: true
			},
			currentLocale(val) {
				this.switchLocale(val)
			}
		},
		methods: {
			onToggleCollapsed() {
				this.$emit('onToggleCollapsed', !this.collapsed);
			},
			handleSearch(value) {
				if (!value) {
					this.$message.warn('请输入搜索关键字');
				}
				console.log(`search for ${value}`);
			},
			switchUserOption(item) {
				if (item.key == 'user.logout') {
					this.$message.success('退出登陆', 1).then(() => {
						sessionStorage.clear();
						this.$router.push('/login');
					});
				}
			},
			selectLocale(item) {
				// console.log('selectLocale', item);
				console.log(`当前选择语言为: ${item.key} - ${this.languageLabels[item.key][this.locales.indexOf(item.key)]}`);
				this.currentLocale = item.key;
			},
			...mapActions(["switchLocale"])
		}
	};
</script>
<style scoped>
	.header {
		position: relative;
		padding: 0 24px;
		background: #fff;
		color: #001529;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.search {
		display: flex;
		align-items: center;
		margin-right: 15px;
	}

	.notice, .language, .user-opt {
		height: 64px;
		padding: 0 15px;
		cursor: pointer;
	}

	.user-options {
		width: 140px;
	}

	.user-opt {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user-opt:hover, .notice:hover, .language:hover {
		background: #f5f5f5;
	}
</style>
