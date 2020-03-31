import Vue from './libs/vue.esm.browser.js'
import Vuex from './libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       users: [],
       userChannels: [],
       channels: [],
       friendShips: [],
       messages: [],
       serverMessages: [],
       onlineUsers: [],
       currentUser: {},
       currentChannel: {},
       userAndToken: {},
       allUserChannels: []
    },
    mutations: {
      saveAccessToken(state, userAndToken){
        localStorage.setItem('accessToken', JSON.stringify(userAndToken))
        state.userAndToken = userAndToken
        console.log(state.userAndToken)
      },
      
      displayUsers(state, users){
        state.users = users;
      },

      loadOnlineUsers(state, users){
        state.onlineUsers = users
      },

      displayChannels(state, channels){
        state.channels = channels;
      },

      displayFriendship(state, friendShips){
        for (let friendShip of friendShips){
          friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
        }
        state.friendShips = friendShips;
        console.log(friendShips)
        
      },
      loginUser(state, user){
        state.currentUser = user
      },

      goOnline(state, user){
        state.onlineUsers.push(user)
        for (let use of store.state.users){
          if (use.id === user.id){
            use.online = true
          }
        }
        console.log(state.onlineUsers)
      },

      goOffline(state, index){
        state.onlineUsers.splice(index, 1)
      },

      displayMessages(state, messages){
        /*for (let i = 0; i < messages.length; i++){
          messages[i].message_time = new Date(messages[i].message_time).toLocaleString()
        }*/
        state.messages = messages
      },

      loadAllServerMessages(state, messages){
        /*for (let msg of messages){
          msg.time = new Date(msg.time).toLocaleString()
        }*/
        state.serverMessages = messages
      },

      addServerMessage(state, message){
        //message.time = new Date(message.time).toLocaleString()
        state.serverMessages.push(message)
        console.log(state.serverMessages)
      },

      displayUserChannels(state, userChannels){
        state.userChannels = userChannels
      },

      sendMessage(state, message){
        console.log(message)
        //message.message_time = new Date(message.message_time).toLocaleString()
        state.messages.push(message)
        console.log(state.messages)
      },

      appendChannel(state, channel){
        state.channels.push(channel)
      },

      deleteFriend(state, index){
        state.friendShips.splice(index, 1)
      },

      addFriend(state, friendShip){
      console.log(friendShip)
      friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
      state.friendShips.push(friendShip)
      console.log(state.friendShips)
      },

      setCurrentChannel(state, channel){
        state.currentChannel = channel
        console.log(state.currentChannel)
      },

       appendUser(state, user){
       state.users.push(user)
      },
      
      deleteMessage(state, index){
        state.messages.splice(index, 1)
      },

      allUserChannels(state, channels){
        state.allUserChannels = channels
      },

      deleteUserChannel(state, userChannel){
        for (let i = 0; i < state.allUserChannels.length; i++){
          if (state.allUserChannels[i].channel_id === userChannel.channel_id && state.allUserChannels[i].user_id === userChannel.user_id){
            state.allUserChannels.splice(i, 1)
          }
        }

        console.log(state.userChannels)
        for (let i = 0; i < state.userChannels.length; i++){
          if (state.userChannels[i].id === userChannel.channel_id && userChannel.user_id === state.currentUser.id){
            state.userChannels.splice(i, 1)
          }
        }

        console.log(state.userChannels)
      },

      addToAllChannels(state, userChannel) {
        state.allUserChannels.push(userChannel)
      }
      
    }
})