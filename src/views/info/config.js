import { date2Timestamp } from '@/utils/util';
import { pagination, filters, INFO_STATUS, BADGE_STATUS } from '@/config/setting';

export default {
    columns: [
        {
			title: 'ID',
			dataIndex: 'id',
			width: '120px'
		},
        {
			title: '序号',
			dataIndex: 'sortnum',
			sorter: (a, b) => a.sortnum - b.sortnum,
			width: '80px'
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
			sorter: (a, b) => date2Timestamp(a.create_time) - date2Timestamp(b.create_time)
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
		delete_time: 0,
		STATUS: INFO_STATUS,
		hasAdmin: false
	},
	INFO_STATUS,
	BADGE_STATUS,
	actionList: ['编辑','删除'],
	withModal: false,
	allowEdit: true,
}