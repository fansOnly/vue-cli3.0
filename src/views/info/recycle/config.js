import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, INFO_STATUS, BADGE_STATUS } from '@/config/setting';

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '缩略图',
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbnailSlot' }
		},
		{
			title: '发布时间',
			dataIndex: 'create_time',
			width: '200px',
			sorter: (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix(),
		},
		{
			title: '删除时间',
			dataIndex: 'delete_time',
			width: '200px',
			sorter: (a, b) => dayjs(a.delete_time).unix() - dayjs(b.delete_time).unix(),
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '135px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filters: {
		...FILTER_ITEMS,
		STATUS: INFO_STATUS,
		filterAdmin: false,
		filterState: false,
	},
	excelConfig: {
		showExportBtn: false,
		excelFields: {
			'ID': 'id',
		},
		excelName: '导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	INFO_STATUS,
	BADGE_STATUS,
	actionList: ['还原','删除'],
	withModal: false,
	allowEdit: false,
	allowAdd: false,
}