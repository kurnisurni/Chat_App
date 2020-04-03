import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
  <div class="friendDiv">
    <h3>Friends:</h3>
    <div class="friendList">
      <div class="friendsInFriendList">
        <div class="friendAndMsgIcon" v-for="friend in friendList" 
          :key="friend.id"
          >
          <h4 class="friend" @click="goToFriendDetails(friend)">{{ friend.username }}</h4>
          <h4 class="pmIcon" @click="startPrivateConversation(friend)">💬</h4>
        </div>
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails :friend="activeFriend"/>
          </div>
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
    startPrivateConversation(friend){
      
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
  }
}