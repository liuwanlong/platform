<template>
  <div :id="data.id" class="wrap" v-drag="data.id" :style="style" @click="setCurrentEL(data.id)">
    <img v-if="data.type=='image'" :src="data.attr.src" alt="">
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
        return this.data.style

      }
    },
    methods: {
      ...mapMutations([
        'setCurrentEL'
      ])
    }
  }
</script>
