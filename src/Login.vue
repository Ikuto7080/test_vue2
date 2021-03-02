<template>
  <div class="login">
    <IGButton/>
    <FBButton/>
  </div>
</template>

<script>
import IGButton from './IGButton.vue'
import FBButton from './FBButton.vue'

export default {
  name: 'login',
  components: {
    IGButton,
    FBButton
  }
}

</script>