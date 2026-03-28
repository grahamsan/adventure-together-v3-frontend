import type { CSSProperties } from "react";

export const BENTO_GRID_COLUMNS = 12;

export type BentoTileSpec = { colSpan: number; rowSpan: number };

/**
 * Tailles de tuiles en fonction de N pour occuper l’espace de façon cohérente.
 * Grille 12 colonnes : 4+4+4 ≈ bento 3 colonnes ; cas particuliers pour 1–3 cartes.
 */
export function tileSpecsForCount(n: number): BentoTileSpec[] {
  if (n <= 0) return [];
  if (n === 1) {
    return [{ colSpan: 12, rowSpan: 2 }];
  }
  if (n === 2) {
    return [
      { colSpan: 6, rowSpan: 2 },
      { colSpan: 6, rowSpan: 2 },
    ];
  }
  if (n === 3) {
    return [
      { colSpan: 4, rowSpan: 2 },
      { colSpan: 8, rowSpan: 1 },
      { colSpan: 8, rowSpan: 1 },
    ];
  }

  const cycle: BentoTileSpec[] = [
    { colSpan: 4, rowSpan: 2 },
    { colSpan: 4, rowSpan: 1 },
    { colSpan: 4, rowSpan: 1 },
    { colSpan: 4, rowSpan: 2 },
  ];
  return Array.from({ length: n }, (_, i) => cycle[i % 4]!);
}

const cellKey = (row: number, col: number) => `${row},${col}`;

/**
 * Placement premier trou (haut → bas, gauche → droite) pour limiter les trous.
 */
export function computeBentoPlacements(
  count: number,
  gridCols: number,
): CSSProperties[] {
  const specs = tileSpecsForCount(count);
  if (specs.length === 0) return [];

  const occupied = new Set<string>();
  const placements: CSSProperties[] = [];

  const fits = (
    row: number,
    col: number,
    colSpan: number,
    rowSpan: number,
  ): boolean => {
    if (col < 1 || col + colSpan - 1 > gridCols) return false;
    for (let dr = 0; dr < rowSpan; dr++) {
      for (let dc = 0; dc < colSpan; dc++) {
        if (occupied.has(cellKey(row + dr, col + dc))) return false;
      }
    }
    return true;
  };

  const occupy = (
    row: number,
    col: number,
    colSpan: number,
    rowSpan: number,
  ) => {
    for (let dr = 0; dr < rowSpan; dr++) {
      for (let dc = 0; dc < colSpan; dc++) {
        occupied.add(cellKey(row + dr, col + dc));
      }
    }
  };

  for (let i = 0; i < specs.length; i++) {
    const { colSpan, rowSpan } = specs[i]!;
    if (colSpan > gridCols || colSpan < 1 || rowSpan < 1) {
      throw new Error(
        `bento-grid-layout: invalid tile colSpan=${colSpan} rowSpan=${rowSpan}`,
      );
    }

    let placed = false;
    for (let row = 1; !placed; row++) {
      for (let col = 1; col <= gridCols - colSpan + 1; col++) {
        if (fits(row, col, colSpan, rowSpan)) {
          occupy(row, col, colSpan, rowSpan);
          placements.push({
            gridColumn: `${col} / span ${colSpan}`,
            gridRow: `${row} / span ${rowSpan}`,
          });
          placed = true;
          break;
        }
      }
    }
  }

  return placements;
}
