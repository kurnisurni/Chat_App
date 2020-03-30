
export default {
    template: `
      <div>
          <div class="modal"> 
                  <div class="close-x">
                    <button @click="close">Close</button>
                  </div>
                <h2>{{ details.username }}</h2>
                <img :src="details.picture_url" alt="User Image" width="80" height="80">
                <p v-if="details.friendshipTime">Friend Since: {{ details.friendshipTime }}</p>
          </div>
     </div>
    `,
    //one user from messages.js, another - from onlineList.js
    // This because i don't wish to complicate if-else in created(), now its still readable :D 
     props : ['friend', 'user', 'user']  
     ,                                 
     methods:{
      close() {
        console.log(this.$parent)
        this.$parent.close();
      },
     },
     data(){
       return{
        details: null
       }
     },
     created(){
      if(this.friend){
        this.details = this.friend
      }
      else{
        for(let friend of this.friendList){
          if(this.user.id === friend.id){
            this.details = friend
          }
        }
      }
      if(!this.details){
        this.details = this.user
      }   
     },
    
     computed:{
       friendList(){
         return this.$store.state.friendShips
       },
       currentUser(){
         return this.$store.state.currentUser
       }
     }
  }