<template>
	<PageSkeleton
        :selectedRowKeys="selectedRowKeys"
        :filters="filters"
        :withModal="withModal"
        :allowAdd="allowAdd"
        @delItem="clearItem"
        @delMultiItems="clearMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterAfterSlot="{ filterForm }">
            <a-col v-if="filters.filterCreateTime" :span="6">
                <a-form-item label="删除日期" >
                    <a-date-picker v-decorator="['delete_time', {rules: [{type: 'object',message: '请选择删除日期',}]}]"
                        placeholder="请选择删除日期" style="width: 100%" />
                </a-form-item>
            </a-col>
        </template>
        <!-- 渲染操作按钮 -->
        <template slot="optionSlot">
            <a-button style="margin-right:10px;" type="default" @click="restoreMultiItems">批量还原</a-button>
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="infoList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <template slot="thumbnailSlot" slot-scope="action">
                    <span v-if="!action">暂无</span>
                    <a v-else href="javascript:;" @click="handlePhotoPreview(action)"><img :src="action" style="width:30px;height:30px;" alt=""></a>
                </template>
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="INFO_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="restoreItem(record.id)">还原</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => clearItem(record.id)">
                        <a-button size="small" type="danger" >删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <!-- 渲染编辑框 -->
        <template slot="formSlot">
        </template>
    </PageSkeleton>
</template>

<script>
	import PageSkeleton from '@/components/PageSkeleton.vue'

	import { getInfoList, restoreInfo, clearInfo } from '@/api/info'

    import config from './config'

	export default {
		name: 'infoRecycle',
		components: {
			PageSkeleton,
		},
		data() {
			return {
				INFO_STATUS: config.INFO_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                infoList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                withModal: config.withModal,
                allowAdd: config.allowAdd,
                selectedRowKeys: [],
                filters: config.filters,
                // ***************************
                action: '',
                photoPreviewVisible: false,
                previewPhoto: '',
			};
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
			this.getInfoListFn();
		},
		mounted() {
			// console.log('router info:', this.$route);
			this.classid = this.$route.params.classid;
		},
		methods: {
			checkItems (selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			clearItem (id) {
                this.clearInfoFn([id]);
			},
			restoreItem (id) {
                this.restoreInfoFn([id]);
			},
			clearMultiItems () {
				const deleteList = this.infoList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = deleteList.map(item => item.id);
                this.clearInfoFn(deleteIds);
            },
            restoreMultiItems () {
                const restoreList = this.infoList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const restoreIds = restoreList.map(item => item.id);
                this.restoreInfoFn(restoreIds);
            },
            handleFilter (values) {
                console.log('handleFilterValues', values);
                this.getInfoListFn(values);
            },
            handleFilterReset () {
                this.getInfoListFn();
            },
            handleChange (pagination) {
                if (!this.infoList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getInfoListFn();
			},
			handlePhotoPreview (file) {
                if (typeof file === 'string') {
                    this.previewPhoto = file;
                }
                if (typeof file === 'object') {
                    this.previewPhoto = file.url || file.thumbUrl;
                }
				this.photoPreviewVisible = true;
			},
			// api
			async getInfoListFn (filters={}) {
				const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
				const data = await getInfoList(params);
				this.loading = false;
				this.infoList = data.data;
				this.TOTAL = data.total;
				this.pagination = {
					total: data.total,
					...config.pagination
				};
			},
			async restoreInfoFn (ids) {
                const params = { ids: ids };
                const data = await restoreInfo(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getInfoListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
			async clearInfoFn (ids) {
                const params = { ids: ids };
                const data = await clearInfo(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, 1, () => {
                        this.selectedRowKeys = [];
                        this.getInfoListFn();
                    });
                } else {
                    this.$message.error(data.msg, 1);
                }
            },
		}
	};
</script>
<style scoped>
	
</style>

