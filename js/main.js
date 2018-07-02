(function(){
	'use strict';

	var likeComponent = Vue.extend({
		props: {
			message: {
				type: String,
				default: 'like'
			}
		},
		data: function(){
			return {count: 0};
		},
		template: '<button v-on:click="countUp">{{ message }} {{ count }}</button>',
		methods: {
			countUp: function(){
				this.count++
				this.$emit('increment');
			}
		}
	})

	var vm = new Vue({
		el:'#app',
		components: {
			'like-component': likeComponent
		},
		data: {
			newItem: '',
			todos: [],
			total: 0,
			count: 0,
			count2:0
		},
		watch:{
			todos: {
				handler: function(){
					localStorage.setItem('todos', JSON.stringify(this.todos));
				},
				deep: true
			}
		},
		mounted: function(){
			this.todos = JSON.parse(localStorage.getItem('todos')) || [];
		},
		methods: {
			addItem: function(e){
				console.log(this)
				e.preventDefault();
				var item = {
					title: this.newItem,
					isDone: false,
				}
				this.todos.push(item);
				this.newItem = '';
			},
			deleteItem: function(index){
				if(confirm('本当に削除しますか')){
					this.todos.splice(index, 1);
				}
			},
			purge: function(){
				if(!confirm('本当に削除しますか？')){
					return;
				}
				this.todos = this.remaining;
			},
			incrementTotal: function(){
				this.total++;
			},
			countUp: function(cnt, duration){
				var time = new Date() -0;
				var timer = setInterval( () => {
					var current = (new Date - 0) - time;
					
					this.count = Math.ceil(cnt * (current / duration));
					if(this.count >= cnt){
						clearInterval(timer)
					}
				}, 10);
				this.countUp;
			},

		},
		computed: {
			remaining: function(){
				return this.todos.filter(function(todo){
					return !todo.isDone;
				});
			}
		}
	});
})();