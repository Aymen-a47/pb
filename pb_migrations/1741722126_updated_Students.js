/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // update collection data
  unmarshal({
    "name": "Studentsxx"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_491894781")

  // update collection data
  unmarshal({
    "name": "Students"
  }, collection)

  return app.save(collection)
})
