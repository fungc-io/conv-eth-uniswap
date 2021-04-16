import { BigInt,BigDecimal } from "@graphprotocol/graph-ts";

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let BD_18 = BigDecimal.fromString('1000000000000000000')
export let PAIR_ID = "0x06ad23978f67ae8cc76c54b74993b31a816bac2b"

export function convertTokenToDecimal(tokenAmount:BigInt):BigDecimal{
  return tokenAmount.toBigDecimal().div(BD_18)
}