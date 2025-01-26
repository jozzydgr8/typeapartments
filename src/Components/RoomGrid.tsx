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

        <Link key={items.id} className='r-grid col-md-4' to={`/${items.id}`} >
            <div>
                <div className="two" style={{backgroundImage:`url(${url})`}}>

                </div>
                <main>
                    <h2 className='heading'>{items.apartment}</h2>
                    <p>{items.overview}</p>
                    <div>
                        <a>BOOK NOW FROM {items.daily} Naira</a>
                    </div>
                </main>
            </div>
        </Link>
                
            
        </>
        // <div className="  row">
        //     <div className="r-grid col-md-4">
        //         <div>
        //             <div className="two">

        //             </div>
        //             <main>
        //                 <h2 className="heading">
        //                     Two bedroom apartment
        //                 </h2>
        //                 <p>
        //                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        //                     Sit inventore placeat expedita labore facere ut.
        //                 </p>
        //                 <div>
        //                     <a href="#">BOOK NOW FROM 180,000 Naira </a>
        //                 </div>
        //             </main>
        //         </div>
        //     </div>
        //     <div className="r-grid col-md-4">
        //         <div>
                    
        //                 <div className="one">

        //                 </div>
        //                 <main>
        //                 <h2 className="heading">
        //                     One bedroom apartment
        //                 </h2>
        //                 <p>
        //                     Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        //                     Nesciunt, quisquam enim eaque quaerat velit blanditiis?
        //                 </p>
        //                 <div>
        //                     <a href="#">BOOK NOW FROM 100,000 Naira </a>
        //                 </div>
        //                 </main>
                    
        //         </div>
        //     </div>
        //     <div className="r-grid col-md-4">
        //         <div>
        //         <div className="three">

        //         </div>
        //         <main>
        //         <h2 className="heading">
        //             Three bedroom apartment
        //         </h2>
        //         <p>
        //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //             Quis dicta dolorem at labore cumque quibusdam!
        //         </p>
        //         <div>
        //             <a href="#">BOOK NOW FROM 300,000 Naira </a>
        //         </div>
        //         </main>
        //         </div>
        //     </div>
        // </div>
    )
}