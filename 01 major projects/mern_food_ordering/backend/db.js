const mongoose = require("mongoose");

const DB_Connector = async (db_connection_link) => {
  return await mongoose.connect(db_connection_link);
};

const Fetch_Data = async () => {
  const fetched_collection = await mongoose.connection.db.collection(
    "food_items"
  );
  const find_data_in_collection = async () => {
    const data = await fetched_collection.find({}).toArray();
    console.log(data);
  };
  find_data_in_collection();
};

module.exports = { DB_Connector, Fetch_Data };
