export const VIP_RATE = 0.1

export function afterFullReduction(amount) {
  if (amount >= 1000) return amount - 150
  if (amount >= 300) return amount - 50
  return amount
}

export function vipDiscount(amount, isVip) {
  return isVip ? Number((amount * VIP_RATE).toFixed(2)) : 0
}