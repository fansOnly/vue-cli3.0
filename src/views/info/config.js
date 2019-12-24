import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, INFO_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '80px'
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
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '100px',
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
		delete_time: 0,
		STATUS: INFO_STATUS,
		filterAdmin: false
	},
	excelConfig: {
		showExportBtn: true,
		excelFields: {
			'ID': 'id',
			'标题': 'title',
		},
		excelName: '文章导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	INFO_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	withModal: false,
	allowEdit: true,
}