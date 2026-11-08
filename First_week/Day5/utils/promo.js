export const VIP_RATE = 0.15



export function vipDiscount(amount, isVip) {
  return isVip ? Number((amount * VIP_RATE).toFixed(2)) : 0
}