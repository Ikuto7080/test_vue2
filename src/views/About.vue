<template>
  <div class="home">
    <MyCom v-slot:default="slotProps">
      {{ slotProps.userNm.jpName}}
    </MyCom>
  </div>
</template>

<script>
import MyCom from '../components/myCom.vue'
export default {
  components: {
    MyCom
  }
}
</script>

<style>

</style>