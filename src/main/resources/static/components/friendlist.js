export default{
  template:`
    <div class="friendList">
      <h3>Friends:</h3>
        <ul>
          <li v-for="friend in friendList" :key="friend.id">
            <h4>User: {{ friend.username }} <br> Friend since: {{friend.time}}</h4>
          </li>
        </ul>
    </div>
  `,
  computed: {
    friendList(){
      return this.$store.state.friendList
    }
  }
}

