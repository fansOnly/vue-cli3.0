<template>
    <div class="login-wrap">
        <div class="logo-box">
            <img class="logo" src="../../assets/images/logo.png" alt="">
            <div class="en-logo">Rare Ant</div>
        </div>
        <div class="title">欢迎使用西游蚂蚁技术体验部产品</div> 
        <a-form class="login-form" :form="form" @submit="handleSubmit">
            <a-form-item class="login-form_item">
                <a-input v-decorator="['username',{rules: [{ required: true, message: '请输入您的用户名' }]}]" placeholder="用户名：test" />
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,0.25)" />
            </a-form-item>
            <a-form-item class="login-form_item">
                <a-input v-decorator="['password',{rules: [{ required: true, message: '请输入您的密码' }]}]" type="password" placeholder="密码：123456" />
                <a-icon  slot="prefix"  type="lock"  style="color:rgba(0,0,0,0.25)" />
            </a-form-item>
            <a-form-item>
                <div class="login-form_rem">
                    <a-checkbox v-decorator="['remember',{ valuePropName: 'checked', initialValue: true }]">记住账号</a-checkbox >
                    <router-link to="">忘记密码</router-link>
                </div>
                <a-button type="primary" size="large" block html-type="submit" :loading="logining">登陆</a-button>
            </a-form-item>
        </a-form>
        <div class="footer"><Footer /></div>
    </div>
</template>

<script>
import { randString } from "@/utils/util"
import Footer from '@/components/layouts/Footer.vue'

export default {
    name: "Login",
    components: {
        Footer
    },
    data() {
        return {
            form: this.$form.createForm(this),
            logining: false
        };
    },
    computed: {
        getWindowHeight: function() {
            return document.documentElement.clientHeight + "px";
        }
    },
    methods: {
        handleSubmit(e) {
            this.logining = true;
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log("login data: ", values);
                    const { username, password } = values;
                    if (username === 'test' && password === '123456') {
                        setTimeout(() => {
                            const user = { id: 1, name: 'test' };
                            sessionStorage.setItem('user', JSON.stringify(user));
                            sessionStorage.setItem('token', randString(32));
                            this.logining = false;
                            this.$message.success("登陆成功", 1, () => {
                                this.$router.push('/admin/index');
                            })
                        }, 2000)
                    } else {
                        setTimeout(() => {
                            this.logining = false;
                            this.$message.error('账号密码不匹配');
                        }, 2000)
                    }
                }
            });
        }
    }
};
</script>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: 200px 0 144px;
    background: #f0f2f5 url(../../assets/images/loginbg.svg) no-repeat 50%;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 50px;
    height: auto;
}

.en-logo {
    margin-left: 15px;
    font-size: 40px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
}

.title {
    padding: 10px 0;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.45);
}

.login-form {
    width: 350px;
}

.login-form_item {
    margin: 0;
    padding: 8px 0;
}

.login-form_rem {
	display: flex;
	justify-content: space-between;
    padding: 0 0 8px;
}

.footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
}
</style>
