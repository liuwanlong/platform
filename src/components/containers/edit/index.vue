<template>
  <el-container>
    <el-header class="edit__header" height="40px">
      <el-button type="info" @click="addChild">添加元素</el-button>
      <el-button type="info" @click="removeChild">移除元素</el-button>
      <el-button type="info" @click="upIndex">上一层</el-button>
      <el-button type="info" @click="downIndex">下一层</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px" class="edit__layout">
        <div class="edit__layout__head">
          布局
          <i class="el-icon-circle-plus" @click="addPage"></i>
          <i class="el-icon-remove" @click="removePage"></i>
          <i class="el-icon-sort-up" @click="sortUp"></i>
          <i class="el-icon-sort-down" @click="sortDown"></i>
        </div>
        <div class="edit__layout__cont">
          <template v-for="p in pages">
            <div class="edit__layout__page-card" @click="setPage(p.id)" :class="{act: pageId == p.id}">{{p.id}}</div>
          </template>
        </div>
      </el-aside>
      <el-main>
        <div class="edit__platform" ref="platform" :style="page.style">
          <template v-for="c in components">
            <ele :data="c" :key="c.id"></ele>
          </template>
        </div>
      </el-main>
      <el-aside width="275px" class="edit__attr">
        <el-tabs type="border-card">
          <el-tab-pane label="编辑">
            <el-input disabled :value="page.id">
              <template slot="prepend">页面ID：</template>
            </el-input>
            <el-input :value="page.style.backgroundImage" @change="setPageBGI">
              <template slot="prepend">背景图：</template>
            </el-input>
            <el-input disabled :value="currentEL.id">
              <template slot="prepend">元素ID：</template>
            </el-input>
            <el-input :value="currentEL.attr.text" @change="setELContent">
              <template slot="prepend">内容：</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="外观">
            <el-input :value="currentEL.style.left" @change="setELLeft">
              <template slot="prepend">x坐标：</template>
            </el-input>
            <el-input :value="currentEL.style.top" @change="setELTop">
              <template slot="prepend">y坐标：</template>
            </el-input>
            <el-input :value="currentEL.style.width" @change="setELWidth">
              <template slot="prepend">宽度：</template>
            </el-input>
            <el-input :value="currentEL.style.height" @change="setELHeight">
              <template slot="prepend">高度：</template>
            </el-input>
            <el-input :value="currentEL.style.borderRadius" @change="setELBorderRadius">
              <template slot="prepend">圆角：</template>
            </el-input>
            <el-input :value="currentEL.style.fontSize" @change="setELFontSize">
              <template slot="prepend">字体大小：</template>
            </el-input>
            <el-input :value="currentEL.style.lineHeight" @change="setELLineHeight">
              <template slot="prepend">行高：</template>
            </el-input>
            <el-input :value="currentEL.style.textIndent" @change="setELTextIndent">
              <template slot="prepend">缩进：</template>
            </el-input>
            <el-input :value="currentEL.style.border" @change="setELBorder">
              <template slot="prepend">边框：</template>
            </el-input>
            <div style="display: inline-block">
              <div class="el-slider-text">背景色</div>
              <el-color-picker :value="currentEL.style.backgroundColor" @active-change="setELBGC"
                               show-alpha></el-color-picker>
            </div>
            <div style="display: inline-block">
              <div class="el-slider-text">字体颜色</div>
              <el-color-picker :value="currentEL.style.color" @active-change="setELColor"
                               show-alpha></el-color-picker>
            </div>
            <div>
              <div class="el-slider-text">旋转值：</div>
              <el-slider
                :min="0"
                :max="360"
                v-model="rotate"
                show-input>
              </el-slider>
            </div>
            <div>
              <div class="el-slider-text">透明度：{{currentEL.style.opacity}}</div>
              <el-slider
                :min="0"
                :max="1"
                :step="0.01"
                v-model="opacity"
                show-input>
              </el-slider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="动画">角色管理</el-tab-pane>
          <el-tab-pane label="事件">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import ele from '@/components/cells/element/element.vue'

  export default {
    name: 'edit',
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'pages',
        'pageId',
        'page',
        'currentEL'
      ]),
      components () {
        return this.page.children
      },
      rotate: {
        get: function () {
          return parseInt(this.currentEL.style.transformRotate)
        },
        set: function (val) {
          this.setELStyle({
            id: this.currentEL.id,
            type: 'transformRotate',
            val
          })
        }
      },
      opacity: {
        get: function () {
          return this.currentEL.style.opacity
        },
        set: function (val) {
          this.setELStyle({
            id: this.currentEL.id,
            type: 'opacity',
            val: val
          })
        }
      }
    },
    methods: {
      ...mapMutations([
        'addChild',
        'setELStyle',
        'addPage',
        'removePage',
        'sortDown',
        'sortUp',
        'setPage',
        'setPageStyle',
        'removeChild',
        'upIndex',
        'downIndex',
        'setELContent'
      ]),
      setELLeft (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'left',
          val
        })
      },
      setELTop (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'top',
          val
        })
      },
      setELWidth (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'width',
          val
        })
      },
      setELHeight (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'height',
          val
        })
      },
      setELBorderRadius (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'borderRadius',
          val
        })
      },
      setELBGC (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'backgroundColor',
          val
        })
      },
      setPageBGI (val) {
        this.setPageStyle({
          id: this.pageId,
          type: 'backgroundImage',
          val: 'url(' + val + ')'
        })
      },
      setELColor (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'color',
          val
        })
      },
      setELFontSize (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'fontSize',
          val
        })
      },
      setELLineHeight (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'lineHeight',
          val
        })
      },
      setELTextIndent (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'textIndent',
          val
        })
      },
      setELBorder(val){
        this.setELStyle({
          id: this.currentEL.id,
          type: 'border',
          val
        })
      }
    },
    mounted () {

    },
    components: {
      ele
    }
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

  .el-slider-text {
    color: #999;
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
    }
  }
</style>
