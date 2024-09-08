## Ep-6 : Libuv and Async I/O :

**Sync Task**

![alt text](image.png)

**Async Task**

## ![alt text](image-1.png)

**`require`** and **`module.exports`** is called **_CommonJS Modules_** or **_CJS_**. This is the traditional module system used in Node.js. But there's another module system called **_ES Modules_** (or **_ESM_**, **`*mjs*`**), which is the standard for JavaScript modules in modern web development.

To use ES Modules in Node.js, you need to set your project to use modules. Create a **`package.json`** file and include **`"type": "module"`** in it. This tells Node.js to use the ES Module system for your project.

• In CJS code runs in non strict mode, but in ESM pattern code runs in strict mode.

---

Node.js is overall asynchronous. However, V8, which is its JavaScript engine, operates synchronously. Node.js gains its asynchronous nature from superpowers like **`libuv`**, which enables non-blocking I/O operations. This is why Node.js is known for its non-blocking behavior, allowing I/O operations to be performed asynchronously.
