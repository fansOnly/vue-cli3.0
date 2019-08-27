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
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
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
			width: '100px',
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
	allowAdd: false,
	withModal: true,
	allowEdit: false,
}