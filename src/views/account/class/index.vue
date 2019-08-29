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
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="accountClassList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="permissionSlot" slot-scope="action">
                    <template v-for="(item, index) in action">
                        <a-tag :key="index" color="blue">{{item}}</a-tag>
                    </template>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="ACCOUNT_CLASS_STATUS[action]" />
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
                    <a-input v-decorator="['id', {initialValue: initialAccountClass.id}]" disabled />
                </a-form-item>
                <a-form-item label="分类名称">
                    <a-input v-decorator="['name', {rules: [{required: true,}], initialValue: initialAccountClass.name || ''}]" />
                </a-form-item>
                <a-form-item label="分类权限">
                    <a-tree-select
                        v-decorator="['permission', {rules:[{required: true, }], initialValue: initialAccountClass.permission}]"
                        :treeData="treeData"
                        treeDataSimpleMode
                        treeCheckable
                        allowClear
                        :showCheckedStrategy="SHOW_PARENT"
                        placeholder='Please select'
                        @change="onTreeSelectChange"
                    />
                </a-form-item>
                <a-form-item label="管理员状态">
                    <a-radio-group v-decorator="['state', {rules:[{required: true, }], initialValue: initialAccountClass.state}]" buttonStyle="solid" >
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

    import { getAccountClassList, addAccountClass, getAccountClassDetail, updateAccountClass, getPermissionList, deleteAccountClass } from '@/api/account';
    import config from './config'
    import Tools from '@/utils/Tools';

    import { TreeSelect } from 'ant-design-vue'
    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    export default {
        name: 'AccountClass',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                ACCOUNT_CLASS_STATUS: config.ACCOUNT_CLASS_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                accountClassList: [],
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
                initialAccountClass: {},
                showPass: false,
                permission: [],
                treeData: config.treeDataSimple,
                SHOW_PARENT,
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
            this.getAccountClassListFn();
            this.getPermissionListFn();
        },
        methods: {
            onTreeSelectChange (value) {
                console.log('onTreeSelectChange ', value);
                this.permission = value;
            },
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(id) {
                this.deleteAccountClassFn([id]);
			},
			delMultiItems() {
				const deleteList = this.accountClassList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = Tools.pluck(deleteList, 'id');
                this.deleteAccountClassFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilter', values);
                this.getAccountClassListFn(values);
            },
            handleFilterReset () {
                this.getAccountClassListFn();
            },
            handleChange (pagination) {
                if (!this.accountClassList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getAccountClassListFn();
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
                    this.getAccountClassDetailFn();
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
                                this.addAccountClassFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateAccountClassFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialAccountClass = {};
                this.fileList = [];
                this.form.resetFields();
            },
            // api
            async getAccountClassListFn (filters={}) {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getAccountClassList(params);
                this.loading = false;
				this.accountClassList = data.data;
				this.pagination = {
					total: data.total,
					...config.pagination
				};

                this.resetFormData();
            },
            async getAccountClassDetailFn () {
                const data = await getAccountClassDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialAccountClass = data.data;
                    this.visible = true;
                }
            },
            async addAccountClassFn (params) {
                this.okBtnDisabled = true;
                const data = await addAccountClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getAccountClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateAccountClassFn (params) {
                this.okBtnDisabled = true;
                const data = await updateAccountClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.okBtnDisabled = false;
                        this.visible = false;
                        this.getAccountClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async getPermissionListFn () {
                const data = await getPermissionList();
                if (data.code == '200') {
                    this.treeData = data.data;
                }
            },
            async deleteAccountClassFn (ids) {
                const params = { ids: ids };
                const data = await deleteAccountClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getAccountClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>