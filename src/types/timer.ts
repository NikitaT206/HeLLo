interface TimerState {
  startTimer: boolean,
  time: number,
  timeOut: boolean,
}

enum TimerActionTypes {
  START_TIMER = 'START_TIMER',
  SET_TIME = 'SET_TIME',
  RUNNING = 'RUNNING',
  SET_TIMEOUT = 'SET_TIMEOUT',
}

interface TimerSetTimeOutAction {
  type: TimerActionTypes.SET_TIMEOUT
}

interface TimerRunningAction {
  type: TimerActionTypes.RUNNING,
}

interface TimerStartTimerAction {
  type: TimerActionTypes.START_TIMER,
  payload: boolean,
}

interface TimerSetTimeAction {
  type: TimerActionTypes.SET_TIME,
  payload: number,
}

type TimerActions = TimerStartTimerAction | TimerSetTimeAction | TimerRunningAction | TimerSetTimeOutAction

export { TimerActionTypes }
export type { TimerState, TimerActions }
