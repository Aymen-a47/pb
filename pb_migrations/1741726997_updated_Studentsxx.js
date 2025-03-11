/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // remove field
  collection.fields.removeById("autodate2990389176")

  // remove field
  collection.fields.removeById("autodate3332085495")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "autodate3332085495",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
})
