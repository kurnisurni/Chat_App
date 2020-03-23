export default{
  template:`
    <div>
      <h3>Friends:</h3>
        <ul>
          <li v-for="(friend,i) in friendList" :key="friend.id">
            <h4>User: {{ friend.username }} <button @click="clickedMinus(i)">➖</button> <br> Friend since: {{friend.time}}</h4>
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
    clickedMinus(index){
        this.$store.commit('deleteFriend',index)
    }
  }
}

