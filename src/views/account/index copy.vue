<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容区域 -->
            <div class="option-bar">
                <!-- 内容操作区域 -->
                <a-button style="margin-right:10px;" type="primary" @click="showModal('add')">新增</a-button>
                <template v-if="selectedRowKeys.length">
                    <a-button style="margin-right:10px;" type="default" @click="delMultiItems">批量删除</a-button>
                    <div>
                        当前共选择
                        <strong style="color:#1890ff;">{{selectedRowKeys.length}}</strong> 条信息
                    </div>
                </template>
            </div>
            <!-- 内容展示区域 -->
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
            <!-- 管理员信息查看/修改弹窗 -->
            <Modal :visible="visible" :modalTitle="modalTitle" @cancel="handleCancel" @ok="handleSubmit">
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
            </Modal>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import Modal from '@/components/modal/index.vue';

    import { getAccountList, addAccount, getAccountDetail, updateAccount } from '@/api/account';
    import config from './config'

    import { ACCOUNT_STATUS } from '@/utils/configSetting';

    export default {
        name: 'Account',
        components: {
            BreadCrumbComponent,
            Modal,
        },
        data () {
            return {
                ACCOUNT_STATUS,
                accountList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
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
				const that = this;
				this.$confirm({
					title: '删除提醒',
					content: '确认删除当前选中的信息吗?',
					okType: 'danger',
					onOk() {
						that.accountList = that.accountList.filter(
							item => !that.selectedRowKeys.includes(item.id)
						);
                        that.selectedRowKeys = [];
                        that.getAccountListFn();
					},
					onCancel() {
						console.log('Cancel');
					}
                });
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
                const data = await addAccount(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.visible = false;
                        this.getAccountListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateAccountFn (params) {
                const data = await updateAccount(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
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