export type ProcessId = `${string}-${string}-${string}-${string}-${string}` & {
  readonly __brand: "pid";
};

export function createPid(): ProcessId {
  return crypto.randomUUID() as ProcessId;
}

export function isPid(value: string): value is ProcessId {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}
