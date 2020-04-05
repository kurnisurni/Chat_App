import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
  <div class="friendDiv">
    <h3>Friends:</h3>
    <div class="friendList">
      
        <div class="friendAndMsgIcon" v-for="friend in friendList" 
          :key="friend.id"
          >
          <h4 class="friend" @click="goToFriendDetails(friend)">{{ friend.username }}</h4>
          <h4 class="pmIcon" @click="goToPrivateConversation(friend.id)">💬</h4>
        </div>
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails :friend="activeFriend"/>
          </div>
        </div>
      
    </div>
  </div>
    
  `,

  data(){
    return{
      showModal: false,
      activeFriend: null
    }
  },
  methods:{
    goToPrivateConversation(friendId){
      let privateChat

      for (let chat of this.privateChats){
        if (chat.user1 === friendId || chat.user2 === friendId){
          privateChat = chat
          break
        }
      }

      this.$store.commit('setCurrentChannel', privateChat)
      console.log(this.$store.state.currentChannel)
    },

    goToFriendDetails(friend){
     this.activeFriend = friend
     console.log('-----Active friend----')
     console.log(this.activeFriend)
      this.showModal = true
    },
    close() {
      this.showModal = false;
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
    }
  }
}