<template>
    <div class="container">
        <a-form :form="form" @submit="handleSubmit">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="留言ID">
                        <a-input v-decorator="['id', {initialValue: detail.id}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="留言姓名">
                        <a-input v-decorator="['name', { initialValue: detail.name || ''}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="留言手机">
                        <a-input v-decorator="['phone', {initialValue: detail.phone || ''}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="留言邮箱">
                        <a-input v-decorator="['email', {initialValue: detail.email || ''}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="留言时间">
                        <a-input v-decorator="['create_time', {initialValue: detail.create_time || ''}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="留言内容">
                        <a-textarea v-decorator="['content', {initialValue: detail.content || ''}]" :autosize="{minRows:2, maxRows:6}" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item >
                        <span slot="label">附件图片</span>
                        <a-upload
                            listType="picture-card"
                            v-decorator="['fileList']"
                            disabled
                            :fileList="detail.photos"
                            @preview="handlePhotoPreview"
                        >
                        </a-upload>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="留言回复">
                        <a-textarea v-decorator="['reply', {initialValue: detail.reply || ''}]" :autosize="{minRows:2, maxRows:6}" :disabled="!!detail.reply_time" />
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="!!detail.reply_time">
                    <a-form-item label="回复时间">
                        <a-input v-decorator="['reply_time', {initialValue: detail.reply_time || ''}]" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="留言状态">
                        <a-radio-group v-decorator="['state', {initialValue: detail.state}]" disabled buttonStyle="solid" >
                            <template v-for="(item, index) in MESSAGE_STATUS">
                                <a-radio-button :key="index" :value="index">{{item}}</a-radio-button>
                            </template>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item>
                        <a-button v-if="!!detail.reply_time" @click="() => {$router.back()}">返回</a-button>
                        <a-button v-else type="primary" html-type="submit">回复</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <a-modal :visible="photoPreviewVisible" :zIndex=1001 :footer="null" @cancel="handlePhotopreviewCancel">
            <img alt="" style="width: 100%" :src="previewPhoto" />
        </a-modal>
    </div>
</template>

<script>
import { getMessageDetail, updateMessage } from '@/api/message'
import config from './config'

export default {
    name: 'MessageView',
    data() {
        return {
            MESSAGE_STATUS: config.MESSAGE_STATUS,
            detail: {},
            action: '',
            allowEdit: false,
            photoPreviewVisible: false,
            previewPhoto: '',
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    mounted() {
        this.id = this.$route.params.id;
        this.action = this.$route.params.action;
        this.allowEdit = this.action == 'edit';
        this.getMessageDetailFn();
    },
    methods: {
        handlePhotopreviewCancel() {
            this.photoPreviewVisible = false;
        },
        handlePhotoPreview(file) {
            if (typeof file === 'string') {
                this.previewPhoto = file;
            }
            if (typeof file === 'object') {
                this.previewPhoto = file.url || file.thumbUrl;
            }
            this.photoPreviewVisible = true;
        },
        handleSubmit(e) {
            if (this.okBtnDisabled) return;
            e.preventDefault();
            this.form.validateFields((err, fieldsValue) => {
                if (!err) {
                    console.log('Received values of form: ', fieldsValue);
                    this.updateMessageFn(fieldsValue);
                }
            });
        },
        async getMessageDetailFn () {
            const data = await getMessageDetail({id: this.id})
            if (data.code == '200') {
                this.detail = data.data;
            }
        },
        async updateMessageFn (params) {
            this.okBtnDisabled = true;
            const data = await updateMessage(params);
            if (data.code == '200') {
                this.$message.success(data.msg, () => {
                    this.okBtnDisabled = false;
                });
            } else {
                this.$message.error(data.msg);
            }
        },
    }
}
</script>