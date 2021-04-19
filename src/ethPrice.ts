// update ETH-USDT pricing when 'Sync' events happen in ETH-USDT pool
// TODO: Use average of multiple stablecoins

import { Sync } from "../generated/ETHUSDT/EthUsdt";
import { Price } from "../generated/schema";
import { convertTokenToDecimal, ZERO_BD } from "./helpers";
import { BigDecimal } from "@graphprotocol/graph-ts";

export function handleSync(event: Sync): void {
	let reserveEth = convertTokenToDecimal(event.params.reserve0);
	let reserveUSDT = event.params.reserve1
		.toBigDecimal()
		.div(BigDecimal.fromString("1000000"));
	let price = Price.load("1");
	if (price === null) {
		price = new Price("1");
	}
	price.ethPriceUSDT = reserveEth.notEqual(ZERO_BD)
		? reserveUSDT.div(reserveEth)
		: ZERO_BD;
	price.timestamp = event.block.timestamp;
	price.save();
}
