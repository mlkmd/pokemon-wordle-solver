// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import { getTargetPokemonList } from 'domain/model/Pokemon';
import { PokemonName } from 'domain/value/PokemonName';
import { SolveResult } from 'application/query/model/SolveResult';
import { Generation } from 'domain/value/Generation';
import { calcAllExpectValues } from 'application/service/SolveService';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';

export type CalculateRequest = {
  generations: Generation[];
  usedNames: PokemonName[];
  results: SolveResult[];
};
export type CalculateResponse = {
  expectValues: ExpectValueResult[];
};

const calculate: NextApiHandler<CalculateResponse> = (req, res) => {
  const { generations, usedNames, results } = req.body as CalculateRequest;
  const list = getTargetPokemonList({ generations });
  const expectValues = calcAllExpectValues(list, usedNames, results).slice(
    0,
    50
  );
  res.status(200).json({ expectValues });
};
export default calculate;
