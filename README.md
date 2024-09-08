## Ep-7 : Sync, Async, SetTimeOut :

### Modules :

JavaScript modules allow you to break up your code into separate files.

This makes it easier to maintain a code-base.

Modules are imported from external files with the `import` OR `require` statement.

---

readFile do not blocks **but** readFileSync blocks the main thread (it is blocking I/O).

**Note :** Sync funx blocks the main thread, don’t use sync methods.

---

```jsx
console.log("Hello");

setTimeout(function callback() {
  console.log("1I will after 5 seconds !");
}, 5000);
setTimeout(function callback() {
  console.log("2I will after 5 seconds !");
}, 5000);

setTimeout(function callback() {
  console.log("I will after 0 seconds !");
}, 0);

setTimeout(function callback() {
  console.log("I will after 3 seconds !");
}, 3000);
setTimeout(function callback() {
  console.log("I will after 7 seconds !");
}, 7000);

console.log("I am done");

/*
Hello
I am done
I will after 0 seconds !
I will after 3 seconds !
1I will after 5 seconds !
2I will after 5 seconds !
I will after 7 seconds !
*/
```

0 sec vala **I am done** ke baad print hua, because main thread call stack jab tak pura khatam nahi hota tab tak async operations libuv se main call stack m aana chalu nahi karte.

V8 engine runs on main thread.
