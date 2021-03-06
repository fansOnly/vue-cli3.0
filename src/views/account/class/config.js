import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, ACCOUNT_CLASS_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: '分类ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '分类名称',
			dataIndex: 'name',
        },
		{
			title: '管理权限',
			dataIndex: 'permission',
			scopedSlots: { customRender: 'permissionSlot' },
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
			width: '135px'
		}
	],
	pagination: {
		...PAGINATION
	},
	filters: {
		...FILTER_ITEMS,
		STATUS: ACCOUNT_CLASS_STATUS,
		filterTtile: false,
		filterName: true,
	},
	excelConfig: {
		showExportBtn: false,
		excelFields: {
			'ID': 'id',
		},
		excelName: '留言导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	ACCOUNT_CLASS_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
	treeData: [
		{
			title: '基本设置',
			value: '0-0',
			key: '0-0',
			children: [
				{
					title: '上传设置',
					value: '0-0-0',
					key: '0-0-0',
				}
			],
		},
		{
			title: '日志管理',
			value: '0-1',
			key: '0-1',
			children: [
				{
					title: '日志查看',
					value: '0-1-0',
					key: '0-1-0',
				}
			],
		},
	],
	treeDataSimple: [
		{
			id: 5,
			pId: 0,
			value: '5',
			label: '基本设置'
		},
		{
			id: 2,
			pId: 5,
			value: '2',
			label: '上传设置'
		},
		{
			id: 3,
			pId: 5,
			value: '3',
			label: '幻灯片管理'
		},
		{
			id: 4,
			pId: 0,
			value: '4',
			label: '日志管理'
		},
	]
}