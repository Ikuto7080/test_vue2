<template>
    <div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
        info:null
    }
}, mounted (){
    let code = this.$route.query.code
    if(code){
        let data = {fb_code: code}
        axios
        .post('/accounts/', data)
        .then(resp => {
            this.info = resp.data
            console.log(resp.data)
            axios.defaults.headers.common['Authorization'] = resp.data.token
            localStorage.setItem("account", JSON.stringify(resp.data))
            this.$router.push('/profile/')
        })
        }
    }
}

</script>
<style>

</style>

