<template>
    <PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :withModal="withModal"
        :allowAdd="allowAdd"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
    >
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="assetsList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="fileSlot" slot-scope="action">
                    <span v-if="!action" style="color:red;">缺失</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action" style="width:30px;height:30px;" alt=""></a>
                </span>
                <span slot="stateSlot" slot-scope="action">
                    <span v-if="action == 0" style="color:red;">{{ASSETS_STATUS[action]}}</span>
                    <span v-if="action == 1" style="color:green;">{{ASSETS_STATUS[action]}}</span>
                </span>
                <span slot="actionSlot" slot-scope="action, record, index">
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(index)">
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/skeleton/index.vue';

    import { getAssetsList, deleteAssets } from '@/api/setting';
    import config from './config'

    import { ASSETS_STATUS } from '@/utils/configSetting';

    export default {
        name: 'Assets',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                ASSETS_STATUS,
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                assetsList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                selectedRowKeys: [],
                photoPreviewVisible: false,
                previewPhoto: '',
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
			delItem(index) {
				console.log(`删除第 ${index} 项`);
				this.assetsList.splice(index, 1);
			},
			delMultiItems() {
				this.assetsList = this.assetsList.filter(
                    item => !this.selectedRowKeys.includes(item.id)
                );
                this.selectedRowKeys = [];
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
            async getAssetsListFn () {
                // console.log('config.pagination', config.pagination);
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize };
                const data = await getAssetsList(params);
                this.loading = false;
				this.assetsList = data.data;
                this.currentPage = data.current;
				this.pagination = {
					total: data.total,
					...config.pagination
				};
            },
            async deleteAssetsFn (params) {
                const data = await deleteAssets(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.getAssetsListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
        }
    }
</script>