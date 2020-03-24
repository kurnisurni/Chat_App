import user from "./user.js"


export default {
    components: {
    user
    },
    template: `
        <div class="onlineList">
            <h2>Users</h2>
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in online" 
                    :key="user.id">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>
                <h3>Offline:</h3>
                <ul>
                    <li v-for="user in offline" 
                    :key="user.id">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>          
        </div>
    `,

computed: {
    users(){
      return this.$store.state.users
    },
    online(){
        return this.users.filter(user => {
            // returnera en boolean
            return user.online === true
    }) },
    offline(){
        return this.users.filter(user => {
            // returnera en boolean
            return user.online === false
    })} 
  },

}