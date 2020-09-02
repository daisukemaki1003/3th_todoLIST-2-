
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
        deep: true
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
              today: date
            }
            this.endTask.push(pastTask);
          });
            
          return this.todos = this.todos.filter(todo => !todo.isDone);
        };
        },

       
      },
    
  
      
      computed: {

        sepalate() {
          // return this.endTask.filter((x,y,z)=>z.slice(0,z.length).filter(w=>w.today==x.today).length>=2);
          
          const groupingMap = this.endTask.reduce(
            (map, e) => map.set(e.today,  [ ...(map.get(e.today) || []), e] ), new Map())
          
          const duplicatedElements = [...groupingMap].filter(([today, array]) => array.length > 1 )
          
          duplicatedElements.forEach(([today, array]) => {
            console.log(`${today}:`)
            array.forEach(e => {
              console.log(`  ${JSON.stringify(e)}`)
            })
          })
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
