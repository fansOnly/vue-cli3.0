<template>
	<PageSkeleton
        :dataList="infoList"
        :selectedRowKeys="selectedRowKeys"
        :showAllSelect="showAllSelect"
        :excelConfig="excelConfig"
        :filters="filters"
        :withModal="withModal"
        :photoPreviewVisible="photoPreviewVisible"
        :previewPhoto="previewPhoto"
        @delItem="delItem"
        @delMultiItems="delMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
        @handlePhotopreviewCancel="handlePhotopreviewCancel"
        @showModal="routeTo"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterAfterSlot="{ filterForm }">
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
                    <a-button size="small" @click="routeTo('edit', record.id)">{{allowEdit ? '编辑' : '查看'}}</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
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
	import PageSkeleton from '@/components/PageSkeleton.vue';

	import { getInfoList, deleteInfo } from '@/api/info';

	import config from './config';
	import { pluck } from '@/utils/util';

	export default {
		name: 'infoPage',
		components: {
			PageSkeleton,
		},
		data() {
			return {
				INFO_STATUS: config.INFO_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                withModal: config.withModal,
                allowEdit: config.allowEdit,
                infoList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                filters: config.filters,
                showAllSelect: false, // 是否显示全选按钮
                excelConfig: config.excelConfig,
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
			checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
            checkAllItems(allChecked) {
                this.selectedRowKeys = allChecked ? pluck(this.infoList, 'id') : [];
            },
			delItem(id) {
                this.deleteInfoFn([id]);
			},
			delMultiItems() {
				const deleteList = this.infoList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = pluck(deleteList, 'id');
                this.deleteInfoFn(deleteIds);
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
			routeTo (action, editId) {
                if (action == 'add') {
					// this.$router.push({name: 'infoEdit', params: {id: 0}});
					this.$router.push({name: 'infoAdd'});
                } else if (action == 'edit') {
					this.$router.push({name: 'infoEdit', params: {id: editId}});
                } else {
                    this.$message.error('非法操作');
                }
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
			async deleteInfoFn (ids) {
                const params = { ids: ids };
                const data = await deleteInfo(params);
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

