import Tools from '@/utils/Tools';
import { pagination, filters, INFO_STATUS, BADGE_STATUS } from '@/utils/configSetting';

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '缩略图',
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbnailSlot' }
		},
		{
			title: '发布时间',
			dataIndex: 'create_time',
			width: '200px',
			sorter: (a, b) => Tools.date2Timestamp(a.create_time) - Tools.date2Timestamp(b.create_time)
		},
		{
			title: '删除时间',
			dataIndex: 'delete_time',
			width: '200px',
			sorter: (a, b) => Tools.date2Timestamp(a.delete_time) - Tools.date2Timestamp(b.delete_time)
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
		STATUS: INFO_STATUS,
		hasAdmin: false,
		hasState: false,
	},
	INFO_STATUS,
	BADGE_STATUS,
	actionList: ['还原','删除'],
	withModal: false,
	allowEdit: false,
	allowAdd: false,
}