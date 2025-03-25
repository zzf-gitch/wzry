<template>
  <div class="hello">
		<h2 v-text="counte"></h2>
		<p v-text="uncounte"></p>
		<button type="button" @click="add">counte++</button>
		<div>原来的:<input type="number" v-model="yuan" /></div>
		<div>增加的:<input type="number" v-model="zeng" /></div>
		<div>一共的:<input type="number" v-model="total" /></div>
		<div>龙骨:<input type="text" v-model="long" /></div>
		<div>麒麟骨:<input type="text" v-model="qiling" /></div>
		<div>骨王:<input type="text" v-model="wang" /></div>
		<h1>{{p1}}</h1>
		<br>
		<button type="button" @click="p1q">点击p1++</button>
		<h1>{{p2}}</h1>
		<button type="button" @click="qlp">点击p2++2</button>
  </div>
</template>

<script>
import { ref , unref, computed} from 'vue'
import {reactive,toRefs} from 'vue'
import {watch} from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { useStore } from 'vuex'
// console.log(useRouter)
// console.log(useRoute)
// console.log(useStore)
// console.log(ref)
// console.log(unref)
// console.log(computed)
// const router = useRouter()
// const route = useRoute()
// const store=useStore()

export default{
	setup(){
		const p1=ref(0)
		const p2=ref(10)
		const yuan=''
		const zeng=''
		const long=''
		const qiling=''
		const res=reactive({yuan,zeng,long,qiling})
		const total=computed(()=>{
			return res.yuan*res.zeng
		})
		const wang=computed(()=>{
			return res.long+res.qiling
		})
		watch(p1,(newvalue,oldvalue)=>{
			console.log(newvalue,oldvalue)
		})
		watch([p1,p2],(newvalue,oldvalue)=>{
			console.log(newvalue,oldvalue)
		})
		const counte=ref(10)
		const uncounte=computed(()=>unref(counte)*20)
		const add=()=>{
			counte.value++
		}
		const p1q=()=>{
			p1.value++
		}
		const qlp=()=>{
			p2.value+=3
		}
		return{
			counte,uncounte,add,...toRefs(res),total,wang,
			p1,p1q,p2,qlp
		}
	}
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

a {
  color: #42b983;
}
</style>
