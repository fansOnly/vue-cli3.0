<template>
    <div class="login-page" :style="{ height: getWindowHeight }">
        <a-form class="login-form" :form="form" @submit="handleSubmit">
            <a-form-item class="login-form_item">
                <a-input
                    v-decorator="[
                        'username',
                        {
                            rules: [
                                { required: true, message: '请输入您的用户名' }
                            ]
                        }
                    ]"
                    placeholder="用户名：test"
                />
                <a-icon
                    slot="prefix"
                    type="user"
                    style="color:rgba(0,0,0,0.25)"
                />
            </a-form-item>
            <a-form-item class="login-form_item">
                <a-input
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                { required: true, message: '请输入您的密码' }
                            ]
                        }
                    ]"
                    type="password"
                    placeholder="密码：123456"
                />
                <a-icon
                    slot="prefix"
                    type="lock"
                    style="color:rgba(0,0,0,0.25)"
                />
            </a-form-item>
            <a-form-item>
                <div class="login-form_rem">
                    <a-checkbox
                        v-decorator="[
                            'remember',
                            { valuePropName: 'checked', initialValue: true }
                        ]"
                        >记住账号</a-checkbox
                    >
                    <router-link to="">忘记密码</router-link>
                </div>
                <a-button class="login-button" type="primary" html-type="submit"
                    >登陆</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { randString } from "@/utils/util";

export default {
    name: "Login",
    data() {
        return {
            form: this.$form.createForm(this)
        };
    },
    computed: {
        getWindowHeight: function() {
            return document.documentElement.clientHeight + "px";
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log("login data: ", values);
                    const { username, password } = values;
                    if (username === "test" && password === "123456") {
                        this.$message.success("登陆成功").then(() => {
                            const user = { id: 1, name: "test" };
                            sessionStorage.setItem("user", JSON.stringify(user));
                            sessionStorage.setItem("token", randString(32));
                            this.$router.push("/admin/index");
                        });
                    } else {
                        this.$message.error("账号密码不匹配");
                    }
                }
            });
        }
    }
};
</script>
<style scoped>
.login-page {
    background: url('../../assets/images/loginbg.svg') 0 0 no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-form {
    width: 350px;
    transform: translateY(-100px);
}

.login-form_item {
    margin-top: 15px;
    margin-bottom: 0;
}

.login-form_rem {
	display: flex;
	justify-content: space-between;
}

.login-button {
	width: 100%;
}
</style>
