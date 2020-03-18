import userChannels from '../components/channelList.js'
import friendlist from '../components/friendlist.js'

export default{
    components:{
       userChannels,
       friendlist
    },

    template:`
    <div>
      <userChannels />
      <friendlist />
    </div>
    `,

    methods:{
      async loadUsers(){
        //Loads all users before home view is created
          let users = await fetch('/rest/users')
          users = await users.json()
          this.$store.commit('displayUsers', users)
          console.log(users)
      },

      async loadMessages(){
        //Loads all messages before home view is created
          let messages = await fetch('/rest/messages')
          messages = await messages.json()
          this.$store.commit('displayMessages', messages)
          console.log(messages)
      },

      async loadChannels(){
        //Loads only those channels, where current user is present, before home view is created
          let url = 'rest/users/channels/id/' +  this.$store.state.currentUser.id
          let channels = await fetch(url)
          channels = await channels.json()
          this.$store.commit('displayUserChannels', channels)
          console.log(channels)
      }
    },

     created(){
       /*All methods prints data to console. This is just to see if it works. */
      console.log('created')
        this.loadUsers()
        this.loadMessages()
        this.loadChannels()
    }
}