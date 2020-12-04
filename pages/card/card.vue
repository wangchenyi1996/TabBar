<template>
	<view>
		<HCard :cardDatas='data'></HCard>
	</view>
</template>

<script>
	 import HCard from "@/components/hg-cards/hg-cards.vue";
	    export default {
	        components: {
	            HCard,
	        },
	        data() {
	            return {
	                data:[
	                    {name:'张1',color:'#aaff00'},
	                    {name:'张2',color:'#23ffde'},
	                    {name:'张3',color:'#78beff'},
	                    {name:'张4',color:'#d87dff'},
	                    {name:'张5',color:'#ffc39b'},
	                    {name:'张6',color:'#ffcef7'},
	                    {name:'张7',color:'#eaff9d'},
	                    {name:'张8',color:'#8c92ff'}
	                ]
	            }
	        }
			
	    }
</script>

<style>
</style>
