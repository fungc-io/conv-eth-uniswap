import { BigInt,BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import {
	Contract,
	Approval,
	Burn,
	Mint,
	Swap,
	Sync,
	Transfer,
} from "../generated/Contract/Contract";
import {
	Sync as SyncEvent,
	Transaction,
	Mint as MintEvent,
	Burn as BurnEvent,
	Swap as SwapEvent,
  Pair,
  HourData
} from "../generated/schema";

import {convertTokenToDecimal, PAIR_ID, ZERO_BD, ZERO_BI, ONE_BI} from './helpers';

export function handleApproval(event: Approval): void {
	// Entities can be loaded from the store using a string ID; this ID
	// needs to be unique across all entities of the same type
	// let entity = ExampleEntity.load(event.transaction.from.toHex());

	// // Entities only exist after they have been saved to the store;
	// // `null` checks allow to create entities on demand
	// if (entity == null) {
	// 	entity = new ExampleEntity(event.transaction.from.toHex());

	// 	// Entity fields can be set using simple assignments
	// 	entity.count = BigInt.fromI32(0);
	// }

	// // BigInt and BigDecimal math are supported
	// entity.count = entity.count + BigInt.fromI32(1);

	// // Entity fields can be set based on event parameters
	// entity.owner = event.params.owner;
	// entity.spender = event.params.spender;

	// // Entities can be written to the store with `.save()`
	// entity.save();

	// Note: If a handler doesn't require existing field values, it is faster
	// _not_ to load the entity from the store. Instead, create it fresh with
	// `new Entity(...)`, set the fields that should be updated and save the
	// entity back to the store. Fields that were not set or unset remain
	// unchanged, allowing for partial updates to be applied.

	// It is also possible to access smart contracts from mappings. For
	// example, the contract that has emitted the event can be connected to
	// with:
	//
	// let contract = Contract.bind(event.address)
	//
	// The following functions can then be called on this contract to access
	// state variables and other data:
	//
	// - contract.DOMAIN_SEPARATOR(...)
	// - contract.MINIMUM_LIQUIDITY(...)
	// - contract.PERMIT_TYPEHASH(...)
	// - contract.allowance(...)
	// - contract.approve(...)
	// - contract.balanceOf(...)
	// - contract.burn(...)
	// - contract.decimals(...)
	// - contract.factory(...)
	// - contract.getReserves(...)
	// - contract.kLast(...)
	// - contract.mint(...)
	// - contract.name(...)
	// - contract.nonces(...)
	// - contract.price0CumulativeLast(...)
	// - contract.price1CumulativeLast(...)
	// - contract.symbol(...)
	// - contract.token0(...)
	// - contract.token1(...)
	// - contract.totalSupply(...)
	// - contract.transfer(...)
	// - contract.transferFrom(...)
}

export function handleBurn(event: Burn): void {
  let amount0 = convertTokenToDecimal(event.params.amount0)
  let amount1 = convertTokenToDecimal(event.params.amount1)
  updateHourData(event)
}

export function handleMint(event: Mint): void {
  let amount0 = convertTokenToDecimal(event.params.amount0)
  let amount1 = convertTokenToDecimal(event.params.amount1)
  let sender = event.params.sender
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
    transaction.blockNumber = event.block.number
    transaction.timestamp = event.block.timestamp
    transaction.swaps = []
    transaction.mints = []
    transaction.burns = []
  }
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
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  if (transaction === null) {
    transaction = new Transaction(event.transaction.hash.toHexString())
    transaction.blockNumber = event.block.number
    transaction.timestamp = event.block.timestamp
    transaction.swaps = []
    transaction.mints = []
    transaction.burns = []
  }
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
  swap.save()
  swaps.push(swap.id)
  transaction.swaps = swaps
  transaction.save()
  
  let hourData = updateHourData(event)
  hourData.hourlyVolumeToken0 = hourData.hourlyVolumeToken0.plus(amount0Total)
  hourData.hourlyVolumeToken1 = hourData.hourlyVolumeToken1.plus(amount1Total)
  hourData.save()
}

export function handleSync(event: Sync): void {
  let sync = new SyncEvent(event.transaction.hash.toHex())
  let reserve0 = convertTokenToDecimal(event.params.reserve0)
  let reserve1 = convertTokenToDecimal(event.params.reserve1)
  sync.reserve0 = reserve0
  sync.reserve1 = reserve1
  sync.timestamp = event.block.timestamp
  sync.save()
  // update Pair
  let pair = Pair.load(PAIR_ID)
  if (pair === null){
    pair = new Pair(PAIR_ID)
  }
  pair.reserve0 = sync.reserve0
  pair.reserve1 = sync.reserve1
  pair.token0Price = (pair.reserve1.notEqual(ZERO_BD))?pair.reserve0.div(pair.reserve1):ZERO_BD
  pair.token1Price = (pair.reserve1.notEqual(ZERO_BD))?pair.reserve1.div(pair.reserve0):ZERO_BD

  pair.save()
}

export function handleTransfer(event: Transfer): void {
}

function updateHourData(event: ethereum.Event): HourData{
  let timestamp = event.block.timestamp.toI32()
  let hour = timestamp / 3600
  let hourUnix =  hour * 3600 // round timestamp to hour
  let hourData = HourData.load(hour.toString())
  if(hourData === null){
    hourData = new HourData(hour.toString())
    hourData.hour = hourUnix
    hourData.reserve0 = ZERO_BD
    hourData.reserve1 = ZERO_BD
    hourData.token0Price = ZERO_BD
    hourData.token1Price = ZERO_BD
    hourData.hourlyTxn = ZERO_BI
    hourData.hourlyVolumeToken0 = ZERO_BD
    hourData.hourlyVolumeToken1 = ZERO_BD
  }
  let pair = Pair.load(PAIR_ID)
  hourData.reserve0 = pair.reserve0
  hourData.reserve1 = pair.reserve1
  hourData.token0Price = pair.token0Price
  hourData.token1Price = pair.token1Price
  hourData.hourlyTxn = hourData.hourlyTxn.plus(ONE_BI)
  hourData.save()
  return hourData as HourData
}