<template>
	<div>
		<BreadCrumbComponent />
		<div class="container">
			<a-form :form="form" @submit="handelSubmit">
				<a-row>
					<a-col :span="17">
						<a-form-item label="序号" v-bind="formItemLayout">
							<a-input-number v-decorator="['sortnum',]" placeholder="请输入序号" />
						</a-form-item>
						<a-form-item v-bind="formItemLayout">
							<span slot="label">
								<a-tooltip title="this is a tooltip.">
									标题
									<a-icon type="info-circle" class="label-tip" />
								</a-tooltip>
							</span>
							<a-input
								v-decorator="['title',{rules: [{required: true, message: '请输入标题！',}]}]"
								placeholder="请输入标题"
							/>
						</a-form-item>
						<a-form-item label="发布时间" v-bind="formItemLayout">
							<a-date-picker
								v-decorator="['create_time', {rules: [{ type: 'object', required: true, message: '请选择发布时间' }],}]"
								show-time
								format="YYYY-MM-DD HH:mm:ss"
								placeholder="请选择发布时间"
								class="ant-form-item_style2"
								readonly
							/>
						</a-form-item>
						<a-form-item label="简介" v-bind="formItemLayout">
							<a-textarea v-decorator="['intro']" placeholder="请输入简介" :autosize="{ minRows: 2, maxRows: 4 }" />
						</a-form-item>
						<a-form-item label="内容" v-bind="formItemLayout">
							<a-textarea v-decorator="['content']" placeholder="请输入内容" :rows="8" />
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="附件">
							<a-upload
								v-decorator="['files', {getValueFromEvent: fileUpload,}]"
								name="files"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								list-type="text"
								accept=".rar, .zip, .txt, .ppt, .xlc, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
							>
								<a-button>
									<a-icon type="upload" />点击上传
								</a-button>
								<span class="label-tip">只能上传zip,rar,doc,xls,ppt,txt</span>
							</a-upload>
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="相册" extra="只能上传jpg,png,gif">
							<a-upload
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								listType="picture-card"
								v-decorator="['photos',]"
								multiple
								:defaultFileList="photosList"
								@preview="handlePhotoPreview"
								@change="handlePhotoChange"
							>
								<div v-if="photosList.length < maxLength">
									<a-icon type="plus" />
									<div class="ant-upload-text">上传</div>
								</div>
							</a-upload>
							<a-modal :visible="photoPreviewVisible" :footer="null" @cancel="handlePhotopreviewCancel">
								<img alt="example" style="width: 100%" :src="previewPhoto" />
							</a-modal>
						</a-form-item>
						<a-form-item :wrapper-col="{ offset: 3 }" style="text-align:left;">
							<a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">发布</a-button>
							<a-button html-type="submit" style="margin-left:10px;">保存</a-button>
						</a-form-item>
					</a-col>
					<a-col :span="5" :offset="2">
						<a-form-item v-bind="formItemLayout" label="缩略图" class="ant-form-item_style2">
							<a-upload-dragger
								v-decorator="['thumbnail', {getValueFromEvent: uploadThumbnail,}]"
								name="thumbnail"
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								:disabled="uploadDisabled"
							>
								<p class="ant-upload-drag-icon" style="margin-bottom:0;">
									<a-icon type="inbox" />
								</p>
								<p class="ant-upload-text" style="margin-bottom:0;">点击或拖拽上传</p>
								<p class="ant-upload-hint">只能上传jpg,png,gif</p>
							</a-upload-dragger>
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="标签" hasFeedback class="ant-form-item_style2">
							<a-select
								v-decorator="['tags', {rules: [{ required: false, message: '请选择商品标签', type: 'array' }],}]"
								mode="multiple"
								allowClear
								placeholder="请选择商品标签"
							>
								<a-select-option value="new">新品</a-select-option>
								<a-select-option value="hot">热销</a-select-option>
								<a-select-option value="sale">折扣</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item v-bind="formItemLayout" label="状态" hasFeedback class="ant-form-item_style2">
							<a-select
								v-decorator="['state',{rules: [{ required: true, message: '请设置状态', }],initialValue: '1'},]"
								allowClear
								placeholder="请设置状态"
							>
								<a-select-option value="1">待审核</a-select-option>
								<a-select-option value="2">已审核</a-select-option>
								<a-select-option value="3">已置顶</a-select-option>
								<a-select-option value="0">已下架</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</div>
	</div>
</template>
<script>
	import BreadCrumbComponent from '@/components/layouts/breadcrumb.vue';
	import { message } from 'ant-design-vue';
	import moment from 'moment';

	function hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	export default {
		name: 'listEditPage',
		components: {
			BreadCrumbComponent
		},
		data() {
			return {
				id: 0,
				detail: {},
				formItemLayout: {
					labelCol: {
						sm: { span: 3 }
					},
					wrapperCol: {
						sm: { span: 21 }
					}
				},
				hasErrors,
				maxLength: 9,
				photoPreviewVisible: false,
				previewPhoto: '',
				photosList: [
					{
						uid: '-1',
						name: 'xxx.png',
						status: 'done',
						url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
					}
				],
				uploadDisabled: false
			};
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
		},
		mounted() {
			this.id = this.$route.params.id;
			if (this.id) {
				// 
			} else {
				// 设置默认值
				this.form.setFieldsValue({
					sortnum: 20,
					create_time: moment()
				});
				// this.$nextTick(() => {
				//   // To disabled submit button at the beginning.
				//   this.form.validateFields();
				// });
			}
		},
		methods: {
			onChange(value, dateString) {
				console.log('Selected Time: ', value);
				console.log('Formatted Selected Time: ', dateString);
			},
			onOk(value) {
				console.log('onOk: ', value);
			},
			fileUpload(e) {
				console.log('fileUpload:', e);
				// console.log('==================files====================', this.form.getFieldValue('files'))
				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
			handlePhotopreviewCancel() {
				this.photoPreviewVisible = false;
			},
			handlePhotoPreview(file) {
				this.previewPhoto = file.url || file.thumbUrl;
				this.photoPreviewVisible = true;
			},
			handlePhotoChange({ fileList }) {
				if (fileList.length > 9) {
					fileList.splice(8);
				}
				this.photosList = fileList;
			},
			uploadThumbnail(e) {
				console.log('uploadThumbnail:', e);
				this.uploadDisabled = e.fileList.length > 0;

				if (Array.isArray(e)) {
					return e;
				}
				return e && e.fileList;
			},
			handelSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('Received values of form: ', values);
						message.success('', 1, () => {
							history.back();
						})
					}
				});
			}
		}
	};
</script>