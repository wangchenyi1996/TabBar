<template>
	<view>
		<lv-select @handleSearch="handleSearch" @change="change" placeholder="请输入信息" :infoList="infoLists" :showValue="showValue"
		 v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></lv-select>
	</view>
</template>

<script>
	import lvSelect from '../../components/lv-select/lv-select'
	export default {
		components: {
			lvSelect
		},
		data() {
			return {
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoLists: [
					{
						name: '叶星辰1'
					}, {
						name: '叶星辰2'
					}, {
						name: '叶星辰3'
					}, {
						name: '叶星辰4'
					},
					{
						name: '张三'
					}
				]
			}
		},
		methods: {
			handleSearch() {
				this.loading = true
				setTimeout(() => {
					this.loading = false
					this.infoLists = [
						{
							name: '叶星辰1'
						}, {
							name: '叶星辰2'
						}, {
							name: '叶星辰3'
						}, {
							name: '叶星辰4'
						},
						{
							name: '张三'
						}
					]
				}, 300)
			},
			// 点击搜索列表项
			change(val) {
				console.log(val)
			},
			input(val){
				console.log(val);
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
</style>