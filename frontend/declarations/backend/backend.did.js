export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getArticles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text, IDL.Opt(IDL.Int)))],
        ['query'],
      ),
    'getDogecoinInfo' : IDL.Func([], [IDL.Text], ['query']),
    'getDogecoinPriceHistory' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Int, IDL.Float64))],
        ['query'],
      ),
    'getRandomMemes' : IDL.Func([IDL.Nat], [IDL.Vec(IDL.Text)], ['query']),
    'updatePrice' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
