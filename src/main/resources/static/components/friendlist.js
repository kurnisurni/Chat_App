export default{
  template:`
    <div class="friendList">
      <h3>Friends:</h3>
        <ul>
          <li v-for="(friend,i) in friendList" :key="friend.id">
            <h4>User: {{ friend.username }} <button @click="clickedMinus(friend, i)">➖</button> <br> Friend since: {{friend.time}}</h4>
          </li>
        </ul>
    </div>
  `,
  computed: {
    friendList(){
      return this.$store.state.friendList
    }
  },
  methods:{
    async clickedMinus(user2, index){

      console.log(user2)

      let url = 'rest/friend-list/' + this.$store.state.currentUser.id + '/' + user2.user

      try{
        await fetch(url, {
          method: 'DELETE'
        })
      } catch(e){
        console.log(e)
      }
    }
  }
}

