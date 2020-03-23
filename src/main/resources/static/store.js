import Vue from './libs/vue.esm.browser.js'
import Vuex from './libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       users: [],
       userChannels: [],
       channels: [],
       friendList: [],
       messages: [],
       onlineUsers: [],
       currentUser: {},
       currentChannel: {}
    },
    mutations: {
      displayUsers(state, users){
        state.users = users;
      },
      displayChannels(state, channels){
        state.channels = channels;
      },
      displayFriends(state, friends){
        state.friendList = friends;
      },
      loginUser(state, user){
        state.currentUser = user
      },
      goOnline(state, user){
        state.onlineUsers.push(user)
      },
      displayMessages(state, messages){
        for (let i = 0; i < messages.length; i++){
          messages[i].message_time = new Date(messages[i].message_time).toLocaleString()
        }
        state.messages = messages
      },
      displayUserChannels(state, userChannels){
        state.userChannels = userChannels
      },
      addUserChannel(state, userChannel){
        
      },
      sendMessage(state, message){
        console.log(message)
        message.message_time = new Date(message.message_time).toLocaleString()
        state.messages.push(message)
        console.log(state.messages)
      },
      appendChannel(state, channel){
        state.channels.push(channel)
      },
      setCurrentChannel(state, channelId){
        state.currentChannel = channelId
        console.log(state.currentChannel)
      },

       appendUser(state, user){
       state.users.push(user)}
    }
})