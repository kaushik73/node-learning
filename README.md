## Lec-3 : Creating Express Server :

setup of devTinder.

---

## Lec-4 : Routing & Req. Handlers :

app.use(’/test’) → match all http methods api calls to test
app.get('/test') → matches GET method API calls to '/test'

---

### Regex in path :

app.get('/ab?c') → /abc, /ac
app.get('/ab+c') → /abc, /abbbbc, /abbc

app.get('/ab\*cd') → /abcd, /abKaushikcd

app.get('/a(bc)?d') → /ad, /abcd

app.get('/career/') → /dsagfdfcareerfsdf, /careersadgf, /fsfdscareer

app.get(/post/:postID) ⇒ /post/1 , post/3

req.query & req.params →

```jsx
app.get("*post*", (req, res) => {
  res.send(
    `IT is regex for dscarrerds”, “carrer”, “carrerdsf”, and “dsfsdcarrer`
  );
});

app.get("/post/:postId", (req, res) => {
  res.send(`Post ID is ${JSON.stringify(req.params)}`);
});
app.get("/post", (req, res) => {
  res.send(`Optional Paramters ${JSON.stringify(req.query)}`);
});
```

---
