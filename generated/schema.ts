// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transaction", id.toString(), this);
  }

  static load(id: string): Transaction | null {
    return store.get("Transaction", id) as Transaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get swaps(): Array<string | null> {
    let value = this.get("swaps");
    return value.toStringArray();
  }

  set swaps(value: Array<string | null>) {
    this.set("swaps", Value.fromStringArray(value));
  }

  get mints(): Array<string | null> {
    let value = this.get("mints");
    return value.toStringArray();
  }

  set mints(value: Array<string | null>) {
    this.set("mints", Value.fromStringArray(value));
  }

  get burns(): Array<string | null> {
    let value = this.get("burns");
    return value.toStringArray();
  }

  set burns(value: Array<string | null>) {
    this.set("burns", Value.fromStringArray(value));
  }
}

export class Mint extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Mint entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Mint entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Mint", id.toString(), this);
  }

  static load(id: string): Mint | null {
    return store.get("Mint", id) as Mint | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get amount0(): BigDecimal {
    let value = this.get("amount0");
    return value.toBigDecimal();
  }

  set amount0(value: BigDecimal) {
    this.set("amount0", Value.fromBigDecimal(value));
  }

  get amount1(): BigDecimal {
    let value = this.get("amount1");
    return value.toBigDecimal();
  }

  set amount1(value: BigDecimal) {
    this.set("amount1", Value.fromBigDecimal(value));
  }

  get logIndex(): BigInt {
    let value = this.get("logIndex");
    return value.toBigInt();
  }

  set logIndex(value: BigInt) {
    this.set("logIndex", Value.fromBigInt(value));
  }

  get amountUSD(): BigDecimal {
    let value = this.get("amountUSD");
    return value.toBigDecimal();
  }

  set amountUSD(value: BigDecimal) {
    this.set("amountUSD", Value.fromBigDecimal(value));
  }
}

export class Burn extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Burn entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Burn entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Burn", id.toString(), this);
  }

  static load(id: string): Burn | null {
    return store.get("Burn", id) as Burn | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get amount0(): BigDecimal {
    let value = this.get("amount0");
    return value.toBigDecimal();
  }

  set amount0(value: BigDecimal) {
    this.set("amount0", Value.fromBigDecimal(value));
  }

  get amount1(): BigDecimal {
    let value = this.get("amount1");
    return value.toBigDecimal();
  }

  set amount1(value: BigDecimal) {
    this.set("amount1", Value.fromBigDecimal(value));
  }

  get logIndex(): BigInt {
    let value = this.get("logIndex");
    return value.toBigInt();
  }

  set logIndex(value: BigInt) {
    this.set("logIndex", Value.fromBigInt(value));
  }

  get amountUSD(): BigDecimal {
    let value = this.get("amountUSD");
    return value.toBigDecimal();
  }

  set amountUSD(value: BigDecimal) {
    this.set("amountUSD", Value.fromBigDecimal(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Swap entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Swap entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Swap", id.toString(), this);
  }

  static load(id: string): Swap | null {
    return store.get("Swap", id) as Swap | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get amount0In(): BigDecimal {
    let value = this.get("amount0In");
    return value.toBigDecimal();
  }

  set amount0In(value: BigDecimal) {
    this.set("amount0In", Value.fromBigDecimal(value));
  }

  get amount1In(): BigDecimal {
    let value = this.get("amount1In");
    return value.toBigDecimal();
  }

  set amount1In(value: BigDecimal) {
    this.set("amount1In", Value.fromBigDecimal(value));
  }

  get amount0Out(): BigDecimal {
    let value = this.get("amount0Out");
    return value.toBigDecimal();
  }

  set amount0Out(value: BigDecimal) {
    this.set("amount0Out", Value.fromBigDecimal(value));
  }

  get amount1Out(): BigDecimal {
    let value = this.get("amount1Out");
    return value.toBigDecimal();
  }

  set amount1Out(value: BigDecimal) {
    this.set("amount1Out", Value.fromBigDecimal(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get logIndex(): BigInt | null {
    let value = this.get("logIndex");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set logIndex(value: BigInt | null) {
    if (value === null) {
      this.unset("logIndex");
    } else {
      this.set("logIndex", Value.fromBigInt(value as BigInt));
    }
  }

  get amountUSD(): BigDecimal {
    let value = this.get("amountUSD");
    return value.toBigDecimal();
  }

  set amountUSD(value: BigDecimal) {
    this.set("amountUSD", Value.fromBigDecimal(value));
  }
}

export class Sync extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Sync entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Sync entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Sync", id.toString(), this);
  }

  static load(id: string): Sync | null {
    return store.get("Sync", id) as Sync | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reserve0(): BigDecimal {
    let value = this.get("reserve0");
    return value.toBigDecimal();
  }

  set reserve0(value: BigDecimal) {
    this.set("reserve0", Value.fromBigDecimal(value));
  }

  get reserve1(): BigDecimal {
    let value = this.get("reserve1");
    return value.toBigDecimal();
  }

  set reserve1(value: BigDecimal) {
    this.set("reserve1", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Pair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Pair entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Pair entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Pair", id.toString(), this);
  }

  static load(id: string): Pair | null {
    return store.get("Pair", id) as Pair | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reserve0(): BigDecimal {
    let value = this.get("reserve0");
    return value.toBigDecimal();
  }

  set reserve0(value: BigDecimal) {
    this.set("reserve0", Value.fromBigDecimal(value));
  }

  get reserve1(): BigDecimal {
    let value = this.get("reserve1");
    return value.toBigDecimal();
  }

  set reserve1(value: BigDecimal) {
    this.set("reserve1", Value.fromBigDecimal(value));
  }

  get token0Price(): BigDecimal {
    let value = this.get("token0Price");
    return value.toBigDecimal();
  }

  set token0Price(value: BigDecimal) {
    this.set("token0Price", Value.fromBigDecimal(value));
  }

  get token1Price(): BigDecimal {
    let value = this.get("token1Price");
    return value.toBigDecimal();
  }

  set token1Price(value: BigDecimal) {
    this.set("token1Price", Value.fromBigDecimal(value));
  }

  get reserveETH(): BigDecimal {
    let value = this.get("reserveETH");
    return value.toBigDecimal();
  }

  set reserveETH(value: BigDecimal) {
    this.set("reserveETH", Value.fromBigDecimal(value));
  }

  get reserveUSD(): BigDecimal {
    let value = this.get("reserveUSD");
    return value.toBigDecimal();
  }

  set reserveUSD(value: BigDecimal) {
    this.set("reserveUSD", Value.fromBigDecimal(value));
  }
}

export class HourData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save HourData entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save HourData entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("HourData", id.toString(), this);
  }

  static load(id: string): HourData | null {
    return store.get("HourData", id) as HourData | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get hour(): i32 {
    let value = this.get("hour");
    return value.toI32();
  }

  set hour(value: i32) {
    this.set("hour", Value.fromI32(value));
  }

  get reserve0(): BigDecimal {
    let value = this.get("reserve0");
    return value.toBigDecimal();
  }

  set reserve0(value: BigDecimal) {
    this.set("reserve0", Value.fromBigDecimal(value));
  }

  get reserve1(): BigDecimal {
    let value = this.get("reserve1");
    return value.toBigDecimal();
  }

  set reserve1(value: BigDecimal) {
    this.set("reserve1", Value.fromBigDecimal(value));
  }

  get token0Price(): BigDecimal {
    let value = this.get("token0Price");
    return value.toBigDecimal();
  }

  set token0Price(value: BigDecimal) {
    this.set("token0Price", Value.fromBigDecimal(value));
  }

  get token1Price(): BigDecimal {
    let value = this.get("token1Price");
    return value.toBigDecimal();
  }

  set token1Price(value: BigDecimal) {
    this.set("token1Price", Value.fromBigDecimal(value));
  }

  get reserveETH(): BigDecimal {
    let value = this.get("reserveETH");
    return value.toBigDecimal();
  }

  set reserveETH(value: BigDecimal) {
    this.set("reserveETH", Value.fromBigDecimal(value));
  }

  get reserveUSD(): BigDecimal {
    let value = this.get("reserveUSD");
    return value.toBigDecimal();
  }

  set reserveUSD(value: BigDecimal) {
    this.set("reserveUSD", Value.fromBigDecimal(value));
  }

  get hourlyTxn(): BigInt {
    let value = this.get("hourlyTxn");
    return value.toBigInt();
  }

  set hourlyTxn(value: BigInt) {
    this.set("hourlyTxn", Value.fromBigInt(value));
  }

  get hourlyVolumeToken0(): BigDecimal {
    let value = this.get("hourlyVolumeToken0");
    return value.toBigDecimal();
  }

  set hourlyVolumeToken0(value: BigDecimal) {
    this.set("hourlyVolumeToken0", Value.fromBigDecimal(value));
  }

  get hourlyVolumeToken1(): BigDecimal {
    let value = this.get("hourlyVolumeToken1");
    return value.toBigDecimal();
  }

  set hourlyVolumeToken1(value: BigDecimal) {
    this.set("hourlyVolumeToken1", Value.fromBigDecimal(value));
  }

  get hourlyVolumeUSD(): BigDecimal {
    let value = this.get("hourlyVolumeUSD");
    return value.toBigDecimal();
  }

  set hourlyVolumeUSD(value: BigDecimal) {
    this.set("hourlyVolumeUSD", Value.fromBigDecimal(value));
  }
}

export class Price extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Price entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Price entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Price", id.toString(), this);
  }

  static load(id: string): Price | null {
    return store.get("Price", id) as Price | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ethPriceUSDT(): BigDecimal {
    let value = this.get("ethPriceUSDT");
    return value.toBigDecimal();
  }

  set ethPriceUSDT(value: BigDecimal) {
    this.set("ethPriceUSDT", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
