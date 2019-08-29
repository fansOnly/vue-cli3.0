<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
            <!-- 内容展示区域 -->
            <a-row :gutter="12">
                <a-col :span="12">
                    <a-directory-tree
                        :treeData="treeData"
                        defaultExpandAll
                        @select="selectTreeNode"
                    >
                    </a-directory-tree>
                </a-col>
                <a-col :span="12">
                    <div class="node-tips">{{permissionDetail.content}}</div>
                    <!-- <froala :tag="'textarea'" :config="config" v-model="model"></froala> -->
                    <Editor @change="change" ></Editor>
                </a-col>
            </a-row>
		</div>
	</div>
</template>

<script>
    import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';

    import { getPermissionTree, getPermissionDetail } from '@/api/account';
    import Editor from './editor.vue'

    export default {
        name: 'Permission',
        components: {
            BreadCrumbComponent,
            Editor,
        },
        data () {
            return {
                permissionList: [],
                treeData: [],
                permissionDetail: {},
            }
        },
        created () {
            this.getPermissionTreeFn();
        },
        methods: {
            change (content) {
                console.log('content', content);
            },
            selectTreeNode (selectedKeys, e) {
                console.log('selectTreeNode', selectedKeys, e)
                const nodeId = selectedKeys[0].split('-')[selectedKeys[0].split('-').length - 1];
                this.nodeId = nodeId;
                this.getPermissionDetailFn();
            },
            async getPermissionTreeFn () {
                const data = await getPermissionTree();
                if (data.code == '200') {
                    this.treeData = data.data;
                }
            },
            async getPermissionDetailFn () {
                const params = {id: this.nodeId}
                const data = await getPermissionDetail(params);
                if (data.code == '200') {
                    this.permissionDetail = data.data;
                }
            }
        }
    }
</script>
<style scoped>
    .node-tips {
        padding-top: 5px;
        line-height: 28px;
    }
</style>