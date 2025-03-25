<template>
    <div class="pfzs">
        <div class="hero">
            <div class="hero_img" v-for="(item,index) in image.hero" :key="index" @click="submit(index,item)">
                <img :src="item.imgUrl" >
                <!-- <div v-if="!active" class="name"><span>{{item.name}}</span></div> -->
                <div :class="index == currentIndex ? 'nameactive' : 'name'"><span>已购买</span></div>
                <div :class="index == currentIndex ? 'lineActives' : 'lines'"></div>
            </div>
        </div>
        <div class="hero1">
            <div class="hero_img" v-for="(item,index) in image.hero1" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active1" class="name" @click="submit1"><span>{{item.name}}</span></div>
                <div v-if="active1" :style="style1" @mouseover="mouseover1" @mouseleave="mouseleave1" class="lineActive"><span>未拥有</span></div>
                <div class="lines" :class="{lineActives:lineActives1}"></div>
            </div>
        </div>
        <div class="hero2">
            <div class="hero_img" v-for="(item,index) in image.hero2" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active2" class="name" @click="submit2"><span>{{item.name}}</span></div>
                <div v-if="active2" :style="style2" @mouseover="mouseover2" @mouseleave="mouseleave2" class="lineActive" ><span>已穿戴</span></div>
                <div class="lines" :class="{lineActives:lineActives2}"></div>
            </div>
        </div>
        <div class="hero3">
            <div class="hero_img" v-for="(item,index) in image.hero3" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active3" class="name"  @click="submit3"><span>{{item.name}}</span></div>
                <div v-if="active3" :style="style3" @mouseover="mouseover3" @mouseleave="mouseleave3" class="lineActive" ><span>已购买</span></div>
                <div class="lines" :class="{lineActives:lineActives3}"></div>
            </div>
        </div>
        <div class="hero4">
            <div class="hero_img" v-for="(item,index) in image.hero4" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active4" class="name"  @click="submit4"><span>{{item.name}}</span></div>
                <div v-if="active4" :style="style4" @mouseover="mouseover4" @mouseleave="mouseleave4" class="lineActive" ><span>已拥有</span></div>
                <div class="lines" :class="{lineActives:lineActives4}"></div>
            </div>
        </div>
        <div class="hero5">
            <div class="hero_img" v-for="(item,index) in image.hero5" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active5" class="name"  @click="submit5"><span>{{item.name}}</span></div>
                <div v-if="active5" :style="style5" @mouseover="mouseover5" @mouseleave="mouseleave5" class="lineActive" ><span>未穿戴</span></div>
                <div class="lines" :class="{lineActives:lineActives5}"></div>
            </div>
        </div>
        <div class="hero6">
            <div class="hero_img" v-for="(item,index) in image.hero6" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active6" class="name"  @click="submit6"><span>{{item.name}}</span></div>
                <div v-if="active6" :style="style6" @mouseover="mouseover6" @mouseleave="mouseleave6" class="lineActive" ><span>已穿戴</span></div>
                <div class="lines" :class="{lineActives:lineActives6}"></div>
            </div>
        </div>
        <div class="hero7">
            <div class="hero_img" v-for="(item,index) in image.hero7" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active7" class="name"  @click="submit7"><span>{{item.name}}</span></div>
                <div v-if="active7" :style="style7" @mouseover="mouseover7" @mouseleave="mouseleave7" class="lineActive" ><span>已获取</span></div>
                <div class="lines" :class="{lineActives:lineActives7}"></div>
            </div>
        </div>
        <div class="hero8">
            <div class="hero_img" v-for="(item,index) in image.hero8" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active8" class="name"  @click="submit8"><span>{{item.name}}</span></div>
                <div v-if="active8" :style="style8" @mouseover="mouseover8" @mouseleave="mouseleave8" class="lineActive" ><span>未获取</span></div>
                <div class="lines" :class="{lineActives:lineActives8}"></div>
            </div>
        </div>
        <div class="hero9">
            <div class="hero_img" v-for="(item,index) in image.hero9" :key="index">
                <img :src="item.imgUrl" >
                <div v-if="!active9" class="name"  @click="submit9"><span>{{item.name}}</span></div>
                <div v-if="active9" :style="style9" @mouseover="mouseover9" @mouseleave="mouseleave9" class="lineActive" ><span>未购买</span></div>
                <div class="lines" :class="{lineActives:lineActives9}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import axios from "axios"
import {getSkinInfo} from '../../../../api/heromain/hero/transfer'
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const currentIndex=ref()
const submit=(index,item)=>{
    currentIndex.value=index
}
onMounted(()=>{
    getlist()
})
const getlist = async () => {
  await getSkinInfo().then((res) => {
    console.log(res);
    console.log(res.data);
        image.hero=res.data.List
        image.hero1=res.data.List1
        image.hero2=res.data.List2
        image.hero3=res.data.List3
        image.hero4=res.data.List4
        image.hero5=res.data.List5
        image.hero6=res.data.List6
        image.hero7=res.data.List7
        image.hero8=res.data.List8
        image.hero9=res.data.List9
  });
};
const image=reactive({
    hero:[],
    hero1:[],
    hero2:[],
    hero3:[],
    hero4:[],
    hero5:[],
    hero6:[],
    hero7:[],
    hero8:[],
    hero9:[]
})
</script>

<style scoped="scoped">
    .pfzs{
        width: 100%;
        height:100%;
        color: whitesmoke;
        margin-top: 20px;
    }
    .hero{
        margin-top: 30px;
        display: flex;
    }
    .hero1{
        margin-top: 30px;
        display: flex;
    }
    .hero2{
        margin-top: 30px;
        display: flex;
    }
    .hero3{
        margin-top: 30px;
        display: flex;
    }
    .hero4{
        margin-top: 30px;
        display: flex;
    }
    .hero5{
        margin-top: 30px;
        display: flex;
    }
    .hero6{
        margin-top: 30px;
        display: flex;
    }
    .hero7{
        margin-top: 30px;
        display: flex;
    }
    .hero8{
        margin-top: 30px;
        display: flex;
    }
    .hero9{
        margin-top: 30px;
        display: flex;
    }
    .hero_img{
        padding-left: 50px;
    }
    .name{
        width: 225px;
        height: 50px;
        background: linear-gradient(#32659e,#3a6ea7,#3d7fb4, #3d8bc0); /* 标准的语法（必须放在最后） */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }
    .nameactive{
        width: 225px;
        height: 50px;
        background: none; /* 标准的语法（必须放在最后） */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-size: 20px;
        font-weight: 800;
    }
    .lines{
        width:0px;
        height: 2px;
    }
    .lineActives{
        width: 14em;
        height: 2px;
        background-color: #32659e;
        transition: all 0.5s
    }
    .name span{
        font-size: 20px;
        font-weight: 800;
    }
</style>