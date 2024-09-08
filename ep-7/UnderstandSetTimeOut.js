console.log("Hellow");

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
Hellow
I am done
I will after 0 seconds !
I will after 3 seconds !
1I will after 5 seconds !
2I will after 5 seconds !
I will after 7 seconds !
*/
