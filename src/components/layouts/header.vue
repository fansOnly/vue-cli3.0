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
								<a-icon type="user" style="margin-right:5px;" />修改资料
							</router-link>
						</a-menu-item>
						<a-menu-item key="user.changepass">
							<router-link to='/admin/user/changepass'>
								<a-icon type="setting" style="margin-right:5px;" />修改密码
							</router-link>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="user.logout">
							<a href="javascript:;">
								<a-icon type="poweroff" style="margin-right:5px;" />退出登录
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
					<a-menu slot="overlay" :selectedKeys="selectedKeys" @click="switchLocale">
						<template v-for="item in locales">
							<a-menu-item :key="item">
								<a href="javascript:;">{{languageIcons[item]}} {{languageLabels[item]}}</a>
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
	const { mapGetters } = createNamespacedHelpers('locale')

	const locales = ['zh_CN', 'zh_TW', 'en_US'];
	const languageLabels = {
		zh_CN: '简体中文',
		zh_TW: '繁体中文',
		en_US: 'English'
	};
	const languageIcons = {
		zh_CN: '🇨🇳',
		zh_TW: '🇭🇰',
		en_US: '🇬🇧'
	};

	export default {
		name: 'HeaderComponent',
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
				locales,
				languageLabels,
				languageIcons,
				selectedKeys: [],
			};
		},
		computed: {
			...mapGetters(['locale'])
		},
		created () {
			this.selectedKeys = [this.locale];
			this.$store.dispatch('locale/switchLocale', this.locale);
		},
		methods: {
			// ...mapActions(['switchLocale']),
			onToggleCollapsed() {
				this.$emit('onToggleCollapsed', !this.collapsed);
			},
			handleSearch(value) {
				console.log(`search for ${value}`);
			},
			switchUserOption(item) {
				if (item.key == 'user.logout') {
					this.$message.success('退出登陆', 1).then(() => {
						localStorage.clear();
						this.$router.push('/login');
					});
				}
			},
			switchLocale(item) {
				// console.log('switchLocale', item);
				console.log(`当前选择语言为: ${item.key} ${languageLabels[item.key]}`);
				localStorage.setItem('locale', item.key);
				this.selectedKeys = [item.key];
				this.$store.dispatch('locale/switchLocale', item.key);
			}
		}
	};
</script>
<style>
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
