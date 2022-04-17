import { Timer } from './Timer'
import { Result } from './Result'
import { useCallback, useMemo } from 'react'

interface Letters {
  newGame: boolean,
  timer: boolean,
  result: boolean,
  fadeOut: boolean,
  resultText: string,
  arrayOfLetters: string[],
  lettersDragStartHandler: Function,
  lettersDragEndHandler: Function,
  onTimeOut: Function,
  level1: boolean,
  level2: boolean,
  level3: boolean,
  level4: boolean,
  level5: boolean,
  level6: boolean,
}

export function Letters(props: Letters) {

  const level3 = (index: number) => {
    return {
      animation: `level3 4s ease-in-out infinite ${index}s`,
    }
  }

  return (
    <div 
      className='letters'
      style={
        props.level3 ? {justifyContent: 'space-between'} : {} &&
        props.level4 ? {flexDirection: 'column', alignContent: 'space-around', gap: '50px'} : {} 
      }
    >
    <Timer 
      timer={props.timer} 
      onTimeOut={props.onTimeOut}
      level1={props.level1}
      level2={props.level2}
      level3={props.level3}
      level4={props.level4}
      level5={props.level5}
      level6={props.level6}
    />
    <Result result={props.result} fadeOut={props.fadeOut} resultText={props.resultText}/>

    {props.arrayOfLetters.map((letter: string, index: number) => {
      return (
        <div
          key={index}
          className='letter'
          style={
            props.level1 ? {animation: `level1 2s ease-in-out infinite alternate-reverse 0.${index}s`} : {} &&
            props.level2 ? {animation: `level2 7s ease-in-out infinite alternate-reverse 0.${index}s`} : {} &&
            props.level3 ? level3(index) : {} &&
            props.level4 ? {animation: `level4 3s ease-in-out infinite  0.${index}s`} : {} &&
            props.level5 ? {animation: `level5 2s ease-in-out infinite alternate-reverse 0.${index}s`} : {}
          }
          draggable={true}
          onDragStart={(event => props.lettersDragStartHandler(event, letter, index))}
          onDragEnd={(event => props.lettersDragEndHandler(event, index))} 
        >{letter}</div>  
      ) 
    })}

  </div>
  )
}