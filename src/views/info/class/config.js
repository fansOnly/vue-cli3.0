export default {
    columns: [
        {
			title: '分类ID',
            dataIndex: 'id',
            width: '200px'
        },
		{
			title: '分类名称',
			dataIndex: 'name',
		},
		{
			title: '缩略图',
			dataIndex: 'thumbnail',
			scopedSlots: { customRender: 'thumbnailSlot' },
        },
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: { customRender: 'actionSlot' },
			width: '200px'
		}
	],
	actionList: ['编辑','删除'],
	withFilter: false,
	allowAdd: true,
	withModal: true,
	allowEdit: true,
}