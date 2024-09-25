## Lec-8 : Sanitization & Schema Validations

### app.use VS app.all :

app.use('/')) will match any path that begins with /. This means that anything like/about and /contact are included.

However, app.all('/')) will match only the specific route /. So, /about and /contact, for example, won't be included.

```
app.use( "/product" , mymiddleware);
// will match /product
// will match /product/cool
// will match /product/foo

app.all( "/product" , handler);
// will match /product
// won't match /product/cool   <-- important
// won't match /product/foo    <-- important
```

---

By Default `validate` (custom validation funx) may only enabled for post, for others need to pass runValidators= true.

---

For validations on DB level, we can download **npm i validator**

---

### use of \_\_v in MongoDb?

when inserting document(s) through mongoose. It auto-generates one more field. This field is the \_\_v field.

The **v field is called the version key. This **v field is used to track the revisions of a document. By default, its value is zero. In real practice, the **v field increments by one only when an array is updated. In other situations, the value of the **v field remains unaffected. So to keep the track of \_\_v field in such situations, we can do it manually using the increment operator provided by the mongoose.

---

## Lec-9 : Encrypting Passwords :

For encryption → npm i bcrypt
