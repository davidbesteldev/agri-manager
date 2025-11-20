/**
 * Transforma a string para o formato Title Case.
 * * @example
 * ```typescript
 * const result = toTitleCase("café com Leite");
 * // result é: "Café Com Leite"
 * ```
 */
export const toTitleCase = (value: string): string => {
  if (!value) return value

  return value
    .toLowerCase()
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
