import user from '../components/user.js'
import userChannels from '../components/channelList.js'
import friendlist from '../components/friendList.js'
import messages from '../components/messages.js'
import messageInput from '../components/messageInput.js'
import createChannel from '../components/createChannel.js'


export default{
    components:{
       user,
       userChannels,
       friendlist,
       messages,
       messageInput,
       createChannel
    },

    template:`
    <div>
      <user />
      <friendlist />
      <messages />
      <messageInput />
      <createChannel />

    </div>
    `,

    methods:{
      async loadUsers(){
        //Loads all users before home view is created
          let users = await fetch('/rest/users')
          users = await users.json()
          this.$store.commit('displayUsers', users)
          console.log('Users:')
          console.log(users)
      },

      async loadMessages(){
        //Loads all messages before home view is created
          let messages = await fetch('/rest/messages')
          messages = await messages.json()
          this.$store.commit('displayMessages', messages)
          console.log('Messages:')
          console.log(messages)
      },

      async loadChannels(){
        //Loads only those channels, where current user is present, before home view is created
          let url = 'rest/users/channels/id/' +  this.$store.state.currentUser.id
          let channels = await fetch(url)
          channels = await channels.json()
          this.$store.commit('displayUserChannels', channels)
          console.log('Channels:')
          console.log(channels)
      },

      async loadFriendList(){
         //Loads user friends, before home view is created
          let url = '/rest/friend-list/' + this.$store.state.currentUser.id
          let friends = await fetch(url)
          friends = await friends.json()
          let users = []
          try{
            for (let i = 0; i < friends.length; i++){
              let user = friends[i]
              let url = '/rest/users/' + user.user
              let friend = await fetch(url)
              friend = await friend.json()
              users.push(friend)
            }
          }catch(e){
            console.log(e)
          }
           this.$store.commit('displayFriendship', users)
           console.log('Friends:')
           console.log(users)
            
            
      }
    },

     created(){
       /*All methods prints data to console. This is just to see if it works. */
      console.log('created')
        this.loadUsers()
        this.loadMessages()
        this.loadChannels()
        this.loadFriendList()
    }
}