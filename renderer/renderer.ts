export function makeFlexLayout(
  items: string[],
  gap: number,
  direction: "column" | "row" = "row",
  sizes: number[] = [],
): string[] {
  let lastSize = 0;
  return items.filter(Boolean).map((item, i) => {
    const size = sizes[i] || 0;
    let transform = `translate(${lastSize}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${lastSize})`;
    }
    lastSize += size + gap;
    return `<g transform="${transform}">${item}</g>`;
  });
}
