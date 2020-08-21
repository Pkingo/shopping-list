import type { IShoppingItem } from "../../types/ShoppingItem";
import { db } from "../../config/firebase";
import { collectionData } from "rxfire/firestore";
import type { Observable } from "rxjs";

const DATABASE_NAME = "shopping-list";
const ORDER_BY = "creationDate";

export function addItem(name: string, collectionId: string) {
  return db.collection(DATABASE_NAME).add({
    name,
    isBought: false,
    collectionId,
    creationDate: Date.now(),
  });
}

export function updateName(newName: string, id: string) {
  return db.collection(DATABASE_NAME).doc(id).update({ name: newName });
}

export function removeItem(id: string) {
  return db.collection(DATABASE_NAME).doc(id).delete();
}

export function updateStatus(newStatus: boolean, id: string) {
  return db.collection(DATABASE_NAME).doc(id).update({ isBought: newStatus });
}

export function getItems(collectionId: string): Observable<IShoppingItem[]> {
  const query = db
    .collection(DATABASE_NAME)
    .where("collectionId", "==", collectionId)
    .orderBy(ORDER_BY);
  return collectionData<IShoppingItem>(query, "id");
}
