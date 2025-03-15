/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3673185183")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file3934339652",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "pdf_lec",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3673185183")

  // remove field
  collection.fields.removeById("file3934339652")

  return app.save(collection)
})
