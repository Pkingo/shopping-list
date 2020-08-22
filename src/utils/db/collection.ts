import type { ICollection } from "../../types/Collection";
import { db } from "../../config/firebase";
import { collectionData } from "rxfire/firestore";
import type { Observable } from "rxjs";

const DATABASE_NAME = "collection";

export function addCollection(name: string) {
  return db.collection(DATABASE_NAME).add({ name });
}

export function updateCollectionName(newName: string, id: string) {
  return db.collection(DATABASE_NAME).doc(id).update({ name: newName });
}

export function getCollections(): Observable<ICollection[]> {
  const query = db.collection(DATABASE_NAME);
  return collectionData<ICollection>(query, "id");
}
