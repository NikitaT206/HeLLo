import { Dispatch } from 'redux';
import { TimerActions, TimerActionTypes } from '../../types/timer';

export function setStartTimer(state: boolean) {
  return (dispatch: Dispatch<TimerActions>) => {
    dispatch({type: TimerActionTypes.START_TIMER, payload: state})
  }
}

export function setTime(state: number) {
  return (dispatch: Dispatch<TimerActions>) => {
    dispatch({type: TimerActionTypes.SET_TIME, payload: state})
  }
}

export function timerRunning() {
  return (dispatch: Dispatch<TimerActions>) => {
    dispatch({type: TimerActionTypes.RUNNING})
  }
}

export function timeOut() {
  return (dispatch: Dispatch<TimerActions>) => {
    dispatch({type: TimerActionTypes.SET_TIMEOUT})
  }
}

