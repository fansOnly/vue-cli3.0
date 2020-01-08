<template src='./index.html'></template>
<script>
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'

	dayjs.extend(relativeTime)

	import {
		visitEchartOption,
		payEchartOption,
		searchTotalEchartOption,
		searchAvgEchartOption,
		salesEchartOption,
		searchHotColumns
	} from './config'
	import {
		getVisitsByWeek,
		getPayByWeek,
		getSearchTotalByWeek,
		getSearchAvgByWeek,
		getSalesByWeek,
		getSearchHot
	} from '@/api/statics'

	let salesDataSource = {};
	let salesEchart = null;

	export default {
		name: 'Welcome',
		data() {
			return {
				percent: 78,
				comments: [
					{
						id: 22234234,
						actions: [this.$t('GLOBAL.BTN_REPLY')],
						author: 'Han Solo',
						avatar:
							'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						content:
							'We supply a series of design principles, practical patterns and .',
						datetime: dayjs().subtract(1, 'days')
					},
					{
						id: 2223423422222,
						actions: [this.$t('GLOBAL.BTN_REPLY')],
						author: 'Han Solo',
						avatar:
							'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						content:
							'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
						datetime: dayjs().subtract(2, 'hours')
					}
				],
				dayjs,
				news: [
					{ title: 'Ant Design Title 1' },
					{ title: 'Ant Design Title 2' },
					{ title: 'Ant Design Title 3' },
					{ title: 'Ant Design Title 4' },
					{ title: 'Ant Design Title 5' }
				],
				salesCurrentDataSource: [],
				totalSales: 0,
				columns: searchHotColumns,
				searchHot: [],
				pagination: {
					page: 1,
					pageSize: 4
				},
				visitTotal: 0,
				dayVisit: 0,
				payTotal: 0,
				searchTotal: 0,
				searchAvg: 0
			};
		},
		created () {
			this.getSearchHot();
		},
		mounted() {
			// 渲染访问量统计
			const visitEchartEle = document.getElementById('visitEchart');
			let visitEchart = this.$echarts.init(visitEchartEle);

			// 渲染订单金额统计
			const payEchartEle = document.getElementById('payEchart');
			let payEchart = this.$echarts.init(payEchartEle);

			// 渲染搜索总量统计
			const searchTotalEchartEle = document.getElementById('searchTotalEchart');
			let searchTotalEchart = this.$echarts.init(searchTotalEchartEle);

			// 渲染平均搜索统计
			const searchAvgEchartEle = document.getElementById('searchAvgEchart');
			let searchAvgEchart = this.$echarts.init(searchAvgEchartEle);

			// 渲染销售金额统计
			const salesEchartEle = document.getElementById('salesEchart');
			salesEchart = this.$echarts.init(salesEchartEle);

			var that = this;
			const getAllData = async function() {
				const [
					visitsByWeekData,
					payByWeekdata,
					searchTotalByWeekdata,
					searchAvgByWeekdata,
					salesByWeekdata
				] = await Promise.all([
					getVisitsByWeek(),
					getPayByWeek(),
					getSearchTotalByWeek(),
					getSearchAvgByWeek(),
					getSalesByWeek()
				]);

				visitEchartOption.dataset.source = visitsByWeekData.data;
				visitEchart.setOption(visitEchartOption);
				that.visitTotal = visitsByWeekData.total;
				that.dayVisit = visitsByWeekData.day;

				payEchartOption.dataset.source = payByWeekdata.data;
				payEchart.setOption(payEchartOption);
				that.payTotal = payByWeekdata.total;

				searchTotalEchartOption.dataset.source = searchTotalByWeekdata.data;
				searchTotalEchart.setOption(searchTotalEchartOption);
				that.searchTotal = searchTotalByWeekdata.total;

				searchAvgEchartOption.dataset.source = searchAvgByWeekdata.data;
				searchAvgEchart.setOption(searchAvgEchartOption);
				that.searchAvg = searchAvgByWeekdata.total;

				salesEchartOption.dataset.source = salesByWeekdata.data.allData;
				salesEchart.setOption(salesEchartOption);

				salesDataSource = salesByWeekdata.data;
				let salesCurrentDataSourceInit = salesDataSource.allData;
				that.totalSales = that.calcSaleTotal(salesCurrentDataSourceInit);
				that.salesCurrentDataSource = salesCurrentDataSourceInit;
			};
			getAllData();
		},
		methods: {
			switchSalesType(e) {
				// console.log('value', e.target.value+'Data');
				let salesCurrentDataSourceInit = salesDataSource[e.target.value + ['Data']];

				salesEchartOption.dataset.source = salesCurrentDataSourceInit;
				salesEchart.setOption(salesEchartOption);
				this.totalSales = this.calcSaleTotal(salesCurrentDataSourceInit);
				this.salesCurrentDataSource = salesCurrentDataSourceInit;
			},
			calcSaleTotal(data) {
				return Number(data.reduce((sum, salesPerData) => sum + Number(salesPerData[1]),0));
			},
			handleChange (pagination) {
                if (!this.searchHot.length) return;
				this.loading = true;
				this.pagination = { page: pagination.current, pageSize: pagination.pageSize };
                this.getSearchHot();
			},
			async getSearchHot() {
				const params = { page: this.pagination.page, pageSize: this.pagination.pageSize };
				const data = await getSearchHot(params);
				this.loading = false;
				this.searchHot = data.data;
				this.pagination = {
					...this.pagination,
					total: data.total,
				}
			}
		}
	};
</script>
<style scoped>
	@import './index.css';
</style>