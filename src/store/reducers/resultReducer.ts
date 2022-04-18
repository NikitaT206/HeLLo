import { ResultState, ResultActions, ResultActionTypes } from '../../types/result'

const defaultState: ResultState = {
  showResult: false,
  resultText: '',
  fadeOutText: false,
}

export const resultReducer = (state = defaultState, action: ResultActions): ResultState => {
  switch(action.type) {
    case ResultActionTypes.SET_FADEOUT_TEXT:
      return {...state, fadeOutText: action.payload}
    case ResultActionTypes.SET_RESULT_TEXT:
      return {...state, resultText: action.payload}
    case ResultActionTypes.SHOW_RESULT:
      return {...state, showResult: action.payload}
    default:
      return state
  }
}