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
    /*All prints in created are in console. This is just to see if it works. */
    async created(){
      console.log('created')
      
      let users = await fetch('/rest/users')
      users = await users.json()
      this.$store.commit('displayUsers', users)
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