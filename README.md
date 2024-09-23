## Lec-6 : DB, Schemas and Models | Mongoose

Cluster > Database > Collection > Document > Field

NamasteNode > devTinder > User >

---

URL of cluster :

```jsx
mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/
```

In code when connecting use /Database name as well like :

```jsx
mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/devTinder/devTinder
```

---

## Lec-7 : Diving into API’s

### **Middleware**:

`app.use(express.json())` is middleware that intercepts all incoming requests with a `Content-Type` of `application/json` and converts the raw payload to a JavaScript object. This allows you to easily work with JSON data in your request handlers.

### Q. Why we need this ?

When a client sends a request with a JSON body (such as `POST`, `PUT`, or `PATCH`), the body of the request is a raw stream of data. Express.js doesn't automatically understand or convert this stream into a usable JavaScript object. By using `express.json()`, you tell Express to parse the incoming JSON data and make it available as `req.body` in your route handlers.

---

### Schema vs Model

1. **Schema**:
   - Defines the structure of documents within a MongoDB collection.
   - Specifies fields, their types, default values, validations, and other properties.
   - Acts as a blueprint for the data, ensuring consistency and structure1.
2. **Model**:
   - A compiled constructor function based on the schema.
   - Provides an interface for interacting with the database collection.
   - Allows for creating, querying, updating, and deleting documents

---

### Compare JavaScript Object vs JSON:

| S.No. | [**JavaScript Object**](https://www.geeksforgeeks.org/objects-in-javascript/)                            | [**JSON**](https://www.geeksforgeeks.org/javascript-json/)                                    |
| ----- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1.    | Keys in key/value pairs don’t always need double quotes.                                                 | Keys in key/value pairs need to be enclosed in double quotes.                                 |
| 2.    | It is only used by JavaScript.                                                                           | Other programming languages are able to generate and use JSON.                                |
| 3.    | Functions are compatible with JavaScript Object.                                                         | Functions are incompatible with JSON.                                                         |
| 4.    | The built-in JavaScript JSON.stringify() method allows you to convert JavaScript objects to JSON format. | Using the built-in JSON.parse() method, you can transform JSON data into a JavaScript object. |
