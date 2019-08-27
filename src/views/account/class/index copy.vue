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
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="accountClassList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="permissionSlot" slot-scope="action">
                    <template v-for="(item, index) in action">
                        <a-tag :key="index" color="blue">{{item}}</a-tag>
                    </template>
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
            </Modal>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
    import Modal from '@/components/modal/index.vue';

    import { getAccountClassList, addAccountClass, getAccountClassDetail, updateAccountClass, getPermissionList } from '@/api/account';
    import config from './config'

    import { TreeSelect } from 'ant-design-vue'
    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    export default {
        name: 'AccountClass',
        components: {
            BreadCrumbComponent,
            Modal,
        },
        data () {
            return {
                // form: this.$form.createForm(this),
                accountClassList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
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
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.accountClassList.splice(index, 1);
			},
			delMultiItems() {
				const that = this;
				this.$confirm({
					title: '删除提醒',
					content: '确认删除当前选中的信息吗?',
					okType: 'danger',
					onOk() {
						that.accountClassList = that.accountClassList.filter(
							item => !that.selectedRowKeys.includes(item.id)
						);
                        that.selectedRowKeys = [];
                        that.getAccountClassListFn();
					},
					onCancel() {
						console.log('Cancel');
					}
                });
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
            async getAccountClassListFn () {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize };
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
                const data = await addAccountClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.visible = false;
                        this.getAccountClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateAccountClassFn (params) {
                const data = await updateAccountClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
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
            }
        }
    }
</script>