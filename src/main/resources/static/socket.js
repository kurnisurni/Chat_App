import { store } from './store.js'

    // change PORT to your backends PORT
    const ws = new WebSocket('ws://localhost:5000/your-socket-route')
    export default ws

    ws.onmessage = (e) => {
      showSomething(e.data);
      let data = JSON.parse(e.data)

      if(data.timestamp) {
        console.log(new Date(data.timestamp).toLocaleString())
      }

      switch(data.action) {
        case 'message':
          console.log(data)
          break;
        case 'new-message':
          store.commit('sendMessage', data)
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