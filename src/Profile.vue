<template>
    <div>
        <h1 class="red">Profile</h1>
        <div>id: {{ account.id }}</div>
        <div>Name: {{ account.user.first_name }} {{account.user.last_name}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        account: account.id
        }
    },
     mounted (){
         this.account = JSON.parse(localStorage.getItem("account"))
        }
}

</script>
<style>

</style>

