const SNAKE_TRUE  = -1; //0xFFFFFFFF;
const SNAKE_FALSE = 0x7FFFFFFF;


let globalOutput = [];

const snakeValue2JSValue = (snakeValue) => {
    // If last bit is 1, this is a boolean value.
    if((snakeValue & 1) == 1) {
        if(snakeValue == SNAKE_TRUE) {
            return "true";
        } else if (snakeValue == SNAKE_FALSE) {
            return "false";
        } else {
            return "Unknown value: " + snakeValue;
        }
    // Otherwise, this is a number and should be shifted right
    } else {
        // Cast is used to ensure arithmetic rather than logical right shift
        return (snakeValue) / 2;
    }
}

const printSnake = (snakeValue) => {
    globalOutput.push(snakeValue2JSValue(snakeValue))
    console.log(snakeValue2JSValue(snakeValue));
}

const SNAKE_ERRCODE = {
    err_COMP_NOT_NUM: 1,
    err_ARITH_NOT_NUM: 2,
    err_LOGIC_NOT_BOOL: 3,
    err_IF_NOT_BOOL: 4,
    err_OVERFLOW: 5,
};

const importObject = {
    runtime: {
        error: function (errorCode) {
            console.error("RUNTIME ERROR", errorCode);
            switch(errorCode) {
                case SNAKE_ERRCODE.err_COMP_NOT_NUM:
                  console.error("Error: expected a number in comparison");
                  break;
                case SNAKE_ERRCODE.err_ARITH_NOT_NUM:
                  console.error("Error: expected a number in arithmetic expression");
                  break;
                case SNAKE_ERRCODE.err_LOGIC_NOT_BOOL:
                  console.error("Error: expected a boolean in logical expression");
                  break;
                case SNAKE_ERRCODE.err_IF_NOT_BOOL:
                  console.error("Error: expected a boolean in if condition");
                  break;
                case SNAKE_ERRCODE.err_OVERFLOW:
                  console.error("Error: arithmetic overflow");
                  break;
                default:
                  console.error("unknown error code");
                  break;
              }
            throw errorCode;
        },
        print: function (snakeValue) {
           printSnake(snakeValue);
           return snakeValue;
        }
    }
}


import WabtModule from "./libwabt.js"
const demo = `(module (type $t0 (func (param i32))) (type $t1 (func (param i32) (result i32))) (type $t2 (func (result i32))) (import "runtime" "error" (func $runtime.error (type $t0))) (import "runtime" "print" (func $runtime.print (type $t1))) (func $our_code_starts_here (type $t2) (result i32) i32.const 82) (global $g0 (mut i32) (i32.const -99999)) (global $g1 (mut i64) (i64.const -99999)) (export "our_code_starts_here" (func $our_code_starts_here)))`
export const run = (webAssemblyTextFormat = demo, output = []) => new Promise((ok, err) => {
    globalOutput = output;
    console.log('running the wasm')
    WabtModule().then(async (wabt) => {
        const parsedWat = wabt.parseWat('test.wat', webAssemblyTextFormat, ['mutable_globals'])
        const binaryOutput = parsedWat.toBinary({log: true, write_debug_names:true});
        console.log(binaryOutput.log)
        const module = await WebAssembly.compile(binaryOutput.buffer);
        const instance = await WebAssembly.instantiate(module, importObject);
        const result = snakeValue2JSValue(instance.exports.our_code_starts_here());
        console.log({ result });
        ok(result);
    })
});

// const myArgs = process.argv.slice(2);
// run(...myArgs).catch(err => { console.error("error at runtime", err); process.exit(-1) }).finally(() => process.exit(0));
