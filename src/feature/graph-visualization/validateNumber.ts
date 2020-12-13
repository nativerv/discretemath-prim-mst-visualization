export function validateNumber(input: string, defaultReturn: number) {
  const number = Number(input);

  return !isNaN(number) ? number : defaultReturn;
}
