

export type ForceSelection = null | "CART.FORCE-NONE" | "CART.FORCE-SMALL" | "CART.FORCE-LARGE";
export type CartStatus = "CART.FAIL"|"CART.SUCCESS"|"CART.START"|"CART.IDLE";

export type BoatLocation = undefined | "top" | "bottom";
export type BoatType = undefined | "big" | "small";
export type BoatStatus =
  "BOAT.START" | "BOAT.INSTRUCTIONS" |
  "BOAT.FINISH_B" | "BOAT.FINISH_A" | "BOAT.FINISH_C";
export type StatusMessage = BoatStatus | CartStatus;
