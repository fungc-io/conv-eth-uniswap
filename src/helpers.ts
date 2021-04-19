import { BigInt, BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import { Price, HourData, Transaction, Pair } from "../generated/schema";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BD_E18 = BigDecimal.fromString("1000000000000000000");
export let PAIR_ID = "0x06ad23978f67ae8cc76c54b74993b31a816bac2b";

export function convertTokenToDecimal(tokenAmount: BigInt): BigDecimal {
	return tokenAmount.toBigDecimal().div(BD_E18);
}

export function getEthPriceUSDT(): BigDecimal {
	let price = Price.load("1");
	if (price === null) return ZERO_BD;
	else return price.ethPriceUSDT;
}

export function createNewTransaction(event: ethereum.Event): Transaction {
	let transaction = new Transaction(event.transaction.hash.toHexString());
	transaction.blockNumber = event.block.number;
	transaction.timestamp = event.block.timestamp;
	transaction.swaps = [];
	transaction.mints = [];
	transaction.burns = [];
	transaction.save();
	return transaction as Transaction;
}

export function updateHourData(event: ethereum.Event): HourData {
	let timestamp = event.block.timestamp.toI32();
	let hour = timestamp / 3600;
	let hourUnix = hour * 3600; // round timestamp to hour
	let hourData = HourData.load(hour.toString());
	if (hourData === null) {
		hourData = new HourData(hour.toString());
		hourData.hour = hourUnix;
		hourData.reserve0 = ZERO_BD;
		hourData.reserve1 = ZERO_BD;
		hourData.token0Price = ZERO_BD;
		hourData.token1Price = ZERO_BD;
		hourData.reserveETH = ZERO_BD;
		hourData.reserveUSD = ZERO_BD;
		hourData.hourlyTxn = ZERO_BI;
		hourData.hourlyVolumeToken0 = ZERO_BD;
		hourData.hourlyVolumeToken1 = ZERO_BD;
		hourData.hourlyVolumeUSD = ZERO_BD;
	}
	let pair = Pair.load(PAIR_ID);
	hourData.reserve0 = pair.reserve0;
	hourData.reserve1 = pair.reserve1;
	hourData.token0Price = pair.token0Price;
	hourData.token1Price = pair.token1Price;
	hourData.reserveETH = pair.reserveETH;
	hourData.reserveUSD = pair.reserveUSD;
	hourData.hourlyTxn = hourData.hourlyTxn.plus(ONE_BI);
	hourData.save();
	return hourData as HourData;
}
