/**
 * Returns a promise that resolves after `seconds`
 * @param seconds seconds
 */
export function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
