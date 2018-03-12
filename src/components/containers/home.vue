<template>
    <div>
      <SelectorComponent></SelectorComponent>
    </div>
</template>

<script>
    import SelectorComponent from '../cells/selector/selector.vue';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
           SelectorComponent
        }

    }
</script>
