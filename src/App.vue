<template>
  <v-app>
    <Navbar />
    <v-model>
      <router-view></router-view>
    </v-model>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  })
};
</script>
