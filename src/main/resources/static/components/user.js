import userDetails from './userDetails.js'

export default{
  components:{
    userDetails,
  },
  template: `
    <div class="userComp">
      <div class="userDiv">
        <img class="userUserPic" :src="user.picture_url" alt="User Image" @click="goToUserDetails(user)">
        <h3 class="userName" @click="goToUserDetails(user)">{{user.username}}</h3>
        <!-- Need to move width and height till css later -->
        
      </div>

      <div v-if="showModal" class="modal-route">
        <div class="modal-content"> 
          <userDetails/>
        </div>
      </div>
    </div>
  `,
  computed: {
    user(){
      return this.$store.state.currentUser
    },
    offlineMessages(){
      return this.$store.state.offlineMessages
    },
    showModal(){
      return this.$store.state.showModal
    }
  },
  methods:{
    goToUserDetails(user){
      this.$store.commit('setUserInModal', user)
    },
    close() {
      this.$store.commit('setUserInModal', {})
    },
  }
}