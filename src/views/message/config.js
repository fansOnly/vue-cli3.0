import Tools from '@/utils/Tools'
import { pagination, filters, MESSAGE_STATUS, BADGE_STATUS } from '@/utils/configSetting'

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
            sorter: (a, b) => Tools.date2Timestamp(a.create_time) - Tools.date2Timestamp(b.create_time),
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
		...pagination
	},
	filters: {
		...filters,
		STATUS: MESSAGE_STATUS,
		hasID: false,
		hasTitle: false,
		hasName: true,
		hasPhone: true,
	},
	MESSAGE_STATUS,
	BADGE_STATUS,
	actionList: ['回复','删除'],
	allowAdd: false,
	withModal: true,
	allowEdit: false,
}