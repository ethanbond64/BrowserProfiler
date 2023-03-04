
import TypedStorage from "./TypedStorage";

export default class ArrayStorage<T> implements TypedStorage<T[]> {

    constructor() {

    }

    get(key: string): Promise<T[]> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            resolve(result[key] || []);
        }));
    }

    set(key: string, value: T[]): void {
        chrome.storage.local.set({ [key]: value });
    }

    append(key: string, value: T): void {
        chrome.storage.local.get(key, (result) => {
            var array = result[key] || [];
            array.push(value);
            chrome.storage.local.set({ [key]: array });
        });
    }

    clear(key: string): void {
        chrome.storage.local.set({ [key]: [] });
    }

    pop(key: string): Promise<T[]> {
        return new Promise((resolve, reject) => chrome.storage.local.get([key], (result) => {
            let value = result[key] || [];
            chrome.storage.local.set({ [key]: [] });
            resolve(value);
        }));
    }
}