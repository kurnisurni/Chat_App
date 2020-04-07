import Vue from './libs/vue.esm.browser.js'
import Vuex from './libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: [],
    userChannels: [],
    channels: [],
    privateChats: [],
    friendShips: [],
    messages: [],
    privateMessages: [],
    serverMessages: [],
    offlineMessages: [],
    newPrivateMessages: [],
    readMessages: [],
    readPrivateMessages: [],
    onlineUsers: [],
    currentUser: {},
    currentChannel: {},
    userAndToken: {},
    allUserChannels: [],
    userInModal: {},
    showModal: false,
    adminWindowOpen: false
  },
  mutations: {
    saveAccessToken(state, userAndToken){
      state.userAndToken = userAndToken
      localStorage.setItem('accessToken', JSON.stringify(userAndToken))
    },
      
    displayUsers(state, users){
        state.users = users;
        localStorage.setItem('allUsers', JSON.stringify(users))
    },

    loadOnlineUsers(state, users){
      state.onlineUsers = users
      localStorage.setItem('onlineUsers', JSON.stringify(users))
    },

    displayChannels(state, channels){
      state.channels = channels;
      localStorage.setItem('allChannels', JSON.stringify(channels))
    },

    displayFriendship(state, friendShips){
      localStorage.setItem('allFriendShips', JSON.stringify(friendShips))
      for (let friendShip of friendShips){
        friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
      }
      state.friendShips = friendShips;        
    },

    loginUser(state, user){
      state.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },

    goOnline(state, user){
      state.onlineUsers.push(user)
      localStorage.setItem('onlineUsers', JSON.stringify(state.onlineUsers))
      for (let use of state.users){
        if (use.id === user.id){
          use.online = true
        }
      }
      localStorage.setItem('allUsers', JSON.stringify(state.users))
    },

    goOffline(state, index){
      state.onlineUsers.splice(index, 1)
      localStorage.setItem('onlineUsers', JSON.stringify(state.onlineUsers))
    },

    displayMessages(state, messages){
      state.messages = messages
      localStorage.setItem('allMessages', JSON.stringify(messages))
    },

    loadPrivateMessages(state, messages){
      state.privateMessages = messages
      localStorage.setItem('privateMessages', JSON.stringify(messages))
    },

    loadAllServerMessages(state, messages){
      state.serverMessages = messages
      localStorage.setItem('allServerMessages', JSON.stringify(messages))
    },

    loadOfflineMessages(state, messages){
      state.offlineMessages = messages
      localStorage.setItem('offlineMessages', JSON.stringify(messages))
    },

    loadNewPrivateMessages(state, messages){
      state.newPrivateMessages = messages
      localStorage.setItem('newPrivateMessages', JSON.stringify(state.newPrivateMessages))
    },

    loadReadMessages(state, messages){
      state.readMessages = messages
      localStorage.setItem('readMessages', JSON.stringify(state.readMessages))
    },

    loadReadPrivateMessages(state, messages){
      state.readPrivateMessages = messages
      localStorage.setItem('readPrivateMessages', JSON.stringify(state.readPrivateMessages))
    },

    removeOfflineMessages(state, channelId){
      let readMessages = state.offlineMessages.filter(message => message.channel_id === channelId)
      readMessages.forEach(msg => state.readMessages.push(msg))
      localStorage.setItem('readMessages', JSON.stringify(state.readMessages))

      let offMsgs = state.offlineMessages.filter(message => message.channel_id != channelId)
      state.offlineMessages = offMsgs
      localStorage.setItem('offlineMessages', JSON.stringify(state.offlineMessages))
    },

    removeNewPrivateMessages(state, chatId){
      let newlyReadMessages = state.newPrivateMessages.filter(message => message.private_chat_id === chatId)
      newlyReadMessages.forEach(msg => state.readPrivateMessages.push(msg))
      localStorage.setItem('readPrivateMessages', JSON.stringify(state.readPrivateMessages))

      let offMsgs = state.newPrivateMessages.filter(message => message.private_chat_id != chatId)
      state.newPrivateMessages = offMsgs
      localStorage.setItem('newPrivateMessages', JSON.stringify(state.newPrivateMessages))
    },

    addServerMessage(state, message){
      state.serverMessages.push(message)
      localStorage.setItem('allServerMessages', JSON.stringify(state.serverMessages))
    },

    displayUserChannels(state, userChannels){
      state.userChannels = userChannels
      localStorage.setItem('userChannels', JSON.stringify(userChannels))
    },

    loadPrivateChats(state, chats){
      state.privateChats = chats
      localStorage.setItem('privateChats', JSON.stringify(state.privateChats))
    },

    sendMessage(state, message){
      state.messages.push(message)
      localStorage.setItem('allMessages', JSON.stringify(state.messages))
      
      if (message.user_id !== state.currentUser.id){
        state.offlineMessages.push(message)
        localStorage.setItem('offlineMessages', JSON.stringify(state.offlineMessages))
      }
    },

    sendPrivateMessage(state, message){

      for (let chat of state.privateChats){
        if (chat.id === message.private_chat_id){
          state.privateMessages.push(message)
          localStorage.setItem('privateMessages', JSON.stringify(state.privateMessages))
          if (message.user_id !== state.currentUser.id && message.private_chat_id !== state.currentChannel.id){
            state.newPrivateMessages.push(message)
            localStorage.setItem('newPrivateMessages', JSON.stringify(state.newPrivateMessages))
          }
        }
      }
      
    },

    appendChannel(state, channel){
      state.channels.push(channel)
      localStorage.setItem('allChannels', JSON.stringify(state.channels))
    },

    deleteChannel(state, channelId){
      
      let allChnls = state.channels.filter(ch => ch.id !== channelId)
      let newUserChannels = state.userChannels.filter(usch => usch.id !== channelId)
      let allUsCh = state.allUserChannels.filter(uch => uch.channel_id !== channelId)
      let allMsg = state.messages.filter(msg => msg.channel_id !== channelId)

      state.messages = allMsg
      state.channels = allChnls
      state.userChannels = newUserChannels
      state.allUserChannels = allUsCh

      localStorage.setItem('allChannels', JSON.stringify(state.channels))
      localStorage.setItem('currentChannel', JSON.stringify(state.channels[0]))
      localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
      localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
      
      state.currentChannel = state.userChannels[0]
    },

    setUserInModal(state, user){
      state.userInModal = user
      if (user.username) {
        state.showModal = true
      } else state.showModal = false

      localStorage.setItem('userInModal', JSON.stringify(state.userInModal))
    },

    deleteFriend(state, index){
      console.log(state.friendShips)
      state.friendShips.splice(index, 1)
      console.log(state.friendShips)
      localStorage.setItem('allFriendShips', JSON.stringify(state.friendShips))
    },

    addFriend(state, friendShip){
      localStorage.setItem('allFriendShips', JSON.stringify(state.friendShips))
      friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
      state.friendShips.push(friendShip)
      state.userInModal = friendShip
    },

    addPrivateChat(state, chat){
      state.privateChats.push(chat)
      localStorage.setItem('privateChats', JSON.stringify(state.privateChats))
    },

    setCurrentChannel(state, channel){
      state.currentChannel = channel
      localStorage.setItem('currentChannel', JSON.stringify(channel))
      state.adminWindowOpen = false
    },

    setAdminWindow(state, isItOpen){
      state.adminWindowOpen = isItOpen
    },

    appendUser(state, user){
      state.users.push(user)
      localStorage.setItem('allUsers', JSON.stringify(state.users))
    },
      
    deleteMessage(state, index){
      state.messages.splice(index, 1)
      localStorage.setItem('allMessages', JSON.stringify(state.messages))
    },

    allUserChannels(state, channels){
      state.allUserChannels = channels
      localStorage.setItem('allUserChannels', JSON.stringify(channels))
    },

    deleteUserChannel(state, userChannel){
      for (let i = 0; i < state.allUserChannels.length; i++){
        if (state.allUserChannels[i].channel_id === userChannel.channel_id && state.allUserChannels[i].user_id === userChannel.user_id){
          state.allUserChannels.splice(i, 1)
          localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
        }
      }

      for (let i = 0; i < state.userChannels.length; i++){
        if (state.userChannels[i].id === userChannel.channel_id && userChannel.user_id === state.currentUser.id){
          state.userChannels.splice(i, 1)
          localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
        }
      }

      state.currentChannel = state.userChannels[0]
      localStorage.setItem('currentChannel', JSON.stringify(state.currentChannel))

    },

    addToAllChannels(state, userChannel) {
      state.allUserChannels.push(userChannel)
      localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
    },

    updatePicture(state, user){
      for(let u of state.users){
        if(u.id === user.id){
          u.picture_url = user.picture_url
          if(u.id === state.currentUser.id){
            state.currentUser = u
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
          }
        }
      }
    },

    changeChannelName(state, channel){
      for (let chan of state.channels){
        if (chan.id === channel.id){
          console.log('true')
          chan.name = channel.name
          console.log(chan)
          console.log(channel)
        }
      }

      for (let chan of state.userChannels){
        if (chan.id === channel.id){
          console.log('true')
          chan.name = channel.name
          console.log(chan)
          console.log(channel)
        }
      }

      localStorage.setItem('allChannels', JSON.stringify(state.channels))
      localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
      localStorage.setItem('currentChannel', JSON.stringify(channel))

      state.currentChannel = channel
      state.channels = JSON.parse(localStorage.getItem('allChannels'))
      state.userChannels = JSON.parse(localStorage.getItem('userChannels'))
    }
  }
})