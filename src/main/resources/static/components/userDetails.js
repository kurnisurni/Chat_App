export default {
    template: `
      <div>
        <h2>{{ user.username }}</h2>
        <img :src="user.picture" alt="User Image" width="50" height="50">
      </div>
    `,
    data() {
      return {
        user: {
          username: '',
          picture: ''
        }
      }
    },
    async created() { 
     console.log(this.$route.params.id);
  
      let user = await fetch('/rest/users/' + this.$route.params.id)    
      user = await user.json()
      console.log(user);

      this.user = user
    }
  }