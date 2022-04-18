import { Dispatch } from 'redux'
import { ResultActions, ResultActionTypes } from '../../types/result'

export function showResult(state: boolean) {
  return (dispatch: Dispatch<ResultActions>) => {
    dispatch({type: ResultActionTypes.SHOW_RESULT, payload: state})
  }
}

export function setFadeOutText(state: boolean) {
  return (dispatch: Dispatch<ResultActions>) => {
    dispatch({type: ResultActionTypes.SET_FADEOUT_TEXT, payload: state})
  }
}

export function setResultText(state: string) {
  return (dispatch: Dispatch<ResultActions>) => {
    dispatch({type: ResultActionTypes.SET_RESULT_TEXT, payload: state})
  }
}