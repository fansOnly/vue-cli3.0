import dayjs from 'dayjs'
import { PAGINATION, FILTER_ITEMS, ACCOUNT_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: '会员ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '会员账号',
			dataIndex: 'username',
        },
		{
			title: '会员姓名',
			dataIndex: 'name',
        },
        {
			title: '手机号',
			dataIndex: 'phone',
        },
		{
			title: '管理员类型',
			dataIndex: 'type',
			scopedSlots: { customRender: 'typeSlot' },
			width: '120px',
		},
        {
			title: '创建时间',
			dataIndex: 'create_time',
			sorter: (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix(),
            width: '200px',
		},
        {
			title: '最近登陆',
            dataIndex: 'last_login_time',
			sorter: (a, b) => dayjs(a.last_login_time).unix() - dayjs(b.last_login_time).unix(),
            width: '200px'
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
		STATUS: ACCOUNT_STATUS,
		filterTtile: false,
		filterName: true,
		filterPhone: true,
	},
	excelConfig: {
		showExportBtn: false,
		excelFields: {
			'ID': 'id',
		},
		excelName: '导出-'+ dayjs().format('YYYY-MM-DD HH:mm:ss')
	},
	ACCOUNT_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}