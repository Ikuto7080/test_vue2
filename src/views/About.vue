<template>
<div id="app">
  <v-app>
    <v-card color="grey lighten-3" align="center">
      <h2 class="pt-12 pb-12 indigo--text">Awesomeness</h2>

      <v-speed-dial
        v-model="dialShare"
        absolute
        right
        bottom
        direction="left"
        open-on-hover
      >
        <template v-slot:activator>
          <v-btn fab bottom small color="primary">
            <v-icon v-if="dialShare">mdi-close</v-icon>
            <v-icon v-else>mdi-share-variant</v-icon>
          </v-btn>
        </template>
        <v-btn
          dark
          fab
          bottom
          color="green"
          small
          :href="`https://wa.me/?text=Checkout%20this%20page.%20${pageUrl}`"
          target="_blank"
        >
          <v-icon>mdi-whatsapp</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>
    <!-- other code -->
  </v-app>
</div>
</template>

<script>
export default {
  data(){
    return{
      dialShare:false,
      pageUrl: "https://techformist.com"
    }
  }
}
</script>

<style>
.sharebtn_item a {
  font-size:50px;
  color:green;
    border-radius: 50%;
}

.sharebtn li {
  list-style: none;
}

</style>