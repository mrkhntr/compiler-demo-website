<template>
  <div>

    <div class="grid-container">
      <div class="fill-row controls">
        <button v-on:click="onCompileClick">Compile</button>
        <button :disabled="!webassemblyTextOutput"  v-on:click="onRunClick">Run</button>
        <button :disabled="!runtimeOutput.length" v-on:click="runtimeOutput = []">Clear runtime output</button>
      </div>
      <codemirror class="fill-row" style="text-align: left; font-size: 20px;" v-model="userInputSnakeProgram" :options="{
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        lineWrapping: true,
        theme: 'mdn-like'
      }" />
      <textarea class="editor" v-model="webassemblyTextOutput" placeholder="Output webassembly"></textarea>
      <textarea disabled class="editor" :value="runtimeOutput.join('\n')" placeholder="Program runtime output (i.e. prints)"></textarea>
      <textarea disabled class="editor" v-model="runtimeFinalValue" placeholder="Final program value"></textarea>
    </div>
  </div>
</template>

<script>

import { run } from '../assets/comp.js'
import { MyCompiler } from '../assets/MyCompiler.js'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// const demo = `(module (type $t0 (func (param i32))) (type $t1 (func (param i32) (result i32))) (type $t2 (func (result i32))) (import "runtime" "error" (func $runtime.error (type $t0))) (import "runtime" "print" (func $runtime.print (type $t1))) (func $our_code_starts_here (type $t2) (result i32) i32.const 82) (global $g0 (mut i32) (i32.const -99999)) (global $g1 (mut i64) (i64.const -99999)) (export "our_code_starts_here" (func $our_code_starts_here)))`


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    codemirror,
  },
  data() {
    return {
      userInputSnakeProgram: '',
      webassemblyTextOutput: '',
      runtimeFinalValue: '',
      runtimeOutput: [],
     }
  },

  mounted() {
  },

  methods: {
    onCompileClick() {
      console.log('user request to compile program');
      if (!this.userInputSnakeProgram) {
        alert('You did not input a program into the editor!');
        return;
      }
      this.webassemblyTextOutput = MyCompiler.snake2Wat(this.userInputSnakeProgram);
    },
    onRunClick() {
      if (!this.webassemblyTextOutput) {
        throw 'expected the output of webassembly to be non-fasely';
      }
      run(this.webassemblyTextOutput, this.runtimeOutput).then((onSuccessCompilation) => {
        this.runtimeFinalValue = onSuccessCompilation;
      })
    },
    tabber (event) {
      if (event) {
        event.preventDefault()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fill-row {
  grid-column-start: 1;
  grid-column-end: 4;
}
.controls {
  margin-right: auto;
}
.grid-container {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin-right: 20px;
  margin-left: 30px;
}
.editor {
  overflow-y: scroll;
  height: flex;
  min-height: 300px;

}
</style>
