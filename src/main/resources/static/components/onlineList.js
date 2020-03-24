import user from "./user"


export default {
    template: `
        <div class="onlineList">
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in users" 
                    :key="user.id">
                    <h4>User: {{ user.username }}</h4>          
                    </li>
                </ul>
            <h3>Offline:</h3>
        </div>
    `,

computed: {
    users(){
      return this.$store.state.users
    },
  },

/*
  let online = users.filter(user => {
    // returnera en boolean
    return user.???? === "Online"

})  let offline = users.filter(user => {
    // returnera en boolean
    return user.???? === "Offline"
})
*/
}