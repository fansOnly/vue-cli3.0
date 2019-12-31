<template>
    <PageSkeleton
        :dataList="bannerClassList"
        :selectedRowKeys="selectedRowKeys"
        :showAllSelect="showAllSelect"
        :excelConfig="excelConfig"
        :filters="filters"
        :visible="visible"
        :modalTitle="modalTitle"
        :okBtnDisabled="okBtnDisabled"
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
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="bannerClassList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="BANNER_CLASS_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <!-- <a-button size="small" @click="redirectPage(record)">管理</a-button> -->
                    <!-- <span>&nbsp;</span> -->
                    <a-button size="small" @click="showModal('edit', record.id)">{{allowEdit ? '编辑' : '查看'}}</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >删除</a-button>
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
    import PageSkeleton from '@/components/PageSkeleton.vue'

    import { getBannerClassList, addBannerClass, getBannerClassDetail, updateBannerClass, deleteBannerClass } from '@/api/banner'
    import config from './config'

    import { pluck } from '@/utils/util'

    export default {
        name: 'Banner',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                BANNER_CLASS_STATUS: config.BANNER_CLASS_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                allowEdit: config.allowEdit,
                bannerClassList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                visible: false,
                modalTitle: '',
                okBtnDisabled: false,
                filters: config.filters,
                showAllSelect: false, // 是否显示全选按钮
                excelConfig: config.excelConfig,
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
				// console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
            checkAllItems(allChecked) {
                this.selectedRowKeys = allChecked ? pluck(this.bannerClassList, 'id') : [];
            },
			delItem(id) {
                this.deleteBannerClassFn([id]);
			},
			delMultiItems() {
				const deleteList = this.bannerClassList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = pluck(deleteList, 'id');
                this.deleteBannerClassFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilter', values);
                this.getBannerClassListFn(values);
            },
            handleFilterReset () {
                this.getBannerClassListFn();
            },
            handleChange (pagination) {
                if (!this.bannerClassList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getBannerClassListFn();
			},
            redirectPage (record) {
                this.$router.push({name: 'bannerList', params: {classid: record.id}})
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
            async getBannerClassListFn (filters={}) {
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getBannerClassList(params);
				this.loading = false;
                this.bannerClassList = data.data;
                this.currentPage = data.current;
				this.pagination = {
					total: data.total,
					...config.pagination
				};

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
            async deleteBannerClassFn (ids) {
                const params = { ids: ids };
                const data = await deleteBannerClass(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getBannerClassListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>