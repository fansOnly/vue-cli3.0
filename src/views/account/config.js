import { date2Timestamp } from '@/utils/util'
import { pagination, filters, ACCOUNT_STATUS, BADGE_STATUS } from '@/utils/configSetting'

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
            sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time),
            width: '200px',
		},
        {
			title: '最近登陆',
            dataIndex: 'last_login_time',
            sorter: (a, b) => date2Timestamp(a.last_login_time) - date2Timestamp(b.last_login_time),
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
		...pagination
	},
	filters: {
		...filters,
		STATUS: ACCOUNT_STATUS,
		hasTitle: false,
		hasName: true,
		hasPhone: true,
	},
	ACCOUNT_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}