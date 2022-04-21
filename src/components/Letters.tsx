import { Timer } from './Timer'
import { Result } from './Result'
import { useCallback, useEffect, useMemo } from 'react'

interface Letters {
  newGame: boolean,
  arrayOfLetters: string[],
  lettersDragStartHandler: Function,
  lettersDragEndHandler: Function,
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

  const getRandom = useCallback((min, max) => {
    const random = Math.floor(Math.random() * (max - min) + min)
    return random
  }, [])

  return (
    <div 
      className='letters'
      style={
        props.level3 ? {justifyContent: 'space-between'} : {} &&
        props.level4 ? {flexDirection: 'column', alignContent: 'space-around', gap: '50px'} : {}
      }
    >
    <Timer 
      level1={props.level1}
      level2={props.level2}
      level3={props.level3}
      level4={props.level4}
      level5={props.level5}
      level6={props.level6}
    />
    <Result/>

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
            props.level5 ? {
             
              
            }
               : {}
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