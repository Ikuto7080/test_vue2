<template>
  <v-row>
    <v-col>
      <v-card max-width="400px" class="mx-auto elevation-8 pa-4">
        <v-card-text>
          <IGButton class="mb-4"/>
          <FBButton/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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