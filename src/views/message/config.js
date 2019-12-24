import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, MESSAGE_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: '留言ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '姓名',
			dataIndex: 'name',
        },
        {
			title: '手机号',
			dataIndex: 'phone',
        },
        {
			title: '邮箱',
			dataIndex: 'email',
        },
        {
			title: '留言时间',
			dataIndex: 'create_time',
			sorter: (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix(),
            width: '200px',
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
		STATUS: MESSAGE_STATUS,
		filterID: false,
		filterTtile: false,
		filterName: true,
		filterPhone: true,
	},
	excelConfig: {
		showExportBtn: true,
		excelFields: {
			'ID': 'id',
			'姓名': 'name',
			'手机号': 'phone',
			'邮箱': 'email',
		},
		excelName: '留言导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	MESSAGE_STATUS,
	BADGE_STATUS,
	actionList: ['回复','删除'],
	allowAdd: false,
	withModal: true,
	allowEdit: false,
}