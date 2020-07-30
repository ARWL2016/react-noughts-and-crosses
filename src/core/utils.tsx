export function fillArray<T>(arrayLength: number, fillValue: T): T[] {
    const arr = new Array(arrayLength);

    arr.fill(fillValue, 0, arrayLength);

    return arr;
}

export function newWinArray() {
    return [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
}

export function sumArray(arr: number[]): number {
    return arr.reduce((a, b) => a + b);
}

export function areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;

    let areEqual = true;

    arr1.forEach((num, idx)=> {
        if (num !== arr2[idx]) {
            areEqual = false;
        }
    })

    return areEqual;
}