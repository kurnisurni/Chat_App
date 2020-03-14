import login from '../components/login.js'
import userChannels from '../components/userChannels.js'
import friendlist from '../components/friendlist.js'

export default{
    components:{
       login,
       userChannels,
       friendlist
    },
    template:`
    <div>
      <login />
      <userChannels />
      <friendlist />
    </div>
    `
}