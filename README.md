## Lec-5 : Diving into NodeJs Repo :

require("./path")
All the code of the module is wrapped inside a function (IIFE)
IIFE - Immediately Invoked Function Expression

(function () {
// ALL code of the module runs inside here
})();

So Because of IIFE - variables and funx inside a module are private to that module only.

What NodeJs doing ⇒ wrapping your module code inside IIFE, adding some extra arguments to it (eg. module, require) and then passing it to V8 engine for execution
