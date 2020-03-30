import { store } from './store.js'

    // change PORT to your backends PORT
    const ws = new WebSocket('ws://localhost:5000/your-socket-route')
    export default ws

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data)

      switch(data.action) {
        case 'new-friendship':
          console.log(data)
          if (data.user1 === store.state.currentUser.id){
            getFriend(data.user2, data.time).then( user => {
              store.commit('addFriend', user)
            })
          } else if (data.user2 === store.state.currentUser.id){
            getFriend(data.user1, data.time).then( user => {
              store.commit('addFriend', user)
            })
          }
          break
        case 'new-user':
          store.commit('appendUser', data)
          break
        case 'goOnline':
          store.commit('goOnline', data)
          store.commit('setCurrentChannel', 1)
          break
        case 'goOffline':
          for (let i = 0; i < store.state.onlineUsers.length; i++){
            if (store.state.onlineUsers[i].id === data.id) {
              store.commit('goOffline', i)
            }
          }
          break
        case 'new-message':
          for (let i = 0; i < store.state.userChannels.length; i++) {
            if (store.state.userChannels[i].id === data.channel_id){
              store.commit('sendMessage', data)
              break
            }
          }
          break
        case 'new-channel':
          store.commit('appendChannel', data)
          break
        case 'delete-friend':
          let friendList = store.state.friendList

          console.log(data)

          if (store.state.currentUser.id === data.user1id){
            for (let i = 0; i < friendList.length; i++){
              if (friendList[i].user === data.user2id){
                store.commit('deleteFriend', i)
              }
            }
          } else if (store.state.currentUser.id === data.user2id){
            for (let i = 0; i < friendList.length; i++){
              if (friendList[i].user === data.user1id){
                store.commit('deleteFriend', i)
              }
            }
          }
          break
        case 'delete-message':
          store.commit('deleteMessage', data.index)
          break
      }
    }

    async function getFriend(friendId, friendshiptime){
      let newFriend = await fetch('/rest/users/' + friendId)
      newFriend = await newFriend.json()

      newFriend["friendshipTime"] = friendshiptime

      return newFriend
    }

export function disconnect() {
    if (ws != null) {
        ws.close();
    }
    //isConnected = false;
    console.log("Disconnected");
}