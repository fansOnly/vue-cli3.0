<template>
	<PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :withModal="withModal"
        :allowAdd="allowAdd"
        :visible="visible"
        :okBtnDisabled="okBtnDisabled"
        :modalTitle="modalTitle"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="accountList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="stateSlot" slot-scope="action">
                    <span v-if="action == 0" style="color:red;">{{ACCOUNT_STATUS[action]}}</span>
                    <span v-if="action == 1" style="color:green;">{{ACCOUNT_STATUS[action]}}</span>
                </span>
                <span slot="actionSlot" slot-scope="action, record, index">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
        <template slot="formSlot">
            <a-form layout="vertical" :form="form">
                <a-form-item v-if="action == 'edit'" label="管理员ID">
                    <a-input v-decorator="['id', {initialValue: initialAccount.id}]" disabled />
                </a-form-item>
                <a-form-item label="管理员账号">
                    <a-input v-decorator="['username', {rules: [{required: true,}], initialValue: initialAccount.username || ''}]" />
                </a-form-item>
                <a-form-item label="管理员密码">
                    <a-input :type="showPass ? 'text' : 'password'" v-decorator="['password', {rules: [{required: true,}], initialValue: initialAccount.password || ''}]" >
                        <a-icon type='eye' slot="addonAfter" @click="togglePassword" />
                    </a-input>
                </a-form-item>
                <a-form-item label="管理员姓名">
                    <a-input v-decorator="['name', {rules: [{required: true,}], initialValue: initialAccount.name || ''}]" />
                </a-form-item>
                <a-form-item label="管理员手机">
                    <a-input v-decorator="['phone', {rules: [{pattern: /^1[3456789]\d{9}$/, message: '错误的手机号码'}], initialValue: initialAccount.phone || ''}]" />
                </a-form-item>
                <a-form-item label="管理员邮箱">
                    <a-input v-decorator="['email', {rules: [{type: 'email'}], initialValue: initialAccount.email || ''}]" />
                </a-form-item>
                <a-form-item label="管理员分类">
                    <a-radio-group v-decorator="['type', {rules:[{required: true, }], initialValue: initialAccount.type}]" buttonStyle="solid" >
                        <a-radio-button value="超级管理员" disabled>超级管理员</a-radio-button>
                        <a-radio-button value="系统管理员">系统管理员</a-radio-button>
                        <a-radio-button value="审核管理员">审核管理员</a-radio-button>
                        <a-radio-button value="普通管理员">普通管理员</a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="管理员状态">
                    <a-radio-group v-decorator="['state', {rules:[{required: true, }], initialValue: initialAccount.state}]" buttonStyle="solid" >
                        <a-radio-button value="禁用">禁用</a-radio-button>
                        <a-radio-button value="正常">正常</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </template>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getAccountList, addAccount, getAccountDetail, updateAccount } from '@/api/account';
    import config from './config'

    import { ACCOUNT_STATUS } from '@/utils/configSetting';

    export default {
        name: 'Account',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                ACCOUNT_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                accountList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                // ***************************
                action: '',
                initialAccount: {},
                showPass: false,
            }
        },
        computed: {
			rowSelection () {
				let { selectedRowKeys } = this;
				return {
					selectedRowKeys,
					onChange: this.checkItems,
				}
			}
		},
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created () {
            this.getAccountListFn();
        },
        methods: {
            togglePassword () {
                this.showPass = !this.showPass;
            },
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.accountList.splice(index, 1);
			},
			delMultiItems() {
				this.accountList = this.accountList.filter(
                    item => !this.selectedRowKeys.includes(item.id)
                );
                this.selectedRowKeys = [];
                this.getAccountListFn();
            },
            handleChange (pagination) {
                if (!this.accountList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getAccountListFn();
			},
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增管理员';
                    this.visible = true;
                } else if (action == 'edit') {
                    this.editId = editId;
                    this.action = action;
                    this.modalTitle = '编辑管理员信息';
                    this.getAccountDetailFn();
                } else {
                    this.$message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                console.log('form.isFieldsTouched()', this.form.isFieldsTouched());
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if (this.form.isFieldsTouched()) {
                            // 处理参数
                            console.log('form values: ', values);
                            if (this.action == 'add') {
                                this.addAccountFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateAccountFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialAccount = {};
                this.fileList = [];
                this.form.resetFields();
            },
            // api
            async getAccountListFn () {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize };
                const data = await getAccountList(params);
                this.loading = false;
				this.accountList = data.data;
				this.pagination = {
					total: data.total,
					...config.pagination
				};

                this.resetFormData();
            },
            async getAccountDetailFn () {
                const data = await getAccountDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialAccount = data.data;
                    this.visible = true;
                }
            },
            async addAccountFn (params) {
                this.okBtnDisabled = true;
                const data = await addAccount(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getAccountListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateAccountFn (params) {
                this.okBtnDisabled = true;
                const data = await updateAccount(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getAccountListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>