<template>
    <div>
        <h1 class="red">Profile</h1>
        <div>id: {{ account.id }}</div>
        <div>Name: {{ account.user.first_name }} {{account.user.last_name}}</div>
        <p class="pink lighten-4 red--text--darken-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias magnam ullam animi autem iure amet culpa enim ipsam quis numquam? Harum ex tempore commodi id? Eveniet commodi porro veritatis dolorem.</p>
        <h1 class="display-3">Massive Display</h1>
        <p class="subtitle-2">Hello</p> 
    </div>
</template>

<script>
export default {
    data(){
        return {
        account: null
        }
    },
     mounted (){
         this.account = JSON.parse(localStorage.getItem("account"))
        }
}

</script>
<style>

</style>

