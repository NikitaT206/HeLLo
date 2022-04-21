import { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface TimerInterface {
  level1: boolean,
  level2: boolean,
  level3: boolean,
  level4: boolean,
  level5: boolean,
  level6: boolean,
}

export function Timer(props: TimerInterface) {
  const {time, startTimer} = useTypedSelector(state => state.timer)
  const {setTime, setStartTimer, timerRunning, timeOut} = useActions()

  useEffect(() => {
    if (props.level1) setTime(6)
    if (props.level2) setTime(7)
    if (props.level3) setTime(8)
    if (props.level4) setTime(9)
    if (props.level5) setTime(10)
    if (props.level6) setTime(11)
  }, [props.level1, props.level2, props.level3, props.level4, props.level5, props.level6])

  useEffect(() => {
    let interval: any = null
    clearInterval(interval)
    if (startTimer) {
      interval = setInterval(() => {
        timerRunning()
        if (time <= 0) {
          clearInterval(interval)
          timeOut()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [startTimer, time])

  if (!startTimer) {
    return <div></div>
  }

  return (
    <div className='timer'>
      <div className='timer__text'>{`${time}`}</div>
    </div>
  )
}