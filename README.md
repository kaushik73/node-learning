## Lec-11 : Creating a Server :

![alt text](image.png)

### **What is Server?**

When someone says "deploy to the server," it means we're referring to the hardware where the operating system and processors are. It means we're running our application, the one we've coded, on that machine. This hardware allows us to save something to the system and retrieve it.

---

### **TCP IP Protocol/Web**

Whenever data is sent, it uses the **Transfer Control Protocol (TCP)**. Multiple computers are connected to each other using the internet, which is why it’s called the web, and each has an address. But what does "protocol" mean? It means rules. Communication must follow some rules.

---

### **Other protocols**

HTTP, FTP, SMTP are different types of request protocols. Depending on the type of request, different rules are used to transfer data. It's like getting things from a shop — different items have different rules. For example, water needs a bottle, but vegetables need a packet. The same applies to requests in a server; the protocol defines the rules. For normal web requests, we use the **HTTP protocol** (Hypertext Transfer Protocol).

---

http ⇒ the language which server-client communicate defined by http/smtp/ftp

TCP/IP ⇒ protocol of sending the data eg. send data in packets

---

T here is mapping of IP address and domain name on DNS server

---

When we search something on browser then vo dns server se ip leke then requ. goes to that server that is http-server fetch the required data and gives and it comes in chunks. There is stream of data that is transferred and in stream we have buffers.

---

We can create multiple http server on same IP ( or same server ) as ports are different. So ip + port refers to http-server.

## ![alt text](image-1.png)

![alt text](image-2.png)

for one application we can have different servers as well.

---

![alt text](image-3.png)

http connection == **socket**, that ends connection after taking necessary data… and in **web socket** it does not end its connection.

---

## 1st Server :

```jsx
const sever = http.createServer(function (req, res) {
  //req and res are the object you get
  // .end to use to send the response
  if (req.url === "/seed-a-plant") {
    res.end("🌱 Plant Seeded, Wohoo  👏");
    return;
  }
  res.end("You are getting this from heyashu.in");
});

// listen on post 7777
sever.listen(7777);
```
