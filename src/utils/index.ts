import image13 from "@/assets/images/image 13.png";
import image110 from "@/assets/images/image 110.png";
import image112 from "@/assets/images/image 112.png";
import satisfactionBadge from "@/assets/images/Satisfaction Badge-05 1.png";
import shippingTruck from "@/assets/images/Wyze Sense Keypad.png";
import wyzeShield from "@/assets/images/Layer_1.png";

export const imageMap: Record<string, string> = {
  "image 13.png": image13,
  "image 110.png": image110,
  "image 112.png": image112,
  "Satisfaction Badge-05 1.png": satisfactionBadge,
  "Wyze Sense Keypad.png": shippingTruck,
  "Layer_1.png": wyzeShield,
};

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
