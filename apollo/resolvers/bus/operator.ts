import { getOperator } from '../../services'

export const operator = async (_parent: undefined, _args: { city: string, operatorID: string }) => {
  const { city, operatorID } = _args
  const resp = (await getOperator({
    city,
    filter: `OperatorID eq '${operatorID}'`
  })).data

  return resp
}
