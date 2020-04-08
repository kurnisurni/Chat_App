import { create_UUID } from '../utilities/uuid.js'
import {disconnect} from '../socket.js'

export default {
  template: `
    <div class="modal" v-bind:style="{ backgroundImage: 'url(' + userInModal.picture_url + ')', backgroundSize: 'cover' }">     
      <button class="closeModalButton" @click="close">Close</button>
      
      <h2 class="modalUsername">{{ userInModal.username }}</h2>
      <div class="picAddOrRemove">
        
        <p v-if="isFriend(userInModal)">Friend Since: {{ userInModal.friendshipTime }}</p>
        <button v-if="isFriend(userInModal) && userInModal.id != currentUser.id" 
                @click="removeFriend(userInModal)">Remove Friend</button>

        <button class="addFriendButton" v-if="!isFriend(userInModal) && userInModal.id != currentUser.id"
                @click="addFriend(userInModal)">Add Friend</button>
      </div>
      
      <form class="changePictureForm" v-if="userInModal.id === currentUser.id" @submit.prevent="updateUser(picture)">
        <div class="labelAndInput">
          <label class="imgInputLabel" for="img-input-field"> Change Profile Picture: </label>

          <input class="img-input-field" 
                 type="file" 
                 name="files" 
                 accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif" 
                 @change="filesChange($event.target.files)">
        </div>
        <button class="updatePictureButton">Submit</button>
      </form>

      <button class="logoutButton" v-if="userInModal.id === currentUser.id" @click="logOut">Log Out</button>
    </div>
  `,
                                  
  methods:{

    isFriend(user){
      for (let friend of this.friendList){
        if (friend.id === user.id){
          this.$store.commit('setUserInModal', friend)
          return true
        }
      }
      return false
    },

    close() {
      this.$parent.close()
    },

    async removeFriend(user){
      let url = '/rest/friend-list/' + this.$store.state.currentUser.id + '/' + user.id
      try{
        await fetch(url, {
          method: 'DELETE'
        })
      } catch(e){
        console.log(e)
      }

    },
    async addFriend(user){
      let friendToAdd = {
        user1: this.$store.state.currentUser.id,
        user2: user.id,
        time: Date.now()
      }

      let url = '/rest/friend-list'
      try{
        await fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(friendToAdd)
          })
      } catch(e){
        console.log(e)
      }

      const chatToAdd = {
        user1: this.currentUser.id,
        user2: user.id,
        createdtime: Date.now()
      }

      try {
        await fetch('/rest/privateChat', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(chatToAdd)
        })
      } catch(e) {
        console.log(e)
      }

    },
    async logOut(){
      const url = '/rest/users/logout'

      const userToLogout = {
        id: this.$store.state.currentUser.id,
        logoff_time: Date.now()
      }

      try{
        await fetch(url, {
        method:'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(userToLogout)
        })
      } catch(e){
        console.log(e)
      }

      localStorage.removeItem('accessToken')
      disconnect()
      this.$router.push('/login')
    },
    async updateUser(){
      try{
        
        if (this.imageFiles != null) {
          let didUpload = await fetch('/api/upload-files', {
            method: 'POST',
            body: this.imageFiles
          });
          
          didUpload = await didUpload.text()
          console.log(didUpload);
        }
        
        if(this.images != null){
          const userToUpdate = {
            id: this.$store.state.currentUser.id,
            picture_url: this.images[0]
          }
          await fetch('/rest/users', {
            method:'PUT',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(userToUpdate)
          })
        }
          
      }catch(e){
        console.log(e);
      }
    },
    async filesChange(fileList) {
      if (!fileList.length) return;
      const formData = new FormData();
      this.images = []

      Array.from(Array(fileList.length).keys())
        .map(x => {

          const uuid = create_UUID()
          let fileExt = fileList[x].name
          fileExt = fileExt.slice(fileExt.lastIndexOf('.'))
          const filename = uuid + fileExt

          this.images.push('/uploads/' + filename)
          formData.append("files", fileList[x], filename);
        });
        
      this.imageFiles = formData
    }
  },
  data(){
    return{
      picture: '',
      imageFiles: null,
      images: []
    }
  },

  computed:{
    friendList(){
      return this.$store.state.friendShips
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    userInModal(){
      return this.$store.state.userInModal
    }
  }
}