<!-- index -->
<template>
<slot name='title'>
    <span></span>
    <p></p>
</slot>
<slot name='main'></slot>

</template>

<script setup>
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()

</script>

<style lang="scss" >
header {
    display: flex;
    align-items: center;

    span {
        margin-right: 6px;
        width: 6px;
        height: 18px;
        background: #9acff6;
    }

    p {
        color: #0a89e8;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 1px;
    }
}

main {

    .con {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 3px;
        display: grid;
        grid-template-columns: 1fr 5fr;

    }

    .img {
        width: 100%;
        height: 100%;

        div {
            width: 298px;
            height: 198px;


            .el-upload--picture-card i {
                margin-top: 80px;
            }
        }

        img {
            width: 350px;
            height: 198px;
            border-radius: 3px;
        }
    }

    .from {
        padding-left: 20px;
        position: relative;

        .icon {
            position: absolute;
            right: 10px;
            top: 8px;

            .iconfont {
                cursor: pointer;
                color: #babec3;
            }
        }

        .el-form {

            .el-form-item {
                margin-bottom: 0px;

                .el-form-item__label {
                    display: inline-block;
                    line-height: 40px;
                    padding: 0;
                    width: 68px;
                    white-space: nowrap;
                    text-align-last: justify;
                }

                .el-form-item__content {
                    padding-left: 5px;
                    box-sizing: border-box;

                    .el-select,
                    .el-input,
                    .el-cascader,
                    .el-date-editor {
                        width: 100%;

                        .el-input__inner {
                            height: 32px;

                            &:focus {
                                border: 1px solid #c0c4cc;
                            }
                        }
                    }

                    .el-textarea__inner {
                        margin: 3px 0;

                        &:focus {
                            border: 1px solid #c0c4cc;
                        }
                    }

                    .el-date-editor {
                        height: 32px;

                        &:focus {
                            border: 1px solid #c0c4cc;
                        }
                    }

                }

                &:nth-of-type(1) {


                    .el-input {
                        width: 40%;
                    }
                }
            }
        }

    }

    .zhangjie {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #d9d9d9;
        display: grid;
        grid-template-columns: 0.5fr 4fr;

        .img {
            width: 190px;
            height: 108px;

            div {
                width: 190px;
                height: 108px;


                .el-upload--picture-card i {
                    margin-top: 40px;
                }

                img {
                    width: 190px;
                    height: 108px;
                    border-radius: 3px;
                }
            }
        }

        .zj {
            display: grid;
            grid-template-columns: 1.6fr 1.6fr 0.1fr;

            .el-form-item {
                .el-form-item__content {
                    .el-input {
                        width: 100%;

                    }

                }

            }
        }
    }

}
</style>
