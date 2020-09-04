
(function() {
  'use strict';

  var vm = new Vue ({
    el: '#app',
    data: {
      newItem: '',
      errerMessage: '',
      todos: [],
      endTask: [],

    },

    watch: {
      todos: {
        handler() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      },

      endTask: {
        handler() {
          localStorage.setItem('endTask', JSON.stringify(this.endTask));
        },
        
      },
    
    },

    mounted() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
      this.endTask = JSON.parse(localStorage.getItem('endTask')) || [];
    },

    methods: {
      addItem() {
        if (this.newItem.length !== 0){
          var item = {
            title: this.newItem,
            isDone: false
          }
          this.todos.push(item);
          this.newItem = '';
        } else {
          this.errerMessage = 'taskを入力してください。'
        }
      },

      remaining(todo) {
        return todo.isDone = true;
      },

      finising(todo) { 
        return todo.isDone = false;
      },

      parge() {
        if (this.finish.length !== 0) {
          var d = new Date();
          var date = 
          d.getFullYear() + "/" + 
          (d.getMonth() +1 ) + "/" + 
          d.getDate();

          
          this.finish.forEach(f => {
            var fItem = f.title;
            var pastTask = {
              title: fItem,
              date: date
            }
            this.endTask.push(pastTask);
          });
          console.log(this.a);
        
          return this.todos = this.todos.filter(todo => !todo.isDone);
        };
        },

       
      },
    
  
      
      computed: {

        a() {
        const groupingMap = this.endTask.reduce(
                    (map, e) => map.set(e.date,  [ ...(map.get(e.date) || []), e] ), new Map())
                

                  return [...groupingMap].filter(([date, array]) => array.length > 1 )
      
          },

        
        
        

    
      remain() {
        return this.todos.filter(todo => !todo.isDone);
      },

      finish() {
        return this.todos.filter(todo => todo.isDone);
      },

    },
  
  });
})();
