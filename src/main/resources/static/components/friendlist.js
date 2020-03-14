
export default{
  template:`
    <div>
    <h3>Friends</h3>
      <ul>
        <li v-for="friend in friendList" :key="friend.id">
          {{ friend.username }}
        </li>
      </ul>
    </div>
  `,

  props: []
  ,

  data(){
    return{

    }
  },

  methods: {
    async getFriends(userId){
      let url = '/rest/friendlist/' + userId

      let friendIds = await fetch(url)
      friendIds = await friendIds.json()

      let friends = []

      for (let i = 0; i < friendIds.length; i++){
        let user = friendIds[i]
        let url2 = '/rest/users/' + user.id
        let friend = await fetch(url2)
        friend = await friend.json()
        friends.push(friend)
      }
      
      this.$store.commit('displayFriends', friends)
    }
  },

  computed: {
    friendList(){
      return this.$store.state.friendList
    }
  },
  created(){
    this.getFriends(1)
  }
}