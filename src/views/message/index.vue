<template>
	<PageSkeleton
        :dataList="messageList"
        :selectedRowKeys="selectedRowKeys"
        :showAllSelect="showAllSelect"
        :excelConfig="excelConfig"
        :filters="filters"
        :allowAdd="allowAdd"
        @delItem="delItem"
        @checkAllItems="checkAllItems"
        @delMultiItems="delMultiItems"
        @handleFilter="handleFilter"
        @handleFilterReset="handleFilterReset"
    >
        <!-- 渲染筛选条件 -->
        <template v-slot:filterAfterSlot="{ filterForm }">
        </template>
        <!-- 渲染数据 -->
        <template slot="tableSlot">
            <a-table rowKey="id" :loading="loading" :columns="columns" :dataSource="messageList" :pagination="pagination" :rowSelection="rowSelection" bordered @change="handleChange" >
                <span slot="stateSlot" slot-scope="action">
                    <a-badge :status="BADGE_STATUS(action)" :text="MESSAGE_STATUS[action]" />
                </span>
                <span slot="actionSlot" slot-scope="action, record">
                    <a-button size="small" @click="showModal('view', record.id)">{{allowEdit ? '编辑' : '查看'}}</a-button>
                    <span>&nbsp;</span>
                    <a-popconfirm title='确认删除当前信息吗?' @confirm="() => delItem(record.id)">
                        <a-button size="small" type="danger" >删除</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </template>
        <a-modal :visible="photoPreviewVisible" :zIndex=1001 :footer="null" @cancel="handlePhotopreviewCancel">
            <img alt="" style="width: 100%" :src="previewPhoto" />
        </a-modal>
    </PageSkeleton>
</template>

<script>
    import PageSkeleton from '@/components/PageSkeleton.vue'

    import { getMessageList, deleteMessage } from '@/api/message'
    import { pluck } from '@/utils/util'
    import config from './config'

    export default {
        name: 'Message',
        components: {
            PageSkeleton,
        },
        data () {
            return {
                MESSAGE_STATUS: config.MESSAGE_STATUS,
                BADGE_STATUS: config.BADGE_STATUS,
                allowEdit: config.allowEdit,
                allowAdd: config.allowAdd,
                messageList: [],
                columns: config.columns,
                pagination: {},
                loading: true,
                // 传递给PageSkeleton组件的props
                selectedRowKeys: [],
                filters: config.filters,
                showAllSelect: false, // 是否显示全选按钮
                excelConfig: config.excelConfig,
                // ***************************
                photoPreviewVisible: false,
                previewPhoto: '',
                action: '',
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
            this.getMessageListFn();
        },
        methods: {
            checkItems(selectedRowKeys) {
				console.log('selectedRowKeys', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
            },
            checkAllItems(allChecked) {
                this.selectedRowKeys = allChecked ? pluck(this.messageList, 'id') : [];
            },
			delItem(id) {
                this.deleteMessageFn([id]);
			},
			delMultiItems() {
				const deleteList = this.messageList.filter(
                    item => this.selectedRowKeys.includes(item.id)
                );
                const deleteIds = deleteList.map(item => item.id);
                this.deleteMessageFn(deleteIds);
            },
            handleFilter (values) {
                console.log('handleFilterValues', values);
                this.getMessageListFn(values);
            },
            handleFilterReset () {
                this.getMessageListFn();
            },
            handleChange (pagination) {
                if (!this.messageList.length) return;
                // console.log('pagination', pagination);
				this.loading = true;
                config.pagination.page = pagination.current;
                config.pagination.pageSize = pagination.pageSize;
                this.getMessageListFn();
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
            showModal (action, editId) {
                if (action == 'view') {
                    this.$router.push({name: 'MessageView', params: {id: editId, action}});
                } else {
                    this.$message.error('非法操作');
                }
            },
            // api
            async getMessageListFn (filters={}) {
                const params = { page: config.pagination.page, pageSize: config.pagination.pageSize, ...filters };
                const data = await getMessageList(params);
                this.loading = false;
				this.messageList = data.data;
                this.currentPage = data.current;
				this.pagination = {
					total: data.total,
					...config.pagination
				};
            },
            async deleteMessageFn (ids) {
                const params = { ids: ids };
                const data = await deleteMessage(params);
                if (data.code == '200') {
                    this.$message.success(data.msg, () => {
                        this.selectedRowKeys = [];
                        this.getMessageListFn();
                    });
                } else {
                    this.$message.error(data.msg);
                }
            },
        }
    }
</script>