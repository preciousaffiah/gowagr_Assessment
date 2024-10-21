export function generateREF(): string {
  const min = 100000000; // Minimum 9-digit number
  const max = 999999999; // Maximum 9-digit number
  const ref = Math.floor(min + Math.random() * (max - min + 1)).toString();
  return ref;
}