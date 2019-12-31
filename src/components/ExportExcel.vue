<template>
    <export-excel
        :fields="excelFields"
        :data="excelData"
        :before-generate="startDownload"
        :before-finish="finishDownload"
        :name="excelName"
        type="xls"
    >
        <a-button>{{ btnName }}</a-button>
    </export-excel>
</template>

<script>
import JsonExcel from "vue-json-excel"

export default {
    name: "ExportExcel",
    components: {
        "export-excel": JsonExcel
    },
    props: {
        excelFields: {
            type: Object,
            default: function() {
                return {};
            }
        },
        excelData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        excelName: {
            type: String,
            default: function() {
                return "";
            }
        },
        btnName: {
            type: String,
            default: function() {
                return "导出";
            }
        }
    },
    methods: {
        startDownload() {
            this.$emit('exportExcel');
        },
        finishDownload() {}
    }
};
</script>
