import React from 'react'
import { RoomGrid } from './RoomGrid'
import { UseContextData } from '../ContextFolder/UseContextData';
function Similar() {
  const {state} = UseContextData();
  const shuffleArray = (array:any) => {
    const shuffledArray = [...array]; // Create a copy to avoid mutating the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0,2);
  };
  
  let randomArray = state?.data && shuffleArray(state.data);

  return (
    <>
    <h1 className='heading'>Similar Rooms</h1>
      <div className="row">
      {
        randomArray && randomArray.map(items=>(
          <RoomGrid key={items.id} items={items} />
        ))
      }
      </div>
      
    </>
  )
}

export default Similar
