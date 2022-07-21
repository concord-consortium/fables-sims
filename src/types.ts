
export type BoatLocation = undefined | "top" | "bottom";
export type BoatType = undefined | "big" | "small";

export type CartStatus = "CART.FAIL"|"CART.SUCCESS"|"CART.START"|"CART.IDLE";
export type BoatStatus = "BOAT.START";
export type StatusMessage = BoatStatus | CartStatus;
