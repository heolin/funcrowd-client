
export interface IStorage {
    /** unique (for a user) key used to indentify the storage */
    key: string,
    /** stored data */
    data: Object
}

/**
 * Storage can be used to store any type of data in the database.
 * Each Storage object is stored under an unique (for a user) key.
 * Users do not share the Storage objects, so multiple users can use
 * the same key in the storage.
 * 
 * This class can be used as a base class for other Storage classes,
 * which can support only data objects of a certain structure.
 */
export default class Storage implements IStorage {
    constructor(public key: string, public data: Object) {}
                

    static fromJson(data: IStorage) {
        let object = new Storage(
            data.key,
            data.data
        );
        return object;
    }
}