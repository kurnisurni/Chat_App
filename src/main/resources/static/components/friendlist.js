import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
  <div class="friendDiv">
    <h3>Friends</h3>
    <div class="friendList">
      
        <div class="friendAndMsgIcon" v-for="friend in friendList" 
          :key="friend.id"
          >
          <h4 class="friend" @click="goToFriendDetails(friend)">{{ friend.username }}</h4>
          <h4 class="pmIcon" @click="goToPrivateConversation(friend.id)">💬</h4>
          <h4 class="missedMessages" 
          v-if="checkNewMessages(friend.id)">
          {{ howMany(friend.id) }}
          </h4>
        </div>
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails />
          </div>
        </div>
      
    </div>
  </div>
    
  `,
  data(){
    return {
      newMessages: false,
      checkedChannels: []
    }
  },
  methods:{
    checkNewMessages(friendId){

      let privateChat = this.getChat(friendId)
 
      for(let msg of this.newPrivateMessages){
        if(msg.private_chat_id === privateChat.id){
          return this.newMessages = true
        }
      }
      return this.newMessages = false
    },

    getChat(friendId){

      for (let chat of this.privateChats){
        if (chat.user1 === friendId || chat.user2 === friendId){
          return chat
        }
      }
    },

    howMany(friendId){

      let privateChat = this.getChat(friendId)
      let amount = 0
      for (let msg of this.newPrivateMessages){
        if (msg.private_chat_id === privateChat.id){
          amount++
        }
      }
      
      return amount
    },

    checkChannels(friendId){

      let privateChat = this.getChat(friendId)
      if(this.checkedChannels.includes(privateChat.id)){
        return false
      }else{
        return true
      }
    },

    goToPrivateConversation(friendId){
      let privateChat = this.getChat(friendId)

      this.$store.commit('setCurrentChannel', privateChat)
      console.log(this.$store.state.currentChannel)
      
      this.checkedChannels.push(privateChat.id)
      this.$store.commit('removeNewPrivateMessages', this.$store.state.currentChannel.id)
    },

    goToFriendDetails(friend){
      this.$store.commit('setUserInModal', friend)
    },
    close() {
      this.$store.commit('setUserInModal', {})
    }
  },

  computed:{
    friendList(){
      return this.$store.state.friendShips
    },
    privateChats(){
      return this.$store.state.privateChats
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    users(){
      return this.$store.state.users
    },
    showModal(){
      return this.$store.state.showModal
    },
    newPrivateMessages(){
      return this.$store.state.newPrivateMessages
    },
    readPrivateMessages(){
      return this.$store.state.readPrivateMessages
    }
  },
  mounted(){
    this.checkNewMessages()
  }
}