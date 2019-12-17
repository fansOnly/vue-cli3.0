import { date2Timestamp } from '@/utils/util'
import { pagination, filters, MEMBER_STATUS, BADGE_STATUS } from '@/config/setting'

export default {
    columns: [
        {
			title: '会员ID',
            dataIndex: 'id',
            width: '200px'
        },
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => Number(a.sortnum) - Number(b.sortnum),
			width: '80px'
		},
		{
			title: '会员姓名',
			dataIndex: 'name',
        },
        {
			title: '会员头像',
			dataIndex: 'avatar',
            scopedSlots: {customRender: 'avatarSlot'}
        },
        {
			title: '手机号',
			dataIndex: 'phone',
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
		...pagination
	},
	filters: {
		...filters,
		STATUS: MEMBER_STATUS,
		hasTitle: false,
		hasName: true,
		hasPhone: true,
	},
	MEMBER_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: false,  // 禁止后台新增前台用户
	withModal: true,
	allowEdit: false,  // 禁止后台编辑前台用户
}