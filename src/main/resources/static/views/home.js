import userChannels from '../components/userChannels.js'
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
    async created(){
      
      let users = await fetch('/rest/users')
      users = await users.json()
      this.$store.commit('displayUsers', users)
      console.log('created')
      console.log(users)
      
      let messages = await fetch('/rest/messages')
      messages = await messages.json()
      this.$store.commit('displayMessages', messages)
      console.log(messages)

      let url = 'rest/users/channels/id/' +  this.$store.state.currentUser.id
      let channels = await fetch(url)
      channels = await channels.json()
      this.$store.commit('displayUserChannels', channels)
      console.log(channels)
      
    }
}