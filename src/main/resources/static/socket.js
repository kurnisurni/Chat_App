import { store } from './store.js'

    // change PORT to your backends PORT
    const ws = new WebSocket('ws://localhost:5000/your-socket-route')
    export default ws

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data)

      switch(data.action) {
        case 'goOnline':
          store.commit('goOnline', data)
          break;
        case 'new-message':
          for (let i = 0; i < store.state.userChannels.length; i++) {
            if (store.state.userChannels[i].id === data.channel_id){
              store.commit('sendMessage', data)
              break;
            }
          }
          break;
      }
    }

    /**
     * onopen triggas när anslutningen
     * är genomförd
     */

    /*ws.onopen = (e) => {
        sendSomething();
        isConnected = true;
    };

    ws.onclose = (e) => {
        console.log("Closing websocket...");
    };

  console.log("Connecting...");*/


function disconnect() {
    if (ws != null) {
        ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
}

function sendSomething() {
  let socketExample = {
    message: 'Testing sockets',
    timestamp: Date.now()
  }

  let addressedMessage = {
    action: 'message',
    payload: socketExample
  }

    ws.send(JSON.stringify(socketExample));
}

function showSomething(message) {
    console.log(message);
}