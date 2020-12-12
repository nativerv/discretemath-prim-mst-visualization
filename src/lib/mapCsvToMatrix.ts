export function mapCsvToMatrix(csv: string) {
  return csv.length === 0
    ? []
    : csv.split('\n').map((rowString) => rowString.split(' ').map(Number));
}
