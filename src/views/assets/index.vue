<template>
    <PageSkeleton
        :dataList="assetsList"
        :selectedRowKeys="selectedRowKeys"
        :excelConfig="excelConfig"
        :filters="filters"
        :withModal="withModal"
        :allowAdd="allowAdd"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        :showAllSelect="showAllSelect"
        @delItem="delItem"
        @checkAllItems="checkAllItems"
        @delMultiItems="delMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterBeforeSlot="{ filterForm }">
            <a-col v-if="filters.filterObjectId" :span="6">
                <a-form-item label="关联ID">
                    <a-input v-decorator="['object_id', {rules: [{message: '请输入关联ID',}], initialValue: ''}]"
                        placeholder="请输入关联ID" />
                </a-form-item>
            </a-col>
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="assetsList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="fileSlot" slot-scope="action">
                    <span v-if="!action" style="color:red;">缺失</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action" style="width:30px;height:30px;" alt=""></a>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="ASSETS_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/PageSkeleton.vue';

    import { getAssetsList, deleteAssets } from '@/api/setting';
    import config from './config'

    import { pluck } from '@/utils/util';

    export default {
        name: 'Assets',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                ASSETS_STATUS: config.ASSETS_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                assetsList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],  // 选择的数据ID组
                filters: config.filters,  // 筛选条件组
                showAllSelect: false, // 是否显示全选按钮
                photoPreviewVisible: false,
                previewPhoto: '',
                excelConfig: config.excelConfig,
                // ***************************
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
        created () {
            this.getAssetsListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
            },
            checkAllItems(allChecked) {
                this.selectedRowKeys = allChecked ? pluck(this.assetsList, 'id') : [];
            },
			delItem(id) {
                this.deleteAssetsFn([id]);
			},
			delMultiItems() {
				const deleteList = this.assetsList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = pluck(deleteList, 'id');
                this.deleteAssetsFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilter', values);
                this.getAssetsListFn(values);
            },
            handleFilterReset () {
                this.getAssetsListFn();
            },
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
            handleChange (pagination) {
                if (!this.assetsList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getAssetsListFn();
			},
            // api
            async getAssetsListFn (filters={}) {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getAssetsList(params);
                this.loading = false;
				this.assetsList = data.data;
                this.currentPage = data.current;
                this.showAllSelect = data.length > 0;
				this.pagination = {
					total: data.total,
					...config.pagination
				};
            },
            async deleteAssetsFn (ids) {
                const params = { ids: ids };
                const data = await deleteAssets(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getAssetsListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>