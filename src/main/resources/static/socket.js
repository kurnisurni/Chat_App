import { store } from './store.js'

const ws = new WebSocket('ws://localhost:5000/your-socket-route')

ws.onmessage = (e) => {
  let data = JSON.parse(e.data)

  switch(data.action) {

    case 'new-private-message':
      store.commit('sendPrivateMessage', data)
      break

    case 'new-private-chat':
      if(data.user1 === store.state.currentUser.id || data.user2 === store.state.currentUser.id){
        store.commit('addPrivateChat', data)
      }
      break

    case 'delete-channel':
      store.commit('deleteChannel', data.index)
      break

    case 'change-channel-name':
      store.commit('changeChannelName', data)
      break

    case 'delete-userchannel':
      store.commit('deleteUserChannel', data)
      break

    case 'new-server-message':
      store.commit('addServerMessage', data)
      break

    case 'new-friendship':
      console.log(data)
      let userAndcurrentUser
      if (data.user1 === store.state.currentUser.id){
        getFriend(data.user2, data.time).then( user => {
          userAndcurrentUser = {
            friendShip: user,
            userWhoAdded: data.user1
          }
          store.commit('addFriend', userAndcurrentUser)
        })
      } else if (data.user2 === store.state.currentUser.id){
        getFriend(data.user1, data.time).then( user => {
          userAndcurrentUser = {
            friendShip: user,
            userWhoAdded: data.user2
          }
          store.commit('addFriend', userAndcurrentUser)
        })
      }
      break

    case 'new-user':
      store.commit('appendUser', data)
      break

    case 'goOnline':
      store.commit('goOnline', data)
      //store.commit('setCurrentChannel', 1)
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
      let friendList = store.state.friendShips
      let userIdForModal

      if (store.state.currentUser.id === data.user1id){
        for (let i = 0; i < friendList.length; i++){
          if (friendList[i].id === data.user2id){
            console.log(friendList[i])
            store.commit('deleteFriend', i)
            userIdForModal = data.user2id
          }
        }
      } else if (store.state.currentUser.id === data.user2id){
        for (let i = 0; i < friendList.length; i++){
          if (friendList[i].id === data.user1id){
            console.log(friendList[i])
            store.commit('deleteFriend', i)
            userIdForModal = data.user1id
          }
        }
      }

      for (let user of store.state.users){
        if (user.id === userIdForModal){
          store.commit('setUserInModal', user)
        }
      }

      if (store.state.currentChannel.user1 === userIdForModal ||
          store.state.currentChannel.user2 === userIdForModal){
          store.commit('setCurrentChannel', store.state.userChannels[0])
      }

      break

    case 'delete-message':
      store.commit('deleteMessage', data.index)
      break

    case 'update picture':
      for(let user of store.state.users){
        if(user.id === data.id){
          store.commit('updatePicture', data)
          break
        }
      }
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