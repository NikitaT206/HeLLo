interface DropZone {
  startGame: boolean
  newGame: boolean,
  dropArray: string[],
  dropZoneDragLeaveHandler: Function,
  dropZoneDragOverHandler: Function,
  dropZoneDropHandler: Function
}

export function DropZone(props: DropZone) {
  return (

    <div 
      className={props.newGame ? 'drop-zone drop-zone_active' : 'drop-zone'}
      onDragLeave={(event => props.dropZoneDragLeaveHandler(event))}
      onDragOver={(event => props.dropZoneDragOverHandler(event))}
      onDrop={(event => props.dropZoneDropHandler(event))}
    >
      <div className={props.newGame ? 'drop-letters drop-letters_active' : 'drop-letters'}>
        {props.dropArray.length 
          ? props.dropArray.map((item: string, index: number) => {
              return <div className='drop-letter' key={index}>{item}</div>
            })
          : <div className={props.newGame ? 'drop-here drop-here_active' : 'drop-here'}>{props.startGame ? 'Drag Here' : ''}</div>
        }
      </div>
     

    </div>

  )
}