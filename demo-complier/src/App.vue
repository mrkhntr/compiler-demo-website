<template>
  <div id="app">
    <h1> WebAssembly Snake Compiler Demo </h1>
    <h3> An x86 compiler I made as part of a Compilers course at Northeastern that I adapted to target WebAssembly </h3>
    <a href="https://www.amazon.com/Compilers-Principles-Techniques-Alfred-Aho/dp/0201100886">
      <img alt="Image adapted from Book Compilers: Principles, Techniques, and Tools" src="./assets/compiler_d.jpg">
    </a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
