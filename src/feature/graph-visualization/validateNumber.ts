export function validateNumber(
  input: string,
  defaultReturn: number,
  customCheckFn = (input: number) => true
) {
  const number = Number(input);

  return !isNaN(number) && customCheckFn(number) ? number : defaultReturn;
}
