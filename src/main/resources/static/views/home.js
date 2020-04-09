import user from '../components/user.js'
import userChannels from '../components/channelList.js'
import friendlist from '../components/friendlist.js'
import messages from '../components/messages.js'
import messageInput from '../components/messageInput.js'
import createChannel from '../components/createChannel.js'
import onlineList from '../components/onlineList.js'
import channelComponent from '../components/channelComponent.js'
import { store } from '../store.js'


export default{
    components:{
       user,
       userChannels,
       friendlist,
       messages,
       messageInput,
       createChannel,
       onlineList,
       channelComponent
    },

    template:`
    <div class="frontPage">
      <div class="leftBar">
        <user />
        <friendlist />
        <userChannels />
        <createChannel />
      </div>
      <div class="messagesView">
        <channelComponent />
      </div>
      <div class="rightBar">
        <onlineList v-if="currentChannel.name"/>
      </div>
    </div>
    `,

    computed: {
      currentChannel(){
        return this.$store.state.currentChannel
      }
    },

    methods:{
      loadAllFromLocalStorage(){
        this.$store.commit('displayUsers', JSON.parse(localStorage.getItem('allUsers')))
        this.$store.commit('loadOnlineUsers', JSON.parse(localStorage.getItem('onlineUsers')))
        this.$store.commit('displayChannels', JSON.parse(localStorage.getItem('allChannels')))
        //this.$store.commit('displayFriendship', JSON.parse(localStorage.getItem('allFriendShips')))
        this.$store.commit('displayMessages', JSON.parse(localStorage.getItem('allMessages')))
        this.$store.commit('loadAllServerMessages', JSON.parse(localStorage.getItem('allServerMessages')))
        this.$store.commit('loadOfflineMessages', JSON.parse(localStorage.getItem('offlineMessages')))
        this.$store.commit('loadPrivateMessages', JSON.parse(localStorage.getItem('privateMessages')))
        this.$store.commit('loadPrivateChats', JSON.parse(localStorage.getItem('privateChats')))
        this.$store.commit('setUserInModal', JSON.parse(localStorage.getItem('userInModal')))
       
        if (JSON.parse(localStorage.getItem('userChannels')).length > 0){
          this.$store.commit('displayUserChannels', JSON.parse(localStorage.getItem('userChannels')))
          this.$store.commit('setCurrentChannel', JSON.parse(localStorage.getItem('currentChannel')))
        }
        
        this.$store.commit('allUserChannels', JSON.parse(localStorage.getItem('allUserChannels')))
      },
      async loadUsers(){
        let users = await fetch('/rest/users')
        users = await users.json()
        this.$store.commit('displayUsers', users)
        console.log('Users:')
        console.log(users)


        let onlineUsers = users.filter(user => user.online)
        console.log(onlineUsers)
          
        this.$store.commit('loadOnlineUsers', onlineUsers)
      },

      async loadMessages(){

        if (!JSON.parse(localStorage.getItem('readMessages'))[0]){
          localStorage.setItem('readMessages', JSON.stringify([]))
        }

        //Loads all messages before home view is created
        let messages = await fetch('/rest/messages')
        messages = await messages.json()
        this.$store.commit('displayMessages', messages)

        let userChannelIds = []

        for (let usrChnl of this.$store.state.userChannels){
          userChannelIds.push(usrChnl.id)
        }

        let offlineMessages = this.$store.state.messages.filter(
          message => message.user_id !== this.$store.state.currentUser.id && message.message_time > this.$store.state.currentUser.logoff_time &&
          userChannelIds.includes(message.channel_id))
        
          let newFromStorage = JSON.parse(localStorage.getItem('readMessages'))

          this.$store.commit('loadReadMessages', newFromStorage)
  
          let idsFromStorage = []
  
          newFromStorage.forEach(msg => idsFromStorage.push(msg.id))
  
          let newMessages = offlineMessages.filter( msg => !idsFromStorage.includes(msg.id))
        
        this.$store.commit('loadOfflineMessages', newMessages)
          
      },

      async loadPrivateMessages(){

        if (!JSON.parse(localStorage.getItem('readPrivateMessages'))[0]){
          localStorage.setItem('readPrivateMessages', JSON.stringify([]))
        }

        let messages = await fetch('/rest/privateMessages')
        messages = await messages.json()
        this.$store.commit('loadPrivateMessages', messages)
        console.log(this.$store.state.privateMessages)

        let privateChatIds = []

        for (let privateChat of this.$store.state.privateChats){
          privateChatIds.push(privateChat.id)
        }

        let offlineMessages = this.$store.state.privateMessages.filter(
          message => message.user_id !== this.$store.state.currentUser.id && message.message_time > this.$store.state.currentUser.logoff_time &&
          privateChatIds.includes(message.private_chat_id))

        let newFromStorage = JSON.parse(localStorage.getItem('readPrivateMessages'))

        this.$store.commit('loadReadPrivateMessages', newFromStorage)

        let idsFromStorage = []

        newFromStorage.forEach(msg => idsFromStorage.push(msg.id))

        let newMessages = offlineMessages.filter( msg => !idsFromStorage.includes(msg.id))

        this.$store.commit('loadNewPrivateMessages', newMessages)
      },

      async loadPrivateChats(){
        let chats = await fetch('/rest/privateChat/' + this.$store.state.currentUser.id)
        chats = await chats.json()
        this.$store.commit('loadPrivateChats', chats)

        console.log(this.$store.state.privateChats)
      },

      async loadUserChannels(){
        //Loads only those channels, where current user is present, before home view is created
          let url = '/rest/users/channels/id/' +  this.$store.state.currentUser.id
          let userChannels = await fetch(url)
          userChannels = await userChannels.json()
          this.$store.commit('displayUserChannels', userChannels)
      },

      async loadChannels(){
        let channels = await fetch('/rest/channels')
        channels = await channels.json()
        this.$store.commit('displayChannels', channels)
        this.$store.commit('setCurrentChannel', channels[0])
      },

      async loadServerMessages(){
        let messages = await fetch('/rest/serverMessages')
        messages = await messages.json()

        this.$store.commit('loadAllServerMessages', messages)
        console.log(this.$store.state.serverMessages)
      },

      async loadFriendList(){
         //Loads user friends, before home view is created
          let url = '/rest/friend-list/' + this.$store.state.currentUser.id
          let friends = await fetch(url)
          friends = await friends.json()
          let users = []
          try{
            for (let i = 0; i < friends.length; i++){
              let friendship = friends[i]
              let url = '/rest/users/' + friendship.user
              let friend = await fetch(url)
              friend = await friend.json()
              friend["friendshipTime"] = friendship.time
              console.log('-------------')
              users.push(friend)
              console.log(friend)
            }
          }catch(e){
            console.log(e)
          }
           this.$store.commit('displayFriendship', users)
           console.log('Friends:')
           console.log(users)      
      },

      async loadAllUserChannels() {
        let allChannels = await fetch('/rest/users/channels')
        allChannels = await allChannels.json()
        this.$store.commit('allUserChannels', allChannels)
        console.log(allChannels);
        
      }
    },
    created(){

    let timeOfLastClose = JSON.parse(localStorage.getItem('closeTime'))

    //if (timeOfLastClose < (Date.now() - 1000)){
      try{
        this.loadUsers()
        this.loadUserChannels()
        this.loadMessages()
        this.loadPrivateChats()
        this.loadPrivateMessages()
        this.loadChannels()
        this.loadFriendList()
        this.loadAllUserChannels()
        this.loadServerMessages()
        console.log('successfully loaded all')
      } catch (e) {
        console.log(e)
      } 
    //}
    this.loadAllFromLocalStorage() 
    
  }
}