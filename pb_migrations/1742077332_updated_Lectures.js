/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3673185183")

  // remove field
  collection.fields.removeById("relation1685900898")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3673185183")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_608833345",
    "hidden": false,
    "id": "relation1685900898",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "Prof_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
