<template>
  <el-container>
    <el-header class="edit__header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="edit__layout">
        <div class="edit__layout__head">布局<i class="el-icon-plus"></i></div>
        <div class="edit__layout__cont">
          <div class="edit__layout__page-card act">1</div>
          <div class="edit__layout__page-card">2</div>
        </div>
      </el-aside>
      <el-main>
        <div class="edit__platform" ref="platform">
          <div class="demo" v-drag :style="demoPos"></div>
        </div>
      </el-main>
      <el-aside width="275px" class="edit__attr">
        <el-tabs type="border-card">
          <el-tab-pane label="编辑">

          </el-tab-pane>
          <el-tab-pane label="外观">
            <el-input v-model="positionX">
              <template slot="prepend">x坐标：</template>
            </el-input>
            <el-input v-model="positionY">
              <template slot="prepend">y坐标：</template>
            </el-input>
            <el-input v-model="width">
              <template slot="prepend">宽度：</template>
            </el-input>
            <el-input v-model="height">
              <template slot="prepend">高度：</template>
            </el-input>
            <div>
              <div>旋转值：</div>
              <el-slider
                :min="0"
                :max="360"
                v-model="rotate"
                show-input>
              </el-slider>
            </div>
            <div>
              <div>透明度：</div>
              <el-slider
                :min="0"
                :max="100"
                v-model="opacity"
                show-input>
              </el-slider>
            </div>
            <el-input v-model="borderRadius">
              <template slot="prepend">圆角：</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="动画">角色管理</el-tab-pane>
          <el-tab-pane label="事件">定时任务补偿</el-tab-pane>
        </el-tabs>
        <!--<ul class="edit__attr__head">-->
        <!--<li class="act">编辑</li>-->
        <!--<li>外观</li>-->
        <!--<li>动画</li>-->
        <!--<li>事件</li>-->
        <!--</ul>-->
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    name: 'edit',
    data () {
      return {
        positionX: 100,
        positionY: 100,
        width: 50,
        height: 50,
        rotate: 0,
        opacity: 100,
        borderRadius: '0px'
      }
    },
    computed: {
      platformPos () {
        let platformRect = this.$refs.platform.getBoundingClientRect()
        return {
          y: platformRect.top,
          x: platformRect.left
        }
      },
      demoPos () {
        return {
          top: this.positionX + 'px',
          left: this.positionY + 'px',
          width: this.width + 'px',
          height: this.height + 'px',
          transform: 'rotate(' + this.rotate + 'deg)',
          opacity: this.opacity / 100,
          borderRadius: this.borderRadius
        }
      }
    },
    methods: {},
    mounted () {

    },
    components: {}
  }
</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  .el-container {
    width: 100%;
    height: 100%;
    background-color: #323236;
    color: #fff;

  }

  .edit {
    &__header {
      background-color: #000;
    }
    &__layout {
      border-right: 1px solid #000;
      &__head {
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        background: #000;
        .el-icon-plus {
          margin-left: 120px;
        }
      }
      &__cont {
        padding: 30px;
      }
      &__page-card {
        height: 80px;
        line-height: 80px;
        background-color: #fff;
        color: #ccc;
        text-align: center;
        margin-bottom: 15px;
      }
      &__page-card.act {
        background-color: tomato;
        color: #fff;
        font-size: 20px;
      }
    }
    &__platform {
      width: 375px;
      margin: 0 auto;
      height: 627px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      .demo {
        width: 70px;
        height: 70px;
        background-color: tomato;
        position: absolute;
      }
    }
    &__attr {
      border-left: 1px solid #000;
      &__head {
        height: 40px;
        list-style-type: none;
        overflow: hidden;
        li {
          cursor: pointer;
          line-height: 40px;
          display: inline-block;
          width: 25%;
          float: left;
          text-align: center;
        }
        li.act {
          background-color: #666;
        }
      }
    }
  }
</style>
