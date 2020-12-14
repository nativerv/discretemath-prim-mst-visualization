export function createBlankArray<T>(length: number, fillWith: T): T[] {
  return Array(length).fill(fillWith);
}
