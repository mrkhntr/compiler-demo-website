# demo-complier

## website
https://mark5595.github.io/compiler-demo-website/

## deploy
```
./deploy.sh
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Compling Ocaml to JS
https://ocsigen.org/js_of_ocaml/3.6.0/manual/rev-bindings
```
ocamlfind ocamlc -o progprog.bytes -linkpkg -package  js_of_ocaml,js_of_ocaml-ppx,extlib pretty.ml exprs.ml assembly.ml phases.ml errors.ml wasm.ml compile.ml lexer.ml parser.ml parse.ml api.ml
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
