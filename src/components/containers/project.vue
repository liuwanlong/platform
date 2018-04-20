<template>
  <div id="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="p in pages" :class="'p'+p.id" :style="p.style">
        <template v-for="c in p.children">
          <ele :data="c" :key="c.id"></ele>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getProject, addProject } from '@/service/home'
  import ele from '@/components/cells/element/element.vue'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  export default {
    name: 'project',
    data () {
      return {
//        pages: []
      }
    },
    computed: {
      ...mapGetters([
        'pages'
      ])
    },
    components: {
      ele
    },
    mounted () {
      setTimeout(() => {
        var swiper = new Swiper('#swiper-container', {
          direction: 'vertical',
          loop: false,
          speed: '1s',
          noSwiping: true,
          observer: true,
          observeParents: true,
          onInit: function (swiper) {
            swiperAnimateCache(swiper)
            swiperAnimate(swiper)
          },
          onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper)
          }
        })
      }, 20)

    },
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }
</style>
