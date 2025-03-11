/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // remove field
  collection.fields.removeById("text1356841990")

  // remove field
  collection.fields.removeById("email3885793486")

  // remove field
  collection.fields.removeById("text2730147493")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1356841990",
    "max": 0,
    "min": 0,
    "name": "Std_Name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "email3885793486",
    "name": "Std_Email",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2730147493",
    "max": 0,
    "min": 0,
    "name": "Std_Password",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
