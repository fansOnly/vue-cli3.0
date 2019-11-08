<template>
	<div>
		<div class="title">权限详情：</div>
		<froala :tag="'textarea'" :config='config' v-model='html'></froala>
		<a-button class="save" @click='saveHtml'>保存</a-button>
	</div>
</template>
<script>
	require('froala-editor/js/froala_editor.pkgd.min.js');
	require('froala-editor/css/froala_editor.pkgd.min.css');

	require('froala-editor/js/plugins/char_counter.min.js');
	require('froala-editor/css/plugins/char_counter.min.css');
	require('froala-editor/js/plugins/code_view.min.js');
	require('froala-editor/js/plugins/fullscreen.min.js');
	require('froala-editor/css/plugins/fullscreen.min.css');
	require('froala-editor/js/plugins/print.min.js');
	require('froala-editor/js/third_party/spell_checker.min.js');
	require('froala-editor/css/third_party/spell_checker.min.css');

	require('froala-editor/js/plugins/colors.min.js');
	require('froala-editor/css/plugins/colors.min.css');
	require('froala-editor/js/plugins/font_family.min.js');
	require('froala-editor/js/plugins/font_size.min.js');
	require('froala-editor/js/plugins/line_height.min.js');
	require('froala-editor/js/plugins/align.min.js');
	require('froala-editor/js/plugins/url.min.js');
	require('froala-editor/js/plugins/code_beautifier.min.js');
	require('froala-editor/js/plugins/word_paste.min.js');
	require('froala-editor/js/plugins/paragraph_format.min.js');
	require('froala-editor/js/plugins/paragraph_style.min.js');
	require('froala-editor/js/plugins/lists.min.js');

	require('froala-editor/js/plugins/file.min.js');
	require('froala-editor/js/plugins/link.min.js');
	require('froala-editor/css/plugins/file.min.css');
	require('froala-editor/js/plugins/image.min.js');
	require('froala-editor/css/plugins/image.min.css');
	require('froala-editor/js/plugins/video.min.js');
	require('froala-editor/css/plugins/video.min.css');
	require('froala-editor/js/plugins/table.min.js');
	require('froala-editor/css/plugins/table.min.css');
	require('froala-editor/js/plugins/emoticons.min.js');
	require('froala-editor/css/plugins/emoticons.min.css');
	require('froala-editor/js/plugins/draggable.min.js');
	require('froala-editor/css/plugins/draggable.min.css');
	require('froala-editor/js/third_party/font_awesome.min.js');
	require('froala-editor/css/third_party/font_awesome.min.css');
	require('froala-editor/js/third_party/embedly.min.js');
	require('froala-editor/css/third_party/embedly.min.css');


	require('froala-editor/js/plugins/quick_insert.min.js');
	require('froala-editor/css/plugins/quick_insert.min.css');

	// Require Froala Editor css files.
	require('froala-editor/css/froala_style.min.css');
	require('froala-editor/js/languages/zh_cn');

	// Import and use Vue Froala lib.
	import Vue from 'vue';
	import VueFroala from 'vue-froala-wysiwyg';
	Vue.use(VueFroala);

	export default {
		name: 'Editor',
		props: {
			content: {
				type: String,
				default: function() {
					return '';
				}
			}
		},
		data() {
			return {
				html: this.content,
				config: {
					zIndex: 2501,
					height: 200,
					toolbarSticky: false,
					autofocus: true,
					toolbarButtons: {
						'moreText': {
							'buttons': ['fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'bold', 'italic', 'underline', 'strikeThrough', 'inlineClass', 'inlineStyle', 'subscript', 'superscript', 'clearFormatting'],
							// 'buttonsVisible': 2
						},
						'moreParagraph': {
							'buttons': ['lineHeight', 'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'outdent', 'indent', 'quote', 'word_paste'],
							'buttonsVisible': 2
						},
						'moreRich': {
							'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
							'buttonsVisible': 2
						},
						'moreMisc': {
							'buttons': ['undo', 'redo', 'fullscreen', 'selectAll', 'html', 'print', 'getPDF', 'spellChecker', 'help'],
							'align': 'right',
							'buttonsVisible': 2
						}
					},
					placeholder: '请填写内容',
					charCounterCount: true,
					language: 'zh_cn',
					imageDefaultWidth: 500,
					imageUploadURL: 'http://i.froala.com/upload',
					videoUploadURL: 'http://i.froala.com/upload',
					fileUploadURL: 'http://i.froala.com/upload',
					imageManagerLoadURL: 'http://i.froala.com/upload',
					quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],
					// requestHeaders: { Authorization: localStorage.eleToken },
					events: {
						'initialized': function() {
							console.log('initialized', this);
						},
						// 'contentChanged': function() {
						// 	console.log('contentChanged', this);
						// },
					}
				},
			};
		},
		methods: {
			saveHtml() {
				this.$emit('change', this.html);
			}
		}
	};
</script>
<style scoped>
	.title {
		padding-top: 7px;
		padding-bottom: 4px;
		font-size: 16px;
		line-height: 24px;
	}
	.save {
		margin-top: 15px;
	}
</style>