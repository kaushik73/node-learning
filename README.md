## Lec-4 : Module.export & Require

**Module protect their variables and funx from leaking.**
→ means if you run app.js which has require(’./sum.js’) then the code inside sum.js will execute but you cannot use variables, functions of sum.js in app.js.

if want to use variables, functions we need to export.

```jsx
//App.js

const calcSum = require("./sum.js");

calcSum(10, 20);

// sum.js
function calcSum(a, b) {
  return a + b;
}

module.exports = calcSum;
```

New File sum.js is k/as Module

This pattern of import/export is k/as CommonJS Modules **(cjs)**.

Other pattern is ES Modules **(mjs)**

By default type : commonJS is there.

---

[]()

![alt text](image.png)
