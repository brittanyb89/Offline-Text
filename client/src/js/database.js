import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT into database");
  const contentDb = await openDB("jate", 1);
  const tx = contentDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ id: 1, value: content });
  const result = await request;
  console.log("putDb result.value", result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getDb from the database");
  const contentDb = await openDB("jate", 1);
  const tx = contentDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("getDb result.value", result);
  result
    ? console.log("this is result.value", result.value)
    : console.log("database doesn't exist");
  return result;
};

initdb();
