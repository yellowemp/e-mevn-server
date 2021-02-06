const {MongoClient} = require('mongodb');
const  config = require('./config.js');
let client = new MongoClient(config.uri);
async function createClient() {
  await client.connect();
  return client.db("NameDb").collection("name");
}

async function closeClient(){
  client.close();
}




async function createListing(name){
  object = await createClient();
  const newListing = await createObject(name);
  const result = await object.insertOne(newListing).then(() => closeClient());
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function showAll(object){
  return object.find({}).toArray().then(() => closeClient());
}
async function  searchByName(name){
  return  await createClient().then((client) => {
    result = client.findOne({ name: name });
    if (result) {
      return result;
    } else {
      console.log('No Item Found');
      return '';
    }
  });
}
async function createObject(name) {
  return {
    name: name,
  };
}

async function updateName (oldname, newname){
 object = await createClient();
 const updatedListing = await createObject(newname);
 result = await object.updateOne({ name: oldname },
    { $set: updatedListing },
    { upsert: true }).then(() => closeClient());
 if (result.upsertedCount > 0) {
   console.log(`One document was inserted`);
 } else {
   console.log(`document was/were updated.`);
 }
}

 async function deleteName(name){
   object = await createClient();
   result = await object.deleteOne({ name: name }).then(() => closeClient());
   console.log(`document was/were deleted.`);
 }

const crudOps = {
  search: searchByName,
  update: updateName,
  add: createListing,
  delete: deleteName,
}

module.exports = crudOps;
