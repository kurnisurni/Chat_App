
export default {
    template: `
          <div class="modal"> 
                  <div class="close-x">
                    <button @click="close">Close</button>
                  </div>
                <h2>{{ details.username }}</h2>
                <img :src="details.picture_url" 
                      alt="User Image" 
                      width="80" 
                      height="80"
                      >
                <p v-if="details.friendshipTime">Friend Since: {{ details.friendshipTime }}</p>
                <button v-if="details.friendshipTime" 
                        @click="removeFriend(details.id)">Remove Friend</button>

                <button v-if="!details.friendshipTime">Add As Friend</button>
          </div>
    `,
    //one user from messages.js, another - from onlineList.js
    // This because i don't wish to complicate if-else in created(), now its still readable :D 
     props : ['friend', 'user', 'user']  
     ,                                 
     methods:{
      close() {
        this.$parent.close()
      },
      async removeFriend(userId){
        let url = 'rest/friend-list/' + this.$store.state.currentUser.id + '/' + userId
        try{
          await fetch(url, {
            method: 'DELETE'
          })
        } catch(e){
          console.log(e)
        }
      }
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