import { Link } from 'react-router-dom';
import { contextType } from '../Types/Types';

type ItemProps = {
    items:contextType
}

export const RoomGrid = ({items}:ItemProps)=>{
    const url =
    items.fileUrls && items.fileUrls.map((img)=>(
    img.url
))
    return(
        <>

        <div key={items.id} className='r-grid col-md-4' >
            <div>
                <div className="two" style={{backgroundImage:`url(${url})`}}>

                </div>
                <main>
                    <h2 className='heading'>{items.title} hello</h2>
                    <p>{items.overview}</p>
                    <Link to={`/${items.id}`} className='link'>
                        <>BOOK NOW FROM {items.daily} Naira</>
                    </Link>
                </main>
            </div>
        </div>
                
            
        </>
    )
}