import userChannels from '../components/userChannels.js'
import friendlist from '../components/friendlist.js'

export default{
    components:{
       userChannels,
       friendlist
    },
    template:`
    <div>
      <userChannels />
      <friendlist />
    </div>
    `
}