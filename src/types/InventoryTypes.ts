
export interface Inventory {
  bibles: number;
  magazines: number;
  offerings: number;
  lastResetDate?: string; // Track when the inventory was last reset
}
