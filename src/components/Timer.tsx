import { useContext, useEffect, useState } from 'react'

interface TimerInterface {
  timer: boolean,
  onTimeOut: Function,
  level1: boolean,
  level2: boolean,
  level3: boolean,
  level4: boolean,
  level5: boolean,
  level6: boolean,
}

export function Timer(props: TimerInterface) {
  const [time, setTime] = useState<number | null>(10)
  const [seconds, setSeconds] = useState<number | null>(time)

  useEffect(() => {
    if (props.level1) setTime(6)
    if (props.level2) setTime(7)
    if (props.level3) setTime(8)
    if (props.level4) setTime(9)
    if (props.level5) setTime(10)
    if (props.level6) setTime(11)
  }, [props])

  useEffect(() => {
    let interval: any = null
    
    if (props.timer) {
      interval = setInterval(() => {
        setSeconds((state: any) => {          
          if (state <= 0) {
            clearInterval(interval)
            props.onTimeOut()
            return state = 0
          }
          return state - 1
        })        
      }, 1000)
    } 

    else {
      setSeconds(time)
    }

    return () => clearInterval(interval)

  }, [props.timer])


  if (!props.timer) {
    return <div></div>
  }

  return (
    <div className='timer'>
      <div className='timer__text'>{`${seconds}`}</div>
    </div>
  )
}