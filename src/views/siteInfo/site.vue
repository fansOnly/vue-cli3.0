<template src="./site.html"> </template>

<script>
import { getSiteInfo, updateSiteInfo } from '@/api/setting';

export default {
    name: 'SiteSetting',
    data() {
        return {
            tabActiveKey: 'base_info',
            inputVisible: false,
            inputValue: '',
            base_info: {},
            advance_info: {},
            seo_info: {},
            hotwords_info: []
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    created() {
        this.getSiteInfoFn();
    },
    methods: {
        handleTabChange(activeKey) {
            this.tabActiveKey = activeKey;
        },
        handleClose(removedTag) {
            const hotwords_info = this.hotwords_info.filter(
                tag => tag !== removedTag
            );
            this.updateSiteInfoFn(hotwords_info);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(function() {
                this.$refs.words.focus();
            });
        },
        handleInputChange(e) {
            this.inputValue = e.target.value;
        },
        handleInputConfirm() {
            const inputValue = this.inputValue;
            let hotwords_info = this.hotwords_info;
            if (inputValue && hotwords_info.indexOf(inputValue) === -1) {
                hotwords_info = [...hotwords_info, inputValue];
                this.updateSiteInfoFn(hotwords_info);
            }
            Object.assign(this, {
                inputVisible: false,
                inputValue: ''
            });
        },
        handleInputCancel() {
            Object.assign(this, {
                inputVisible: false,
                inputValue: ''
            });
        },
        handleSubmit(e) {
            e.preventDefault();
            const allfFields = {
                base_info: ['name', 'phone', 'email', 'copyright', 'content'],
                advance_info: [],
                seo_info: ['seo_title', 'seo_keyword', 'seo_description'],
                hotwords_info: []
            };
            if (this.tabActiveKey == 'hotwords_info') {
                return;
            }
            const currentFileds = allfFields[this.tabActiveKey];
            this.form.validateFields(currentFileds, (errors, values) => {
                if (!errors) {
                    console.log('Received values of form: ', values);
                    this.updateSiteInfoFn(values);
                }
            });
        },
        // api
        async getSiteInfoFn() {
            const data = await getSiteInfo();
            const {
                base_info,
                advance_info,
                seo_info,
                hotwords_info
            } = data.data;
            this.base_info = base_info;
            this.advance_info = advance_info;
            this.seo_info = seo_info;
            this.hotwords_info = hotwords_info;
        },
        async updateSiteInfoFn(datas) {
            const params = {
                [this.tabActiveKey]: datas,
                tag: this.tabActiveKey
            };
            const data = await updateSiteInfo(params);
            if (data.code == '200') {
                this.$message.success(data.msg, 1, () => {
                    // this.hotwords_info = hotwords_info;
                });
            } else {
                this.$message.error(data.msg, 1);
            }
        }
    }
};
</script>
<style scoped>
.ant-form-vertical .ant-btn {
    margin-top: 0;
}
</style>
