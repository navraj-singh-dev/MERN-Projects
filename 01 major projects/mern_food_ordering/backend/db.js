const mongoose = require("mongoose");

const DB_Connector = async (db_connection_link) => {
  return await mongoose.connect(db_connection_link);
};

const Fetch_Data = async () => {
  const food_items_collection = await mongoose.connection.db.collection(
    "food_items"
  );

  const food_category_collection = await mongoose.connection.db.collection(
    "food_category"
  );

  const find_data_in_collection = async () => {
    const food_items_data = await food_items_collection.find({}).toArray();
    const food_category_data = await food_category_collection.find({}).toArray();
    global.food_items = food_items_data;
    global.food_category = food_category_data;
  };
  find_data_in_collection();
};

module.exports = { DB_Connector, Fetch_Data };
