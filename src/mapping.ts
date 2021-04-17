import { BigInt,BigDecimal} from "@graphprotocol/graph-ts";
import {
	Approval,
	Burn,
	Mint,
	Swap,
	Sync,
	Transfer,
} from "../generated/Contract/Contract";
import {
	Transaction,
	Mint as MintEvent,
	Burn as BurnEvent,
	Swap as SwapEvent,
  Pair,
} from "../generated/schema";

import {convertTokenToDecimal, PAIR_ID, ZERO_BD, getEthPriceUSDT, updateHourData, createNewTransaction} from './helpers';

export function handleApproval(event: Approval): void {}

export function handleBurn(event: Burn): void {
  let amount0 = convertTokenToDecimal(event.params.amount0)
  let amount1 = convertTokenToDecimal(event.params.amount1)
  let sender = event.params.sender
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let pair = Pair.load(PAIR_ID)
  let amountUSD = amount1.times(pair.token0Price).plus(amount0).times(getEthPriceUSDT())
  if (transaction === null) transaction = createNewTransaction(event)
  let burns = transaction.burns
  let burn = new BurnEvent(event.transaction.hash
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(burns.length).toString()))
  burn.amount0 = amount0
  burn.amount1 = amount1
  burn.sender = sender
  burn.logIndex = event.logIndex
  burn.transaction = transaction.id
  burn.timestamp = transaction.timestamp
  burn.amountUSD = amountUSD
  burns.push(burn.id)
  transaction.burns = burns
  transaction.save()
  burn.save()
  updateHourData(event)
}

export function handleMint(event: Mint): void {
  let amount0 = convertTokenToDecimal(event.params.amount0)
  let amount1 = convertTokenToDecimal(event.params.amount1)
  let sender = event.params.sender
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let pair = Pair.load(PAIR_ID)
  let amountUSD = amount1.times(pair.token0Price).plus(amount0).times(getEthPriceUSDT())
  if (transaction === null) transaction = createNewTransaction(event)
  let mints = transaction.mints
  let mint = new MintEvent(event.transaction.hash
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(mints.length).toString()))
  mint.amount0 = amount0
  mint.amount1 = amount1
  mint.sender = sender
  mint.logIndex = event.logIndex
  mint.transaction = transaction.id
  mint.timestamp = transaction.timestamp
  mint.amountUSD = amountUSD
  mints.push(mint.id)
  transaction.mints = mints
  transaction.save()
  mint.save()
  updateHourData(event)
}

export function handleSwap(event: Swap): void {
  let amount0In = convertTokenToDecimal(event.params.amount0In)
  let amount1In = convertTokenToDecimal(event.params.amount1In)
  let amount0Out = convertTokenToDecimal(event.params.amount0Out)
  let amount1Out = convertTokenToDecimal(event.params.amount1Out)
  let amount0Total = amount0Out.plus(amount0In)
  let amount1Total = amount1Out.plus(amount1In)
  let trackedAmountUSD = amount0Total.times(getEthPriceUSDT())

  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) transaction = createNewTransaction(event)

  let swaps = transaction.swaps
  let swap = new SwapEvent(
    event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(swaps.length).toString())
  )
  swap.timestamp = transaction.timestamp
  swap.transaction = transaction.id
  swap.sender = event.params.sender
  swap.amount0In = amount0In
  swap.amount1In = amount1In
  swap.amount0Out = amount0Out
  swap.amount1Out = amount1Out
  swap.to = event.params.to
  swap.from = event.transaction.from
  swap.logIndex = event.logIndex
  swap.amountUSD = trackedAmountUSD
  swap.save()
  swaps.push(swap.id)
  transaction.swaps = swaps
  transaction.save()

  let hourData = updateHourData(event)
  hourData.hourlyVolumeToken0 = hourData.hourlyVolumeToken0.plus(amount0Total)
  hourData.hourlyVolumeToken1 = hourData.hourlyVolumeToken1.plus(amount1Total)
  hourData.hourlyVolumeUSD = hourData.hourlyVolumeUSD.plus(trackedAmountUSD)
  hourData.save()
  
}

export function handleSync(event: Sync): void {
  let reserve0 = convertTokenToDecimal(event.params.reserve0)
  let reserve1 = convertTokenToDecimal(event.params.reserve1)

  // update Pair
  let pair = Pair.load(PAIR_ID)
  if (pair === null){
    pair = new Pair(PAIR_ID)
    pair.reserveETH = ZERO_BD
  }
  pair.reserve0 = reserve0
  pair.reserve1 = reserve1
  pair.token0Price = (pair.reserve1.notEqual(ZERO_BD))?pair.reserve0.div(pair.reserve1):ZERO_BD
  pair.token1Price = (pair.reserve0.notEqual(ZERO_BD))?pair.reserve1.div(pair.reserve0):ZERO_BD
  let reserveETH: BigDecimal
  reserveETH = reserve1.times(pair.token0Price).plus(pair.reserve0)
  pair.reserveETH = reserveETH
  pair.reserveUSD = pair.reserveETH.times(getEthPriceUSDT())
  pair.save()
}

export function handleTransfer(event: Transfer): void {}