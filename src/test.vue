<template>
    <div id="app">
        <h1>TEST</h1>
        <div v-if="!edit" class="border p-2 bg-light" v-on:click="doEdit">{{ value }}</div>
        <input v-else type="text" class="form-control" v-model="value" v-on:blur="edit = false" v-focus>

    </div>
</template>

<script>
export default {
    name: 'test',
    data() {
        return {
        value: 'Hello',
        edit: false
        }
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus()
            }
        }
    },
    methods: {
        doEdit() {
            this.edit = true;
        }
    }
}
// http://localhost:8000
</script>

<style>

</style>