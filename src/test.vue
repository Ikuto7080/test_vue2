<template>
    <div>
        <button @click="open">Login with Facebook</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
        info:null
    }
}, mounted (){
    let code = this.$route.query.code
    if(code){
        
        }
    }
}