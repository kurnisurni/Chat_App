import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
    <div>
      <h3>Friends:</h3>
        <ul>
          <li v-for="friend in friendList" 
              :key="friend.id"
              @click="goToFriendDetails(friend.id)">
            <h4>User: {{ friend.username }}</h4>            
            <modal v-if="showModal" class="modal-route">
              <div class="modal-content">
                <userDetails />
              </div>
            </modal>
          
          </li>
        </ul>
    </div>
  `,

  data(){
    return{
      showModal: false
    }
  },
  methods:{
    goToFriendDetails(id){
      console.log(id)
      this.$router.push('/users/' + id)
      this.showModal = true
    },
  },

  computed:{
    friendList(){
      return this.$store.state.friendShips
    },
  }
}