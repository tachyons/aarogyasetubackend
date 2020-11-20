export function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== 'undefined';
}

export function nonNullable<T>(arg: T | undefined | null): arg is T {
  return typeof arg !== 'undefined' && arg !== null;
}

export function isDate<T>(arg: T | undefined | null): arg is T {
  return nonNullable(arg) && arg instanceof Date;
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
