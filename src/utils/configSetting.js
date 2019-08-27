
/**
 * 表单布局配置
 */
export const formLayout = {
    formItemLayout: {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    },
    btnFormItemLayout: {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 2,
            },
        },
    },
};

/**
 * 页码布局配置
 */
export const pagination = {
    page: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条信息`,
}

/**
 * 全局状态管理
 */
// 管理员状态管理 account
export const ACCOUNT_STATUS = ['禁用', '正常'];

// 资源状态管理 assets
export const ASSETS_STATUS = ['文件缺失', '正常'];

// 前台会员状态管理 member
export const MEMBER_STATUS = ['已冻结', '待审核', '已审核'];