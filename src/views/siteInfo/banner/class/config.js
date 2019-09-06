import Tools from '@/utils/Tools'
import { pagination, filters, BANNER_CLASS_STATUS, BADGE_STATUS } from '@/utils/configSetting'

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
            sorter: (a, b) => Tools.date2Timestamp(a.create_time) - Tools.date2Timestamp(b.create_time),
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
			width: '185px'
		}
	],
	pagination: {
		...pagination
	},
	filters: {
		...filters,
		STATUS: BANNER_CLASS_STATUS,
		hasTitle: false,
		hasName: true,
	},
	BANNER_CLASS_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	allowAdd: true,
	withModal: true,
}