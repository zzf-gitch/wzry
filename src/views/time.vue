<template>
    <div class="time">
        <span>{{ texts }}</span>
        <div>{{ timeDate }}</div>
        <div class="text" @mouseenter="mouseenter" @mouseleave="mouseleave">{{ text }}</div>
        <table border="1" v-if="acties">
            <tr v-for="(row, index) in num" :key="index">
                <td v-for="(col, i) in row" :key="i">
                    {{ col }}x{{ row }} = {{ col * row }}
                </td>
            </tr>
        </table>
        <div style="display:flex;">
            <!-- item.status == 0 ? '未执行' : item.status == 1 ? '已执行' : '巡检结束' -->
            <span v-for="(item, i) in txt" :key="i">{{ item == 'u' ? item + "" : item + "-"}}</span>
        </div>
        <div>{{ $store.state.vueself.messageshow }}</div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="changes">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button :type="disabled ? 'info' : 'primary'" @click="add" :disabled="disabled">{{ disabled ? txttime : '确定'
        }}
        </el-button>

        <div class="img">
            <img :src="line ? zzfWeb : zzf" alt="" @mouseenter="mouseenters" @mouseleave="mouseleaves"
                :class="{ line: line }">
        </div>

        <div class="audio">
            <div class="header">
                <el-input v-model="input" :suffix-icon="Search" :placeholder="str" clearable class="input" />
                <el-button type="primary" @click="search">查询</el-button>
            </div>
            <div class="audio_box"
                v-for="(item, index) in audioarr.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
                :key="index">
                <div>歌曲名字：{{ item.name }}</div>
                <div>歌手：{{ item.singer }}</div>
                <audio :src="item.audio" playsinline autoplay controls loop type="audio/mp3"></audio>
            </div>
            <!-- 分页 -->
            <el-pagination small background @current-change="handleCurrentChange" layout="prev, pager, next"
                :total="audioarr.length" :current-page="currentpage" :page-size="pagesize" class="mt-4" />
        </div>

        <!-- 背景视频 -->
        <div class="videofull">
            <video class="fullvideo" :src="MV" playsinline autoplay loop muted type="video/mp4"></video>
        </div>
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
import { warningmessage , errormessage } from '@/api/message.js'
import { music } from '@/api/heromain/hero/transfer.js'
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import zzf from '@/assets/zzf.jpg'
import zzfWeb from '@/assets/zzfWeb.jpg'
import MV from '@/assets/video/沐浴阳光.mp4'
const router = useRouter();
const route = useRoute();
const store = useStore();
const texts = ref('')
const value = ref('')
const acties = ref(false)
const currentpage = ref(1)
const pagesize = ref(1)
const handleCurrentChange = (val) => {
    currentpage.value = val
}
const mouseenter = () => {
    acties.value = true
}
const mouseleave = () => {
    acties.value = false
}
const line = ref(false)
const mouseenters = () => {
    line.value = true
}
const mouseleaves = () => {
    line.value = false
}
const input = ref('')
const str = ref('')
const musicchange =()=>{
    let arr = ["你走以后","日不落(温柔DJ弹唱版)","超兽武装","某年某天（DJ版）","风雨飘洒","生而平凡DJ","篝火旁","阿衣莫(越鼓版)","Letting Go(抖音DJ版)","天空之外(DJ弹鼓版)","爱(Live)",
    "女孩(DJ版)","爱人错过（DJ版）","星月神话（DJ小华仔.咚鼓版）","百年孤寂（DJ弹鼓版）","光明（王展鹏 Remix）","起风了 (抖音热播DJ版)","热播Love story (完整版)","月亮之上Rap（DJ版）","最近 (DJ版)"]
    let index = Math.floor(Math.random() * arr.length)
    str.value = arr[index]
    const timer = setTimeout(()=>{
        musicchange()
    },1000)
}
const search = () =>{
    list()
    currentpage.value = 1
}
const list =async()=>{
    await getlist()
    let list = audioarr.value.filter((item) => item.name.toLowerCase().includes(input.value.toLowerCase()) ||  item.singer.toLowerCase().includes(input.value.toLowerCase()))
    audioarr.value = list
    if(audioarr.value.length == false){
        errormessage('歌曲不存在')
    }
}
const disabled = ref(true)
const options = ref([
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 2,
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
])
const maxtime = ref(300)
const txttime = ref(null)
// 倒计时方法
const timers = () => {
    let minute = Math.floor(maxtime.value / 60) >= 10 ? Math.floor(maxtime.value / 60) : "0" + Math.floor(maxtime.value / 60)
    let seconds = Math.floor(maxtime.value % 60) >= 10 ? Math.floor(maxtime.value % 60) : "0" + Math.floor(maxtime.value % 60)
    let txt = minute + ":" + seconds
    txttime.value = txt
    const timer = setTimeout(() => {
        if (maxtime.value > 0) {
            maxtime.value--
            timers()
            disabled.value = true
        } else {
            clearTimeout(timer)
            disabled.value = false
            warningmessage("倒计结束")
        }
    }, 1000)
}
const add = () => {
    console.log(value.value);
}
const changes = (val) => {
    console.log(val);
}
const time = () => {
    let date = new Date()
    let hours = date.getHours()
    let txt = ''
    if (hours >= 0 && hours <= 7) {
        let txt = '早上好'
        texts.value = txt
    } else if (hours > 7 && hours <= 11) {
        let txt = '上午好'
        texts.value = txt
    } else if (hours > 11 && hours <= 14) {
        let txt = '中午好'
        texts.value = txt
    } else if (hours > 14 && hours <= 19) {
        let txt = '下午好'
        texts.value = txt
    } else if (hours > 19 && hours <= 24) {
        let txt = '晚上好'
        texts.value = txt
    }
}
const timeDate = ref('')
const times = () => {
    let Dates = new Date()
    let date = {
        year: Dates.getFullYear(),
        mouth: Dates.getMonth() + 1,
        day: Dates.getDate(),
        hour: Dates.getHours(),
        minute: Dates.getMinutes(),
        second: Dates.getSeconds()
    }
    let newyear = date.year
    let newmouth = date.mouth >= 10 ? date.mouth : '0' + date.mouth
    let newday = date.day >= 10 ? date.day : '0' + date.day
    let newhour = date.hour >= 10 ? date.hour : '0' + date.hour
    let newminute = date.minute >= 10 ? date.minute : '0' + date.minute
    let newsecond = date.second >= 10 ? date.second : '0' + date.second
    let time = newyear + '-' + newmouth + '-' + newday + ' ' + newhour + ':' + newminute + ':' + newsecond
    timeDate.value = time
    setTimeout(() => {
        times()
    }, 1000)
}
const text = ref('')
const change = () => {
    let arr = ['VUE2', 'VUE3', 'UNIAPP', 'IPhone', 'Angular.js', 'React']
    let index = Math.floor(Math.random() * arr.length)
    text.value = arr[index]
    const timer = setTimeout(() => {
        change()
    }, 1000)
}
const num = ref(9)
const txt = ref('Iloveryou')
const audioarr = ref([])
const getlist = async () => {
    // await music().then(res => {
    //     console.log(res.data.listData);
    //     audioarr.value = res.data.listData
    // })
    const res = await music()
    console.log(res.data);
    audioarr.value = res.data.listData
}
onMounted(() => {
    time()
    times()
    change()
    timers()
    getlist()
    musicchange()
    console.log(route);
    console.log(route.name);
    console.log(route.path);
    console.log(store.state.vueself.messageshow)
    Number.prototype[Symbol.iterator] = function () {
        let i = 0;
        //j是传入的数字
        let j = this;
        return {
            next: function () {
                //判断函数中的变量和传入的数字大小
                let done = i > j;
                //如果变量小于传入数字 把变量作为结果传出
                let value = !done ? i++ : undefined;
                return { done, value }
            }
        }
    }
    for (let v of 5) {
        console.log(v)
    }
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    let newarr = []
    for (let item of arr) {
        const i = newarr.indexOf(item)
        if (i == -1) {
            newarr.push(item)
        }
    }
    console.log(newarr);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1)
                j--
            }
        }
    }
    console.log(arr);
    
    let data = [
        {
            id:1,
            name:'zz'
        },
        {
            id:2,
            name:'xx'
        },
        {
            id:3,
            name:'zzf'
        }
    ]

    let state = [
        {
            id:1,
            name:'zz'
        },
        {
            id:2,
            name:'xx'
        }
    ]

    let arrs = data.filter(item => !state.some(v => v.id === item.id))
    console.log(arrs);
})
</script>

<style scoped>
.time {
    width: 100%;
    height: 100%;
    color: white;
}

.text {
    cursor: pointer;
}

.audio {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.audio_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
}

.img {
    margin-top: 15px;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.img img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 50%;
}

.line {
    transform: rotateY(180deg);
    transition: all 0.5s 0.5s;
}
.header{
    display: flex;
}
.input{
    width: 180px;
}
.el-button{
    margin-left: 10px;
}
.videofull{
    width: 100vw;
    height: 100vh;
    position: absolute;
    inset: 0;
    z-index: -1;
}
.fullvideo{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>