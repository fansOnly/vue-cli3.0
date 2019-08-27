import Tools from '@/utils/Tools'
import { pagination } from '@/utils/configSetting'

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
			dataIndex: 'createTime',
            sorter: (a, b) => Tools.date2Timestamp(a.createTime) - Tools.date2Timestamp(b.createTime),
            width: '200px',
		},
        {
			title: '最近登陆',
            dataIndex: 'lastLoginTime',
            sorter: (a, b) => Tools.date2Timestamp(a.lastLoginTime) - Tools.date2Timestamp(b.lastLoginTime),
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
			width: '120px'
		}
	],
	pagination: {
		...pagination
	},
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}