import { CalculateRequest, CalculateResponse } from 'pages/api/calculate';
import { apiConnection } from 'infrastructure/api/ApiConnector';

/**
 * 期待値計算結果取得
 * @param req
 */
export const fetchCalculateResult = async (req: CalculateRequest) => {
  console.log(req);
  const resp = await apiConnection.post<CalculateResponse>(
    `/api/calculate/`,
    req
  );
  return resp.data;
};
