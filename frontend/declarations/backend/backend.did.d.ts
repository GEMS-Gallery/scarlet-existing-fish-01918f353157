import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getArticles' : ActorMethod<[], Array<[string, string, [] | [bigint]]>>,
  'getDogecoinInfo' : ActorMethod<[], string>,
  'getDogecoinPriceHistory' : ActorMethod<[], Array<[bigint, number]>>,
  'getFAQs' : ActorMethod<[], Array<[string, string]>>,
  'getRandomMemes' : ActorMethod<[bigint], Array<string>>,
  'updatePrice' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
