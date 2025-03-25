<template>
    <div class="demowatch">
        <div class="demo" v-for="(item, index) in state.data" :key="index">
            <span>{{ item.name }}</span>
            <span>{{ item.id }}</span>
            <el-button type="primary" @click="delet(item, index)">删除奥特曼</el-button>
        </div>

        <div class="delete">
            <el-button type="primary" @click="deletes">delete</el-button>
            <el-button type="primary" @click="deletess">deletes</el-button>
        </div>
        <el-button type="primary" @click="add">监听一个数字</el-button>
        <el-button type="primary" @click="adds">监听一个数组</el-button>
        <el-button type="primary" @click="obj">监听一个对象</el-button>
        <el-button type="primary" @click="names">监听一个对象属性</el-button>
        <el-button type="primary" @click="age">监听两个对象属性</el-button>
        <el-button type="primary" @click="salary">深度监听</el-button>

        <el-button :disabled="disabled" :type="disabled ? 'info' : 'primary'">{{ disabled ? viewtime : '确定' }}</el-button>

        <span>{{chinaname}}</span>
        <span>{{chinaage}}</span>

        <el-button @click="aaa">reactive对象改变</el-button>
        <el-cascader v-model="longstr" :options="arrlong" :props="props" clearable @change="change"/>
    </div>
</template>

<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    nextTick,
    reactive,
    onMounted,
    watch,
    computed,
    onUnmounted,
    watchEffect
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { listLong } from '@/api/heromain/hero/transfer.js'
const router = useRouter();
const route = useRoute();
const store = useStore();
const longstr = ref([])
const arrlong = ref([])
const props = ref({ multiple: true })
const list = async () => {
    const res = await listLong()
    console.log(res.data.listData);
    arrlong.value = res.data.listData
}
const change = (value) => {
    console.log(value);
}
const disabled = ref(true)
const viewtime = ref(null)
const maxtime = ref(10)
const times = () => {
    const timer = setTimeout(() => {
        let moutine = Math.floor(maxtime.value / 60) >= 10 ? Math.floor(maxtime.value / 60) : '0' + Math.floor(maxtime.value / 60)
        let seconds = Math.floor(maxtime.value % 60) >= 10 ? Math.floor(maxtime.value % 60) : '0' + Math.floor(maxtime.value % 60)
        let time = moutine + ':' + seconds
        viewtime.value = time
        if (maxtime.value > 0) {
            maxtime.value--
            times()
            disabled.value = true
        } else {
            clearTimeout(timer)
            disabled.value = false
        }
    }, 1000)
}
const state = reactive({
    data: [
        {
            name: "迪迦",
            id: "1"
        },
        {
            name: "戴拿",
            id: "2"
        },
        {
            name: "盖亚",
            id: "3"
        },
        {
            name: "初代",
            id: "4"
        },
        {
            name: "佐菲",
            id: "5"
        },
        {
            name: "欧布",
            id: "6"
        },
        {
            name: "高斯",
            id: "7"
        }
    ],
    names: "熊二",
    age: 20,
    a: {
        b: {
            salary: '20k'
        }
    }

});
const delet = (item, index) => {
    state.data.splice(index, 1)
}
const deletes = () => {
    let arr = ['1', '2', '3', '4', '5', '6']
    delete arr[3]
    console.log(arr);
}
const deletess = () => {
    delete state.names
    console.log(state.names);
}
const count = ref(0)
const number = ref(5)

const add = () => {
    count.value++
}
const adds = () => {
    count.value++
    number.value++
}


const obj = () => {
    state.names=state.names + 'oh,yeah'
    state.age++
    state.a.b.salary="50k"
}
const names=()=>{
    state.names=state.names + 'ohyeah'
}
const age=()=>{
    state.names=state.names + 'ohyeah'
    state.age++
}
const salary=()=>{
    state.a.b.salary="50k"
}
const chinaname=ref('')
const chinaage=ref('')

const data = reactive({
    name:"abc",
    age:"1"
})
const aaa = () => {
    data.name = "abcd"
    data.age = "2"
}

watch([() => data.name, () => data.age],(newValue,oldValue) => {
    console.log(newValue,oldValue);
}, {deep:true})
// 监听一个数字的变化
// watch(count, (newValue, oldValue) => {
//     console.log(newValue, oldValue)
// })
// 监听一组数据的变化
// watch([count, number], (newValue, oldValue) => {
//     console.log(newValue, oldValue);
// }, { immediate: true })
// 监听state对象
// watch(state,(newValue,oldValue)=>{
//     console.log(newValue,oldValue);
// },{ immediate:true })
// 监听一个对象属性的变化
// watch(()=>state.names,(newValue,oldValue)=>{
//     console.log(newValue,oldValue);
// },{ immediate:true})
// 监听两个对象属性
// watch([()=>state.names,()=>state.age],(newValue,oldValue)=>{
//     console.log(newValue,oldValue);
//     chinaname.value = newValue[0]
//     chinaage.value = newValue[1]
// },{ immediate:true },{deep:true })
// 深度监听
// watch(()=>state.a,(newValue,oldValue)=>{
//     console.log(newValue,oldValue);
// },{deep:true})
onMounted(() => {
    console.log(state.names)
    times()
    list()
})
</script>

<style scoped>
.demowatch {
    width: 100%;
    height: 100%;
}
.el-cascader-node /deep/ .el-checkbox {
    margin-bottom: 50px !important;
}
</style>