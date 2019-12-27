import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, ASSETS_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: '资源ID',
            dataIndex: 'id',
            width: '200px'
        },
        {
			title: '关联ID',
			dataIndex: 'object_id',
			width: '200px'
		},
		{
			title: '资源名称',
			dataIndex: 'name',
        },
        // {
		// 	title: '资源路径',
		// 	dataIndex: 'path',
        // },
        {
			title: '资源文件',
            dataIndex: 'file',
			scopedSlots: {customRender: 'fileSlot'},
        },
        {
			title: '资源类型',
            dataIndex: 'type',
			width: '120px'
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
			width: '110px',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '70px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filters: {
		...FILTER_ITEMS,
		STATUS: ASSETS_STATUS,
		filterID: false,
		filterTtile: false,
		filterObjectId: true,
		filterName: true,
	},
	excelConfig: {
		showExportBtn: true,
		excelFields: {
			'ID': 'object_id',
			'名称': 'name',
			'类型': 'type',
		},
		excelName: '资源导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	ASSETS_STATUS,
	BADGE_STATUS,
	actionList: ['删除'],
	allowAdd: false,
	withModal: false,
}