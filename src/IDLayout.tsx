import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { contextType } from "./Types/Types";
import { UseContextData } from "./ContextFolder/UseContextData";
import Similar from "./Components/Similar";
import { Dayjs } from "dayjs";
import { BookingApp } from "./hooks/BookingFunc";

export const IDLayout = ()=>{
    const{id} = useParams();
    const {state} = UseContextData();
    const [mapData, setMapData] = useState({}as contextType);
    const [activeIndex, setActiveIndex] = useState(0);
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
    const [proceedToCheckout, setProceedToCheckout] = useState(false);

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

    

    const statePassed = {
        checkIn:checkIn,
        checkOut:checkOut,
    }

   

    //handleSubmit
    const handleProceedToCheckout = async ()=>{
    
        
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
                <div className="row layoutbook">
                    <div className='col-md-6'>

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
                            width:'100%',
                            height: '400px',
                            backgroundSize: 'contain',
                            backgroundRepeat:'no-repeat',
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
                        
                    </div>


                        <div className="col-md-6 overview-grid">
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



                    {/* calendar calendar calendar */}
{/* calendar calendar calendar */}
                    {/* calendar calendar calendar */}
                    {/* calendar calendar calendar */}
                    {/* calendar calendar calendar */}
                    
            </div>
            <div className="col-md-12">
                    <br/>
                    <div style={{textAlign:'center'}}>
                    <h2>Book Now</h2>
                    <small> Select day and start booking now</small>
                    </div>
                    <BookingApp
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        checkOut={checkOut}
                        setCheckOut={setCheckOut}
                        setProceedToCheckout={setProceedToCheckout}
                        />
                        {proceedToCheckout && <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>}
                    
                    </div>
                <Similar />
            </div>
        </section>
    )
}