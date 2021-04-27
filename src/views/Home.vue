<template>
    <v-row>
      <v-col>
        <v-card max-width="400px" class="mx-auto elevation-8">
          <v-card-title class="justify-center">Welcome to Quouze!!</v-card-title>
          <v-card-text class="mt-8">
            <div class="mb-4">クリックしてインバイトページにアクセスした後、ラインでメッセージを送信してください。</div>
            <div class="error--text" v-show="!isMobile">Please use mobile phone to request invite link</div>
            <v-btn href="https://line.me/R/oaMessage/@552lklqg/?I%20want%20to%20sign%20up" color="primary" block large :disabled="!isMobile">
              Request invite link
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {
  computed:{
    isMobile(){
      return this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style>

</style>


