const database = require("./database");

exports.getItensByType = (type) => {
  return database.execute("select * from namegator.item where type = $1", [
    type,
  ]);
};

exports.getItems = () => {
  return database.execute("select * from namegator.item");
};

exports.saveItem = (item) => {
  return database.execute(
    "insert into namegator.item (type, description) values ($1, $2) returning *",
    [item.type, item.description]
  );
};

exports.deleteItem = (id) => {
  return database.execute("delete from namegator.item where id = $1", [id]);
};
