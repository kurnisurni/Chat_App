
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
                <button v-if="details.friendshipTime && !myself" 
                        @click="removeFriend(details.id)">Remove Friend</button>

                <button v-if="!details.friendshipTime && !myself"
                @click="addFriend(details.id)">Add As a Friend</button>
          </div>
    `,
    //one user from messages.js, another - from onlineList.js
    // This because i don't wish to complicate if-else in created(), now its still readable :D 
     props : ['friend', 'user', 'user', 'myself']  
     ,                                 
     methods:{
      close() {
        this.$parent.close()
      },
      checkUserType(){
        if(this.friend){
          this.details = this.friend
        }else if(this.myself){
          this.details = this.myself
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
      async removeFriend(userId){
        let url = 'rest/friend-list/' + this.$store.state.currentUser.id + '/' + userId
        try{
          await fetch(url, {
            method: 'DELETE'
          })
        } catch(e){
          console.log(e)
        }
      },
      async addFriend(userId){
            let friendToAdd = {
            user1: this.$store.state.currentUser.id,
            user2: userId,
            time: Date.now()
            }

        let url = 'rest/friend-list'
                try{
                  await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(friendToAdd)
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
       this.checkUserType()
     },
     updated(){
       this.checkUserType()
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