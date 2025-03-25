<template>
	<div class="tags">
        <!-- tags标签页 -->
        <el-tag
          :key="tag.name" 
          v-for="(tag,index) in tags"
          :closable="tag.name!=='home'"
          :disable-transitions="false"
          @close="handleClose(tag,index)"
          @click="changeMenu(tag)"
          :effect="$route.name === tag.name ? 'dark' : 'plain'">
          {{tag.label}}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
 name: 'CommonTags',
 computed:{
    ...mapState({
        tags:state=>state.tabs.tabsLists
    })
  },
  methods:{
    ...mapMutations({
        close:'closeTab'
    }),
    changeMenu(tag){
        this.$store.commit('selectMenu',tag)
        this.$router.push({name:tag.name})
    },
    handleClose(tag,index){
      let length=this.tags.length-1
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return
      }
      if(index===length){
       this.$router.push({name:this.tags[index-1].name})
      }else{
       this.$router.push({name:this.tags[index].name})
      }      
    }
  }
}
</script>
<style scoped="scoped">
  .el-tag{
    margin:1px;
    background-color: #273a59;
    color: white;
    border: 1px solid #273a59;
  }
	.tags{
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr ;
      align-items: center;
      position: relative;
	    width: 100%;
	    height: 35px;
	    background-color: #273a59;
	    line-height: 32px;
	}
</style>