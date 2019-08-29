<template>
	<PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :filters="filters"
        :withModal="withModal"
        :allowAdd="allowAdd"
        :visible="visible"
        :okBtnDisabled="okBtnDisabled"
        :modalTitle="modalTitle"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterAfterSlot="{ filterForm }">
            <!-- <a-col v-if="filters.hasName" :span="6">
                <a-form-item label="数据名称" >
                    <a-input v-decorator="['name', {rules: [{message: '请输入数据名称',}], initialValue: ''}]"
                        placeholder="请输入数据名称" />
                </a-form-item>
            </a-col> -->
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="accountList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="ACCOUNT_STATUS[action]" />
                    <!-- <span v-if="action == 0" style="color:red;">{{ACCOUNT_STATUS[action]}}</span>
                    <span v-if="action == 1" style="color:green;">{{ACCOUNT_STATUS[action]}}</span> -->
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
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

    import { getAccountList, addAccount, getAccountDetail, updateAccount, deleteAccount } from '@/api/account';
    import config from './config'
    import Tools from '@/utils/Tools';

    export default {
        name: 'Account',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                ACCOUNT_STATUS: config.ACCOUNT_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
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
                filters: config.filters,
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
			delItem(id) {
                this.deleteAccountFn([id]);
			},
			delMultiItems() {
				const deleteList = this.accountList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = Tools.pluck(deleteList, 'id');
                this.deleteAccountFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilter', values);
                this.getAccountListFn(values);
            },
            handleFilterReset () {
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
            async getAccountListFn (filters={}) {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getAccountList(params);
                this.loading = false;
				this.accountList = data.data;
				this.pagination = {
					...config.pagination,
					total: data.total,
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
            async deleteAccountFn (ids) {
                const params = { ids: ids };
                const data = await deleteAccount(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getAccountListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>