<template>
    <div>
        <BreadCrumbComponent />
        <div class="container">
            <a-form :form="form" layout="vertical" @submit="handleSubmit">
                <a-row :gutter="24">
                    <a-col :span="16">
                        <a-form-item :label="$t('GLOBAL.MAXINUM')">
                            <a-input
                                v-decorator="[
                                    'max_files',
                                    { rules: [{ required: true }] }
                                ]"
                            />
                            <span slot="extra" class="help-block">{{$t('GLOBAL.MAXINUM_DESC')}}</span
                            >
                        </a-form-item>
                        <a-form-item :label="$t('GLOBAL.BLOCKSIZE')">
                            <a-input
                                v-decorator="[
                                    'chunk_size',
                                    { rules: [{ required: true }] }
                                ]"
                            />
                            <span slot="extra" class="help-block">{{$t('GLOBAL.BLOCKSIZE_DESC')}}</span
                            >
                        </a-form-item>
                        <a-form-item :label="$t('GLOBAL.IMAGEFILE')">
                            <a-row :gutter="24">
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[image][upload_max_filesize]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[image][extensions]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                            </a-row>
                            <span slot="extra" class="help-block">{{$t('GLOBAL.IMAGEFILE_DESC')}}</span
                            >
                        </a-form-item>
                        <a-form-item :label="$t('GLOBAL.VIDEOFILE')">
                            <a-row :gutter="24">
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[video][upload_max_filesize]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[video][extensions]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                            </a-row>
                            <span slot="extra" class="help-block">{{$t('GLOBAL.VIDEOFILE_DESC')}}</span
                            >
                        </a-form-item>
                        <a-form-item :label="$t('GLOBAL.AUDIOFILE')">
                            <a-row :gutter="24">
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[audio][upload_max_filesize]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[audio][extensions]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                            </a-row>
                            <span slot="extra" class="help-block">{{$t('GLOBAL.AUDIOFILE_DESC')}}</span
                            >
                        </a-form-item>
                        <a-form-item :label="$t('GLOBAL.ANNEX')">
                            <a-row :gutter="24">
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[file][upload_max_filesize]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                                <a-col :span="12"
                                    ><a-form-item
                                        ><a-input
                                            v-decorator="[
                                                'file_types[file][extensions]',
                                                { rules: [{ required: true }] }
                                            ]"/></a-form-item
                                ></a-col>
                            </a-row>
                            <span slot="extra" class="help-block">{{$t('GLOBAL.ANNEX_DESC')}}</span
                            >
                        </a-form-item>
                        <a-button type="primary" html-type="submit">{{$t('GLOBAL.BTN_SAVE')}}</a-button
                        >
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
import BreadCrumbComponent from "@/components/layouts/breadcrumb.vue";

export default {
    name: "UploadSetting",
    components: {
        BreadCrumbComponent
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((errors, values) => {
                if (!errors) {
                    console.log("Received values of form: ", values);
                }
            });
        }
    }
};
</script>
<style scoped>
.help-block {
    display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #597ea2;
}
.ant-form-vertical .ant-btn {
    margin-top: 0;
}
</style>
