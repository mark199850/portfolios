export function ExtractNumber(
  str: string | undefined | null,
  fallback = 0,
): number {
  if (!str || typeof str !== "string") {
    console.warn(`ExtractNumber expected a string, received: ${typeof str}`);
    return fallback;
  }

  const matches = str.match(/(\d+)/);

  if (matches) {
    return Number(matches[0]);
  }

  console.warn(`ExtractNumber could not find a number in string: "${str}"`);
  return fallback;
}
