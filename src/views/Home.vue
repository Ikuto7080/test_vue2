<template>
  <div class="home">
    <IGButton/>
    <FBButton/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import IGButton from '../IGButton.vue'
import FBButton from '../FBButton.vue'

export default {
  name: 'Home',
  components: {
    IGButton,
    FBButton
  }
}
</script>
