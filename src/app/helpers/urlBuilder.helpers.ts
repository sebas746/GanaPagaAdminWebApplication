export function buildUrl<T extends Record<string, any>>(base: string, queryParams: T): string {
  const params = new URLSearchParams()

  for (const key in queryParams) {
    if (queryParams[key] !== undefined && queryParams[key] !== null) {
      params.append(key, queryParams[key].toString())
    }
  }

  return `${base}?${params.toString()}`
}
