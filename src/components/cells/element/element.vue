<template>
  <div :id="data.id" class="wrap" v-drag="data.id" :style="style" @click="setCurrentEL(data.id)"
       :class="[{ani: data.animate.aniType != 'none'}]"
       :swiper-animate-effect="data.animate.aniType"
       :swiper-animate-duration="data.animate.duration"
       :swiper-animate-delay="data.animate.delay"
  >
    <img v-if="data.type=='image'" draggable="true" @dragstart="drag($event)" :src="data.attr.src" alt="">
    <div v-if="data.type=='div'">{{data.attr.text}}</div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    props: ['data'],
    data () {
      return {}
    },
    computed: {
      style () {
        this.data.style.transform = 'rotate(' + this.data.style.transformRotate + 'deg)'
        this.data.style.animationIterationCount = this.data.animate.loop ? 'infinite' : this.data.animate.time
        return this.data.style
      }
    },
    methods: {
      ...mapMutations([
        'setCurrentEL'
      ]),
      drag (e) {
        e.preventDefault()
      }
    }
  }
</script>

<style lang="less" scoped="">
  .wrap {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
</style>
