interface ResultState {
  showResult: boolean,
  resultText: string,
  fadeOutText: boolean,
}

enum ResultActionTypes {
  SHOW_RESULT = 'SHOW_RESULT',
  SET_RESULT_TEXT = 'SET_RESULT_TEXT',
  SET_FADEOUT_TEXT = 'SET_FADEOUT_TEXT'
}

interface ResultShowResultAction {
  type: ResultActionTypes.SHOW_RESULT,
  payload: boolean
}

interface ResultSetResultTextAction {
  type: ResultActionTypes.SET_RESULT_TEXT,
  payload: string
}

interface ResultSetFadeoutTextAction {
  type: ResultActionTypes.SET_FADEOUT_TEXT,
  payload: boolean
}

type ResultActions = ResultShowResultAction | ResultSetResultTextAction | ResultSetFadeoutTextAction

export { ResultActionTypes }
export type { ResultState, ResultActions }
