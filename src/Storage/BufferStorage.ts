

export default interface BufferStorage<T> {

    //
    // Get the value stored at the given key.
    //
    get(key: string): Promise<T>;

    //
    // Set the value to be stored at the given key.
    //
    set(key: string, value: T): void;

    //
    // Clear the value stored at the given key.
    //
    clear(key: string): void;

    //
    // Get the value stored at the given key and clear it.
    //
    pop(key: string): Promise<T>;
}