import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { contextType } from "./Types/Types";
import { UseContextData } from "./ContextFolder/UseContextData";
import Similar from "./Components/Similar";
import { BookForm } from "./Components/BookForm";

export const IDLayout = ()=>{
    const{id} = useParams();
    const {state} = UseContextData();
    const [mapData, setMapData] = useState({}as contextType);
    const [activeIndex, setActiveIndex] = useState(0);
    const[checkIn, setCheckIn] =useState <string | any>('');
    const [checkOut, setCheckOut] = useState<string | any>('');
    const [guest, setGuest] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const data = state?.data && state.data.find(item => item.id === id);
        if(data){
            setMapData(data)
        }

    },[id, state?.data]);
    //map url to get images
    const url = mapData?.fileUrls&&mapData.fileUrls.map(item=>item.url)
    const headStyle = {
        backgroundImage:`url(${url})`
    }
    
    //logic function cor form
    const calculateNights = (checkIn: string | Date, checkOut: string | Date): number => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            // Ensure the dates are valid
            if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
                return 0; // Return 0 if either date is invalid
            }
    
            const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
            return nights > 0 ? nights : 0; // Return 0 if checkOut is earlier than checkIn
        }
        return 0; // Return 0 if checkIn or checkOut is not provided
    };
    
    const nights = calculateNights(checkIn, checkOut);

    const statePassed = {
        checkIn:checkIn.$d,
        checkOut:checkOut.$d,
        nights:nights
    }

    //handleSubmit
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        navigate(`/checkOut/${mapData.id}`,{state:statePassed})
        
    }


    //carousel functioms
    
    const handleIndicatorClick = (index:any) => {
        setActiveIndex(index);
    };
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === mapData?.fileUrls.length - 1 ? 0 : prevIndex + 1));
    };
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? mapData?.fileUrls.length - 1 : prevIndex - 1));
    };

    return(
        <section>
            <div className='IdBackground' style={{ backgroundImage: `url(${url})` }}>
                <div className="IdHeader">
                    <h2 className='heading'>{mapData?.daily}</h2>
                    <div><span> NAIRA <br /> / PER NIGHT</span></div>
                </div>
            </div>

            <div className="container-fluid">
                <h1 className='heading'>{mapData?.title}</h1>
                <div className="row">
                    <div className='col-md-8'>

{/* 
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                        carousel carouselcarousel carouselcarousel carousel carousel carousel carousel carousel */}

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {mapData?.fileUrls&&mapData.fileUrls.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleIndicatorClick(index)}
                        className={activeIndex === index ? 'active' : ''}
                        aria-current={activeIndex === index ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {mapData?.fileUrls&&mapData.fileUrls.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${item.url})`,
                            height: '400px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    ></div>
                ))}
            </div>
            {/* Bootstrap Controls */}
            <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        
{/* 
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                    carousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carouselcarousel carousel
                        carousel carouselcarousel carouselcarousel carousel carousel carousel carousel carousel */}

                        <hr />
                        <p>{mapData.overview}</p>
                        <hr />
                        <div>
                            <h1 className='heading'>Room Services</h1>
                            <div className="row">
                                <div className="col-md-4">Bedroom Apartment</div>
                                <div className="col-md-4">Unlimited internet</div>
                                <div className="col-md-4">Satellite TV and Subscriptions</div>
                                <div className="col-md-4">Laundry</div>
                                <div className="col-md-4">Full-time onsite on-demand staff</div>
                                <div className="col-md-4">Security</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='IdBooking'>
                        <BookForm id={mapData.id}
                        nights={nights}
                         checkOut={checkOut}
                         checkIn={checkIn}
                         setOut={setCheckOut}
                         setIn={setCheckIn}
                         setGuest={setGuest}
                         guest={guest}
                         handleSubmit={handleSubmit}
                         />

                        </div>
                    </div>
                </div>
                <hr />
                <Similar />
            </div>
        </section>
    )
}