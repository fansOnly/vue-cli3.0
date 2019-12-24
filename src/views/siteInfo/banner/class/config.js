import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, BANNER_CLASS_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
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
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix(),
            width: '200px',
		},
		{
			title: '状态',
			dataIndex: 'state',
			scopedSlots: { customRender: 'stateSlot' },
			width: '80px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '200px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filters: {
		...FILTER_ITEMS,
		STATUS: BANNER_CLASS_STATUS,
		filterTtile: false,
		filterName: true,
	},
	excelConfig: {
		showExportBtn: false,
		excelFields: {
			'ID': 'id',
			'名称': 'title',
		},
		excelName: '导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	BANNER_CLASS_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}