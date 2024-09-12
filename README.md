![alt text](image.png)
![alt text](image-1.png)
In the Libuv working : 4 phases (timer,poll,check,close). Before each of these phase process.nextTick() and promise/callbacks runs.

If callstack is empty and callback queue is also empty event loop waits at pool phase.

## Example :

![alt text](image-2.png)
