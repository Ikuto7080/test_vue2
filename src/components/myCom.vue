<template>
  <div class="mycom">
      <p>name: <slot :userNm="userNm">{{ userNm.enName}}</slot></p>
  </div>
</template>
<script>
export default {
    name: 'myCom',
    data() {
        return {
            userNm: {
                enName: 'Mirai Taro',
                jpName: 'みらい太郎'
            }
        }
    }
}
</script>
<style>
    
</style>
