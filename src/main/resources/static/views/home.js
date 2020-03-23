import userChannels from '../components/channelList.js'
import friendlist from '../components/friendList.js'
import messages from '../components/messages.js'
import messageInput from '../components/messageInput.js'
import createChannel from '../components/createChannel.js'


export default{
    components:{
       userChannels,
       friendlist,
       messages,
       messageInput,
       createChannel
    },

    template:`
    <div class="frontPage">
        <div class="leftBar">
          <friendlist />
          <createChannel />
        </div>
        <div class="messagesView">
          <messages />
          <messageInput />
        </div>
 

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

      async loadUserChannels(){
        //Loads only those channels, where current user is present, before home view is created
          let url = 'rest/users/channels/id/' +  this.$store.state.currentUser.id
          let userChannels = await fetch(url)
          userChannels = await userChannels.json()
          this.$store.commit('displayUserChannels', userChannels)
      },

      async loadChannels(){
        let channels = await fetch('/rest/channels')
        channels = await channels.json()
        this.$store.commit('displayChannels', channels)
      },

      async loadFriendList(){
         //Loads user friends, before home view is created

          let url = '/rest/friend-list/' + this.$store.state.currentUser.id
          let users = await fetch(url)
          users = await users.json()
          this.$store.commit('displayFriends', users)
          console.log(users)
    
      }
    },

     created(){
       /*All methods prints data to console. This is just to see if it works. */
      console.log('created')
        this.loadUsers()
        this.loadMessages()
        this.loadUserChannels()
        this.loadChannels()
        this.loadFriendList()
    }
}