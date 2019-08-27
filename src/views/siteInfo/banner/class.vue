<template>
    <PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :visible="visible"
        :modalTitle="modalTitle"
        :okBtnDisabled="okBtnDisabled"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @showModal="showModal"
        @handleCancel="handleCancel"
        @handleSubmit="handleSubmit"
    >
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerClassList" :pagination="pagination" :rowSelection="rowSelection" bordered >
                <span slot="actionx" slot-scope="action, record, index">
                    <a @click="showModal('edit', record.id)">编辑</a>
                    <a-divider type="vertical" />
                    <router-link :to="{name: 'bannerList', params: {classid: record.id}}">管理</router-link>
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
                <a-form-item v-if="action == 'edit'" label="分类ID">
                    <a-input v-decorator="['id', {initialValue: initialBannerClass.id}]" disabled />
                </a-form-item>
                <a-form-item label="分类名称">
                    <a-input v-decorator="['name', {rules: [{required: true,}], initialValue: initialBannerClass.name}]" />
                </a-form-item>
                <a-form-item label="分类描述">
                    <a-input v-decorator="['content', {initialValue: initialBannerClass.content}]" />
                </a-form-item>
            </a-form>
        </template>
    </PageSkeleton>
</template>

<script>

    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getBannerClassList, addBannerClass, getBannerClassDetail, updateBannerClass } from '@/api/banner';

    const columns = [
        {
			title: '分类ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '分类名称',
			dataIndex: 'title',
        },
        {
			title: '分类描述',
			dataIndex: 'content',
        },
        {
			title: '发布时间',
			dataIndex: 'createTime',
            width: '200px'
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionx' },
			width: '180px'
		}
	];

    export default {
        name: 'Banner',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                bannerClassList: [],
                columns,
                pagination: false,
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                // ***************************
                action: '',
                initialBannerClass: {},
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
            this.getBannerClassListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.bannerClassList.splice(index, 1);
			},
			delMultiItems() {
				this.bannerClassList = this.bannerClassList.filter(
                    item => !this.selectedRowKeys.includes(item.id)
                );
                this.selectedRowKeys = [];
                this.getBannerClassListFn();
			},
            showModal (action, editId) {
                if (action == 'add') {
                    this.action = action;
                    this.modalTitle = '新增幻灯片分类';
                    this.visible = true;
                } else if (action == 'edit') {
                    this.action = action;
                    this.editId = editId;
                    this.modalTitle = '编辑幻灯片分类';
                    this.getBannerclassDetailFn();
                } else {
                    this.$message.error('非法操作');
                }
            },
            handleCancel () {
                this.resetFormData();
                this.visible = false;
            },
            handleSubmit () {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('form values: ', values);
                        if (this.form.isFieldsTouched()) {
                            if (this.action == 'add') {
                                this.addBannerClassFn(values);
                            }
                            if(this.action == 'edit') {
                                this.updateBannerClassFn(values);
                            }
                        } else {
                            this.handleCancel();
                        }
                    }
                })
            },
            resetFormData () {
                this.initialBannerClass = {};
                this.form.resetFields();
            },
            // api
            async getBannerClassListFn () {
                const data = await getBannerClassList();
				this.loading = false;
                this.bannerClassList = data.data;

                this.resetFormData();
            },
            async getBannerclassDetailFn () {
                const data = await getBannerClassDetail({id: this.editId})
                if (data.code == '200') {
                    this.initialBannerClass = data.data;
                    this.visible = true;
                }
            },
            async addBannerClassFn (params) {
                this.okBtnDisabled = true;
                const data = await addBannerClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.getBannerClassListFn();
                        this.okBtnDisabled = false;
                        this.visible = false;
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
            async updateBannerClassFn (params) {
                this.okBtnDisabled = true;
                const data = await updateBannerClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.getBannerClassListFn();
                        this.okBtnDisabled = false;
                        this.visible = false;
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>