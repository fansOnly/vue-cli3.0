<template>
    <div class="container">
        <a-button @click="openLoading">开启遮罩层</a-button>
        <Loading :spinning="spinning" />
        <a-divider />
        <!-- 滑块验证 -->
        <SlideBlockValidate />
        <a-divider />
        <!-- 验证码验证 -->
        <div class="validate-code-box">
            <span class="label">图片验证码</span>
            <a-input size="large" :maxlength="maxLength" v-model="validateText" />
            <CodeImageValidate :maxLength="maxLength" :isRefreshWhileFail="false" :validateFail="validateFail" @refresh="refreshValidateCode" />
        </div>
        <a-button style="margin-top:15px" @click="validateImageCode">验证</a-button>
        <a-button style="margin-left:15px" :type="maxLength == 4 ? 'primary' : 'default'" @click="validateFour">四位验证码</a-button>
        <a-button style="margin-left:15px" :type="maxLength == 6 ? 'primary' : 'default'" @click="validateSix">六位验证码</a-button>
        <a-divider />
        <!-- 短信验证码 -->
        <div class="validate-code-box">
            <span class="label">手机号</span>
            <a-input :maxlength="11" v-model="phone" style="width:200px" />
        </div>
        <div class="validate-code-box">
            <span class="label">短信验证码</span>
            <a-input :maxlength="6" v-model="validateSms" />
            <div style="margin-left:15px"><SmsValidate :phone='phone' @sendSms="sendSms" /></div>
        </div>
        <a-button style="margin-top:15px" @click="validateSmsCode">验证</a-button>
        <a-divider />
        <!-- TODO:手撕编辑器 -->
        <div class="title">fans editor v1.0 乞丐版</div>
        <FansEditor :html="editHtml" />
        <a-divider />
    </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import SlideBlockValidate from "@/components/funcs/SlideBlockValidate.vue";
import CodeImageValidate from "@/components/funcs/CodeImageValidate.vue";
import SmsValidate from "@/components/funcs/SmsValidate.vue";
import FansEditor from "@/components/funcs/FansEditor.vue";

export default {
    components: {
        Loading,
        SlideBlockValidate,
        CodeImageValidate,
        SmsValidate,
        FansEditor
    },
    data() {
        return {
            spinning: false,
            // 图片验证码
            validateText: '',
            validateSuccessCode: '',
            maxLength: 4,
            validateFail: true,
            // 短信验证码
            phone: '18888888888',
            validateSms: '',
            validateSuccessSms: '133313',
            // 编辑器
            editHtml: '1234567890'
        };
    },
    mounted() {
    },
    methods: {
        openLoading() {
            this.spinning = true;
            setTimeout(() => {
                this.spinning = false;
            }, 5000);
        },
        validateFour() {
            this.maxLength = 4;
            this.validateText = '';
            this.refreshValidateCode();
        },
        validateSix() {
            this.maxLength = 6;
            this.validateText = '';
            this.refreshValidateCode();
        },
        validateImageCode() {
            if (this.validateText.toUpperCase() == this.validateSuccessCode) {
                this.$message.success('success');
            } else {
                this.validateFail = !this.validateFail;
                this.$message.error('fail');
            }
        },
        refreshValidateCode(validateSuccessCode) {
            this.validateSuccessCode = validateSuccessCode;
        },
        sendSms(sms) {
            console.log('短信验证码', sms);
            this.validateSuccessSms = sms;
        },
        validateSmsCode() {
            if (this.validateSms == this.validateSuccessSms) {
                this.$message.success('success');
            } else {
                this.$message.error('fail');
            }
        }
    }
};
</script>
<style scoped>
.validate-code-box {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
}
.validate-code-box .label {
    width: 80px;
}
.validate-code-box .ant-input {
    width: 120px;
}
.title {
    margin-bottom: 15px;
    font-size: 18px;
}
</style>
