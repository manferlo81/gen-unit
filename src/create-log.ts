const { log } = Math

export function createLog(base: number): (num: number) => number {

  if (base === 10) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return Math.log10
  }

  if (base === 2) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return Math.log2
  }

  return (num: number): number => log(num) / log(base)

}

export default createLog
