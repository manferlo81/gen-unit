export const { log: ln, pow } = Math

export function log(value: number, base: number): number {
  return value ? Math.floor(ln(Math.abs(value)) / ln(base)) : 0
}
