import type { CheckoutItem } from "./Donut";
import { writable } from "svelte/store";

export const checkoutItem = writable<CheckoutItem[]>([]);