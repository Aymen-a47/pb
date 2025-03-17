/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_213045686")

  // remove field
  collection.fields.removeById("relation449765763")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_213045686")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1735601770",
    "hidden": false,
    "id": "relation449765763",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "Std_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
