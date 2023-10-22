import Dexie from "dexie";

export const db = new Dexie("calendar");

db.version(1).stores({
  count: "++id, count"
})
