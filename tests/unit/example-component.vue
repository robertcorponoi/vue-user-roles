<template>
  <div>
    <span id="t1" v-if="$can('edit', 'pages')">Test 1</span>

    <span id="t2" v-if="$can('edit', 'pages')">Test 2</span>

    <span id="t3" v-if="$can('edit', 'pages')">Test 3</span>

    <span id="t4" v-if="$can('edit', 'pages')">Test 4</span>

    <span id="t5" v-if="$can('organize', 'users')">Test 5</span>

    <span id="t6" v-if="$can('organize', 'users')">Test 6</span>

    <span id="t7" v-if="$can('modify', 'posts')">Test 7</span>
  </div>  
</template>

<script>
export default {
  name: "ExampleComponent"
}
</script>

<style lang="scss">

</style>