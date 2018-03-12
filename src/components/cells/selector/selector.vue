<template>
  <div class="text-container">
    {{msg}}
    <p>data from http restful api : {{data}}</p>
    <div>
      <p>some params get from state eg: {{name}}</p>
    </div>
  </div>

</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import { getData } from "../../../service/home";
export default {
  data() {
    return {
      data: "",
      msg: "this is selector"
    };
  },
  components: {},
  computed: {
    ...mapGetters(["name"])
  },

  methods: {},

  created() {
      let vm = this;
    getData().then(data => {
      console.log(data.body.name);
      vm.data = data.body.name;
    });
  }
};
</script>
<style lang="less">
  @import './selector.less';
</style>
