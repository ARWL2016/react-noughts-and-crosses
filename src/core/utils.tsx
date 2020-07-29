export function fillArray<T>(arrayLength: number, fillValue: T): T[] {
    const arr = new Array(arrayLength);

    arr.fill(fillValue, 0, arrayLength);

    return arr;
}