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
			<div class="opt-item">
				<a-input-search placeholder="input search text" @search="handleSearch" enterButton />
			</div>
			<div class="opt-item">
				<a-button @click="openQrcode">生成二维码</a-button>
			</div>
			<div class="ant-dropdown-menu-item opt-icon" @click="toggleFullscreen">
				<a-icon :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'" style="color:#777;font-size:20px;" />
			</div>
			<router-link to='/admin/message/index' class="ant-dropdown-menu-item opt-icon">
				<a-badge dot>
					<a-icon type="bell" style="color:#777;font-size:20px;" />
				</a-badge>
			</router-link>
			<div class="users">
				<a-dropdown placement="topRight">
					<div class="ant-dropdown-menu-item opt-icon">
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
								<a-icon type="logout" style="margin-right:5px;" />{{$t('GLOBAL.USER_LOG_OUT')}}
							</a>
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
			<div class="lans">
				<a-dropdown placement="topRight">
					<div class="ant-dropdown-menu-item opt-icon">
						<a-icon type="global" style="color:#777;font-size:20px;vertical-align:middle;cursor:pointer;" />
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
		<Qrcode :visiable="qrcodeVisiable" @cancel="() => this.qrcodeVisiable = false" />
	</div>
</template>

<script>
	import { Modal } from 'ant-design-vue'
	import Qrcode from '@/components/Qrcode.vue'

	import { createNamespacedHelpers } from 'vuex'
	const { mapGetters, mapActions } = createNamespacedHelpers('lang')
	
	export default {
		name: 'Header',
		components: {
			Qrcode
		},
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
				currentLocale: '',
				qrcodeVisiable: false,
				fullscreen: false
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
				handler: function(val) {
					this.currentLocale = val;
				},
				immediate: true
			},
			currentLocale(val) {
				this.switchLocale(val)
			}
		},
		mounted() {
			var that = this;
			window.addEventListener('resize', this.windowResize);
			window.addEventListener('keydown', function(e) {
				that.F11keydown(e);
			});
		},
		methods: {
			windowResize() {
				if (!document.fullscreenElement && !document.mozFullscreenElement && !document.webkitFullscreenElement) {
					this.fullscreen = false;
				}
			},
			F11keydown(e) {
				if (e.keyCode == 122) {
					e.preventDefault()
				}
			},
			onToggleCollapsed() {
				this.$emit('onToggleCollapsed', !this.collapsed);
			},
			handleSearch(value) {
				if (!value) {
					this.$message.warn('请输入搜索关键字');
				}
				console.log(`search for ${value}`);
			},
			openQrcode() {
				this.qrcodeVisiable = true;
			},
			toggleFullscreen() {
				if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen();
					this.fullscreen = true;
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
						this.fullscreen = false;
					}
				}
			},
			switchUserOption(item) {
				if (item.key == 'user.logout') {
					const that = this;
					const modal = Modal.confirm({
						title: '提示',
						content: '真的要注销登录吗 ?',
						okText: '确定',
						cancelText: '取消',
						onOk () {
							sessionStorage.clear();
							that.$router.push('/login');
							modal.destroy();
						}
					});
				}
			},
			selectLocale(item) {
				// console.log('selectLocale', item);
				// console.log(`当前选择语言为: ${item.key} - ${this.languageLabels[item.key][this.locales.indexOf(item.key)]}`);
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
	color: rgba(0, 0, 0, 0.45);
    box-shadow: 1px 1px 3px 0 #e8e8e8;
	z-index: 5;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 1px 0 2px 0 #e8e8e8 inset;
	z-index: -1;
}

.header-right {
	display: flex;
	align-items: center;
}

.opt-item {
	display: flex;
	align-items: center;
	margin-right: 15px;
}

.opt-icon {
	height: 64px;
	padding: 0 12px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.opt-icon>.anticon:first-child {
	margin-right: 0;
}
</style>
