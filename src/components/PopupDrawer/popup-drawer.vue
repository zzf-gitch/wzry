<!-- 弹窗公共组件 -->
<template>
  <div class="popup-drawer">
    <header class="popup-drawer-header">
      <div class="title">
        <slot name="title">应急响应</slot>
      </div>
      <div class="header-bts">
        <el-tooltip content="清空表单" placement="top" effect="dark">
          <slot name="iconson">
            <a href="javascript:void(0);">
              <i class="iconfont icon-rubber"></i>
            </a>
          </slot>
        </el-tooltip>
        <el-tooltip content="清空表单" placement="top" effect="dark">
          <slot name="iconstw">
            <a href="javascript:void(0);">
              <i class="iconfont icon-rubber"></i>
            </a>
          </slot>
        </el-tooltip>
        <el-tooltip content="清空表单" placement="top" effect="dark">
          <slot name="iconsth">
            <a href="javascript:void(0);">
              <i class="iconfont icon-rubber"></i>
            </a>
          </slot>
        </el-tooltip>
      </div>
    </header>
    <main class="popup-drawer-main">
      <slot name="popupform"></slot>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" >
.popup-drawer {
  position: absolute;
  z-index: 999;
  right: 0;
  top: 0;
  width: 25%;
  height: 100%;
  background-color: #2a3d5c;
  box-shadow: 0 0 5px #2a3d5c;

  .popup-drawer-header {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    background-color: #2a3d5c;
    padding: 0 20px;
    box-sizing: border-box;
    .title {
      font-size: 14px;
    }
    i {
      font-size: 20px;
      margin-left: 10px;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .popup-drawer_kong {
    justify-content: flex-end;
  }
  .popup-drawer-main {
    height: 100%;
    width: 100%;
    padding: 40px 20px 20px 20px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: $smoothj;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: $contentsplitline;
    }
    .el-form {
      .el-form-item {
        margin-bottom: 0;
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
      }
    }
  }
}
</style>
