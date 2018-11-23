<template>
	<div>

		<router-link :to="{name: 'Test', params:{p: 1}}">
			<div>子路由1</div>
		</router-link>

		<router-link :to="{name: 'Test', params:{p: 2}}">
			<div>子路由2</div>
		</router-link>

		<div style="height: 300px">
			这是内容区
			<router-view></router-view>
		</div>

		<router-link :to="{name: 'BookDetails', params:{id: 1}}">
			<div>图书A</div>
		</router-link>

		<router-link :to="{name: 'BookDetails', params:{id: 2}}">
			<div>图书B</div>
		</router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bookId: 1
			}
		},
		created(){
			this.bookId = this.$route.params.id;
		},
		watch: {
			'$route'(to, from){
				this.bookId = to.params.id;
			}

		}
	}
</script>

<style>
</style>
