const { MongoClient } = require("mongodb");
const URI =
  "mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode";

const client = new MongoClient(URI);

async function run() {
  try {
    await client.connect();
    const database = client.db("HelloWord");
    const user = database.collection("User");

    const doc = [
      {
        title: "test1",
        content: "OKAy test2 inserted",
      },
      {
        title: "test1",
        content: "OKAy test2 inserted",
      },
    ];
    const result = await user.insertMany(doc);
    console.log(`${JSON.stringify(result)}`);
    Object.values(result.insertedIds).forEach((value) => {
      // console.log(result.insertedIds[key]);
      console.log(value);
    });

    const data = await user.find({}).toArray();
    // console.log(data);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
