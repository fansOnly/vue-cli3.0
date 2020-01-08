<template>
	<div class="container">
		<a-form :form="form" layout="vertical" @submit="handleSubmit">
			<a-row :gutter="50">
				<a-col :span="12">
					<a-form-item :label="$t('GLOBAL.USER_NICKNAME')">
						<a-input v-decorator="['nickname',{rules: [{required: true, whitespace:true}]}]" placeholder="your nick name such as Bob" />
					</a-form-item>
					<a-form-item :label="$t('GLOBAL.USER_PHONE')">
						<a-input v-decorator="['phone',{rules: [{required: true, pattern: /^1[3456789]\d{9}$/, message: '错误的手机号码'}]}]" placeholder="1xx xxxx xxxx">
							<a-select slot="addonBefore" v-decorator="[ 'phonePrefix', { initialValue: '86' }]" style="width: 70px" >
								<a-select-option value="86">+86</a-select-option>
								<a-select-option value="87">+87</a-select-option>
							</a-select>
						</a-input>
					</a-form-item>
					<a-form-item :label="$t('GLOBAL.USER_EMAIL')">
						<a-input v-decorator="['email',{rules: [{type: 'email', message: '错误的邮箱格式'}]}]" placeholder="example@qq.com" />
					</a-form-item>
					<a-form-item :label="$t('GLOBAL.USER_NOTE')">
						<a-textarea v-decorator="['content']" :rows="4" placeholder="say some thing here..." />
					</a-form-item>
					<a-form-item>
						<a-button type='primary' html-type='submit'>{{$t('GLOBAL.BTN_SAVE')}}</a-button>
						<a-button html-type='reset' style="margin-left:8px;">{{$t('GLOBAL.BTN_RESET')}}</a-button>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<div class="avatarBox" @mouseover="() => this.maskVisiable = true" @mouseout="() => this.maskVisiable = false" @click="openUpload">
						<div v-show="maskVisiable" class="mask"><a-icon type="plus" style='color:#fff;font-size:35px;' /></div>
						<img class="avatar" :src="avatar" alt="">
						<a-icon type="cloud-upload" class="upload-icon" />
					</div>
				</a-col>
			</a-row>
		</a-form>
		<AvatarUpload :visiable="uploadVisiable" @cropperDone="cropperDone" @cancel="cropperCancel" />
	</div>
</template>

<script>
	import AvatarUpload from '@/components/AvatarUpload.vue'

	export default {
		name: 'UserInfo',
		components: {
			AvatarUpload
		},
		data () {
			return {
				avatar: 'https://preview.pro.loacg.com/avatar2.jpg',
				maskVisiable: false,
				uploadVisiable: false,
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
        },
        methods: {
			openUpload() {
				this.uploadVisiable = true;
			},
			cropperDone(url) {
				// 处理图片逻辑
				this.uploadVisiable = false;
				this.avatar = url;
			},
			cropperCancel() {
				this.uploadVisiable = false;
			},
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
	};
</script>
<style scoped>
.avatarBox {
	position: relative;
	width: 180px;
	height: 180px;
	margin: 40px 0 0 80px;
	border-radius: 100%;
    box-shadow: 0 0 4px #ccc;
}
.mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 100%;
	cursor: pointer;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
}
.avatar {
	width: 180px;
	height: 180px;
	border-radius: 100%;
	overflow: hidden;
	cursor: pointer;
}
.upload-icon {
	position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: .5rem;
    background: rgba(222,221,221,.7);
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.2);
}
</style>