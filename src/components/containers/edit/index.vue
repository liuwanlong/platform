<template>
  <el-container>
    <el-header class="edit__header" height="40px">
      <el-button type="info" @click="addChild">添加元素</el-button>
      <el-button type="info" @click="openImgBox">添加图片</el-button>
      <el-button type="info" @click="removeChild">移除元素</el-button>
      <el-button type="info" @click="upIndex">上一层</el-button>
      <el-button type="info" @click="downIndex">下一层</el-button>
      <el-button type="info" @click="saveCode">保存</el-button>
      <el-button type="info" @click="createCode">预览</el-button>
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
        <div style="display: none" ref="codeWrap">
          <template v-for="p in pages">
            <div class="edit__platform swiper-slide" :class="'p'+p.id" :style="p.style">
              <template v-for="c in p.children">
                <ele :data="c" :key="c.id"></ele>
              </template>
            </div>
          </template>
        </div>
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
              <template slot="prepend">页景图：</template>
            </el-input>
            <el-input disabled :value="currentEL.id">
              <template slot="prepend">元素ID：</template>
            </el-input>
            <el-input :value="currentEL.attr.text" v-show="!isImage" @input="setELContent">
              <template slot="prepend">内容：</template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="外观">
            <el-input :value="currentEL.style.left" @input="setELLeft">
              <template slot="prepend">x坐标：</template>
            </el-input>
            <el-input :value="currentEL.style.top" @input="setELTop">
              <template slot="prepend">y坐标：</template>
            </el-input>
            <el-input :value="currentEL.style.width" @input="setELWidth">
              <template slot="prepend">宽度：</template>
            </el-input>
            <el-input :value="currentEL.style.height" @input="setELHeight">
              <template slot="prepend">高度：</template>
            </el-input>
            <el-input :value="currentEL.style.borderRadius" @input="setELBorderRadius">
              <template slot="prepend">圆角：</template>
            </el-input>
            <el-input :value="currentEL.style.border" @input="setELBorder">
              <template slot="prepend">边框：</template>
            </el-input>
            <div v-show="!isImage">
              <el-input :value="currentEL.style.fontSize" @input="setELFontSize">
                <template slot="prepend">字体大小：</template>
              </el-input>
              <el-input :value="currentEL.style.lineHeight" @input="setELLineHeight">
                <template slot="prepend">行高：</template>
              </el-input>
              <el-input :value="currentEL.style.textIndent" @input="setELTextIndent">
                <template slot="prepend">缩进：</template>
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
          <el-tab-pane label="动画">
            <el-select v-model="aniType" placeholder="请选择">
              <el-option
                v-for="item in animates"
                :key="item.value"
                :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="aniDuration">
              <template slot="prepend">时间：</template>
            </el-input>
            <el-input v-model="aniDelay">
              <template slot="prepend">延时：</template>
            </el-input>
            <div class="el-slider-text">
              播放次数
              <el-input-number size="small" :min="1" :disabled="aniLoop" v-model="aniTime"></el-input-number>
            </div>
            <div>
              <el-checkbox v-model="aniLoop">是否循环播放</el-checkbox>
            </div>
          </el-tab-pane>
          <!--<el-tab-pane label="事件">定时任务补偿</el-tab-pane>-->
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
  import { getProjects, setProject } from '@/service/home'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import ele from '@/components/cells/element/element.vue'
  import animateModel from '@/store/model/animateType'

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
      animates () {
        return animateModel.animateType
      },
      animate () {
        return this.currentEL.animate
      },
      aniType: {
        get: function () {
          return this.animate.aniType
        },
        set: function (val) {
          this.setELAnimate({
            type: 'aniType',
            val
          })
        }
      },
      aniDuration: {
        get: function () {
          return this.animate.duration
        },
        set: function (val) {
          this.setELAnimate({
            type: 'duration',
            val
          })
        }
      },
      aniDelay: {
        get: function () {
          return this.animate.delay
        },
        set: function (val) {
          this.setELAnimate({
            type: 'delay',
            val
          })
        }
      },
      aniTime: {
        get: function () {
          return Number(this.animate.time)
        },
        set: function (val) {
          this.setELAnimate({
            type: 'time',
            val
          })
        }
      },
      aniLoop: {
        get: function () {
          return this.animate.aniLoop
        },
        set: function (val) {
          this.setELAnimate({
            type: 'loop',
            val
          })
        }
      },
      isImage () {
        return this.currentEL.type === 'image'
      },
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
          return parseInt(this.currentEL.style.opacity)
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
    watch: {},
    methods: {
      ...mapMutations([
        'addChild',
        'addImgChild',
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
        'setELContent',
        'setELAnimate',
        'initStore'
      ]),
      saveCode () {
        let pId = this.$route.params.id
        setProject({
          store: this.pages,
          id: this.$route.params.id
        }, (res) => {
          if (res.body.code) {
            this.$message('保存成功')
//            this.$router.push({name: 'project', params: {id: pId}})
          }
        })
      },
      createCode () {
        let pId = this.$route.params.id
        setProject({
          store: this.pages,
          id: this.$route.params.id
        }, (res) => {
          if (res.body.code) {
            this.$router.push({name: 'project', params: {id: pId}})
          }
        })
      },
      openImgBox () {
        let me = this
        this.$prompt('请输入图片路径', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          me.addImgChild(value)

        }).catch(() => {
          me.$message({
            type: 'info',
            message: '取消添加图片'
          })
        })
      },
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
      setELBorder (val) {
        this.setELStyle({
          id: this.currentEL.id,
          type: 'border',
          val
        })
      }
    },
    mounted () {
//      console.log(animateModel)
    },
    components: {
      ele
    },
    created () {
//      let pages = JSON.parse(localStorage.getItem('pages'))
//      if(pages.length){
//        this.initStore(pages);
//      }
    },
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
      height: 667px;
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
