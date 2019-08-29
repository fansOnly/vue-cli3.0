<template>
	<froala :tag="'textarea'" :config="config" :content="content"></froala>
</template>
<script>
    require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('froala-editor/css/froala_style.min.css')
require('froala-editor/js/languages/zh_cn')

    // Import and use Vue Froala lib.
    import Vue from 'vue'
    import VueFroala from 'vue-froala-wysiwyg'
    Vue.use(VueFroala)

	export default {
		data() {
			return {
				content: null,
				config: {
					zIndex: 2501,
					height: 200,
					toolbarSticky: false,
					autofocus: true,
					toolbarButtons: [
						'fullscreen',
						'bold',
						'italic',
						'underline',
						'strikeThrough',
						'subscript',
						'superscript',
						'|',
						'fontFamily',
						'fontSize',
						'color',
						'inlineClass',
						'inlineStyle',
						'paragraphStyle',
						'lineHeight',
						'|',
						'paragraphFormat',
						'align',
						'formatOL',
						'formatUL',
						'outdent',
						'indent',
						'quote',
						'-',
						'insertLink',
						'insertImage',
						'insertVideo',
						'embedly',
						'insertFile',
						'insertTable',
						'|',
						'emoticons',
						'fontAwesome',
						'specialCharacters',
						'insertHR',
						'selectAll',
						'clearFormatting',
						'|',
						'print',
						'getPDF',
						'spellChecker',
						'help',
						'html',
						'|',
						'undo',
						'redo'
					],
					placeholder: '请填写内容',
					language: 'zh_cn',
					imageDefaultWidth: 500,
					imageUploadURL: 'xxxxxxxx',
					videoUploadURL: 'xxxxxxx',
					fileUploadURL: 'xxxxxxx',
					imageManagerLoadURL: 'xxxxxx',
					requestHeaders: { Authorization: localStorage.eleToken },
					events: {
						'froalaEditor.focus' : function(e, editor) {
      console.log(editor.selection.get());
    }
					}
				}
			};
		},
		methods: {
			setHtml(html) {
				if (this.editor) {
					this.editor.html.set(html);
				}
			}
		}
	};
</script>
<style></style>