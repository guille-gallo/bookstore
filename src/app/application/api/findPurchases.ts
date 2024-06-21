

import { debounce } from '../../../utils/debounce';
import database from './database.json';
import { failRandomly, ErrorCode } from '../../../utils/errors';

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('bookstore', 1);

        request.onerror = () => {
            reject('Error opening database');
        };

        request.onsuccess = (event) => {
            const db = event?.target?.result;
            resolve(db);
        };
    });
};

const getPurchasedBooks = async () => {
    const db = await openDB();
    const tx = db.transaction('purchases', 'readonly');
    const store = tx.objectStore('purchases');
    const request = await store.getAll();
    const purchases = await new Promise((resolve, reject) => {  
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
    return purchases;
};

const addPurchaseToDB = async (purchase) => {
    const db = await openDB();
    const tx = db.transaction('purchases', 'readwrite');
    const store = tx.objectStore('purchases');
    store.add(purchase);
    await tx.complete;
};

export async function findPurchases() {
    await debounce();

    if (failRandomly()) {
        return { error: { code: ErrorCode.SOMETHING_WENT_WRONG } };
    }

    const fetchPurchases = async () => {
        try {
            let purchases = await getPurchasedBooks();
            if (purchases.length === 0) { 
                await Promise.all(database.purchases.map(async (item) => { 
                    await addPurchaseToDB(item)
                }));
                purchases = await getPurchasedBooks();
                return { data: purchases};
            }
            if (purchases.length > 0) {
                return { data: purchases};
            }
        } catch (error) {
            console.error(error);
        }
    };
    return await fetchPurchases();
}