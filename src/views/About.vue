<template>
  <div>
    <v-autocomplete
    :items="followingsItems"
    item-text="text"
    v-model="pickedUsers"
    label="Chips"
    multiple
    >
      <template v-slot:selection="user">
        <v-chip
        :class="{red: isActiveUser(user.item)}"
        @click="toggleActiveUser(user.item)"
        >{{user.item.text}}</v-chip> 
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  data(){
    return {
      followingsItems:[{"text":"gram6855","value":34},{"text":"test1","value":35},{"text":"test2","value":36},{"text":"test3","value":37}],
      pickedUsers:[],
      activectiveUser:[]
    }
  },
  methods:{
    isActiveUser(item){
      console.log(this.activeUsers)
      console.log(item.value)
      return this.activeUsers.filter(user => user.value === item.value).length >= 1
    },
    toggleActiveUser(item){
      // console.log(item) text:?? value:??
      let isActive = this.isActiveUser(item)
      if(isActive){
        const index = this.activeUsers.indexOf(item)
        if (index >= 0)this.activeUsers.splice(index, 1)
      }else{
        this.activeUsers.push(item)
      }
    }
  }
}
</script>

<style>

</style>