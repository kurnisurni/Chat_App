import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
    <div class="friendList">
      <h3>Friends:</h3>
          <div v-for="friend in friendList" 
              :key="friend.id"
              >
            <h4 class="friend" @click="goToFriendDetails(friend)">{{ friend.username }}</h4>          
          </div>
        <div v-if="showModal" class="modal-route">
          <div class="modal-content"> 
            <userDetails :friend="activeFriend"/>
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