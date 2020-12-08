export function mapCsvToMatrix(csv: string) {
  return csv.split('\n').map((rowString) => rowString.split(' ').map(Number));
}
