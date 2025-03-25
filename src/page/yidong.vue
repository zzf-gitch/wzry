<!-- <template>
    <div style="width:100%;height:100%">
        <van-nav-bar title="王者荣耀" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <div class="yidong">
            <div class="xiao">
                <span>1</span>
            </div>
            <div class="xiao">
                <span>2</span>
            </div>
            <div class="xiao">
                <span>3</span>
            </div>
            <div class="xiao">
                <span>4</span>
            </div>
            <div class="xiao">
                <span>5</span>
            </div>
        </div>
        <div class="swipers">
            <van-swipe :autoplay="3000" vertical lazy-render>
                <van-swipe-item v-for="(item, index) in imgList.date" :key="index">
                    <img class="img" :src="item.viewimg">
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIconk" />
            <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcong" />
            <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcond" />
            <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
        </van-action-bar>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import '@vant/touch-emulator';
import { useStore } from 'vuex'
import { Toast } from 'vant';
import oneimg from '../assets/3.jpg'
import twoimg from '../assets/zzf.jpg'
import threeimg from '../assets/qwe.jpg'
const store = useStore();
const router = useRouter();
const route = useRoute();
const imgList = reactive({
    date: [
        {
            id: 0,
            viewimg: oneimg
        },
        {
            id: 1,
            viewimg: twoimg
        },
        {
            id: 2,
            viewimg: threeimg
        }
    ]
});
const onClickIconk = () => {
    Toast('客服')
};
const onClickIcong = () => {
    Toast('购物车')
};
const onClickIcond = () => {
    Toast('店铺')
};
const onClickButton = () => {
    Toast('立即购买')
};
const onClickLeft = () => history.back();
const onClickRight = () => Toast('搜索');
</script>

<style scoped="scoped">
.van-nav-bar {
    width: 100%;
    /* height: 5%; */
    position: fixed;
}

.van-swipe {
    width: 100%;
    height: 100%;
}

.swiper {
    width: 100%;
    height: 100%;
}

.van-swipe-item {
    width: 100%;
    height: 100%;
}

.swipers {
    width: 100%;
    height: 30%;
    position: fixed;
    top: 20%;
}

.img {
    width: 100%;
    height: 100%;
}

.yidong {
    width: 100%;
    height: 15%;
    position: fixed;
    top: 5%;
    display: grid;
    grid-template-columns: 5fr 5fr 5fr 5fr 5fr;
    overflow: hidden;
    overflow-x: scroll;
}

.xiao {
    width: 200px;
    height: 100%;
    background-color: white;
    background: url(../assets/a.jpg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.yidong::-webkit-scrollbar {
    display: none;
}
</style> -->

<template>
    <div class="content">
        <van-index-bar :sticky='false'>
            <van-index-anchor :index="name" v-for="(item, name) in cities" :key="name">
                <span>{{ name }}</span>
                <van-cell :title="key.name" v-for="(key, index) in item" :key="index">
                    <span>{{ item.name }}</span>
                </van-cell>
            </van-index-anchor>
        </van-index-bar>
    </div>
</template>

<script setup>
import { getcityinfo } from "@/api/heromain/hero/transfer.js";
import { pinyin } from 'pinyin-pro';
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
const FirstPin = ref([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "W",
    "X",
    "Y",
    "Z"
])
let result = ref([])
const cities = ref([])
const search = ref('')
const getlist = async () => {
    const res = await getcityinfo()
    console.log(res.data);
    let citie = res.data
    let cityName = {}
    FirstPin.value.forEach(item => {
        cityName[item] = [];
        citie.forEach(v => {
            // let first = v.name.substring(0,1).toUpperCase();
            // 汉字变成拼音
            let firsts = pinyin(v.name, { pattern: 'initial', type: 'array' })[0].substring(0,1).toUpperCase();
            if (firsts == item) {
                cityName[item].push(v);
            }
        });
    });
    //for in 循环 key 可以循环对象
    // for of 必须具有迭代器接口 可以自己实现
    // function dp(origin, outer) {
    //     for (let key in origin) {
    //         for (let town of origin[key]) {
    //             outer.push(town)
    //         }
    //     }
    // }
    nextTick(() => {
        cities.value = cityName;
        console.log(cities.value);
        // dp(cities.value,result.value);
        let person = {
            name: "小习",
            age: "88",
            gender: "real man",
            toJSON() {
                return "我缺你荔枝一点"
            }
        }
        // one
        console.log(JSON.stringify(person, ["name", "age"]));
        // two
        let a = JSON.stringify(person, (key, value) => {
            console.log(key, value);
            if (key === "age") {
                return undefined
            } else {
                return value
            }
        })
        console.log(a);
        // three
        let b = JSON.stringify(person, null, 2)
        console.log(b);
        // four
        let c = JSON.stringify(person)
        console.log(c);
    })
}
onMounted(() => {
    getlist()
})
</script>

<style lang="scss" scoped>
.content {
    background: #eee;
}

::v-deep .van-index-anchor {
    padding: 0;

    span {
        padding-left: 10px;
        font-size: 14px;
        font-weight: 600;
    }
}
</style>