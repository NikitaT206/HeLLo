import { TimerState, TimerActions, TimerActionTypes } from '../../types/timer'

const defaultState: TimerState = {
  startTimer: false,
  time: 10,
  timeOut: false
}

export const timerReducer = (state = defaultState, action: TimerActions): TimerState => {
  switch(action.type) {
    case TimerActionTypes.SET_TIMEOUT:
      return {time: 0, timeOut: true, startTimer: false}
    case TimerActionTypes.RUNNING:
      return {...state, time: state.time - 1}
    case TimerActionTypes.SET_TIME:
      return {...state, time: action.payload}
    case TimerActionTypes.START_TIMER:
      return {...state, startTimer: action.payload, timeOut: false}
    default:
      return state
  }
}