import { Link } from "react-router-dom"

export const Footer = ()=>{
    return(
        <section className="footer">
            <div className="container-fluid " style={{backdropFilter:'brightness(30%) contrast(120%)'}}>
                <div className="row aSection">
                    <div className="col-md-4">
                        <div>
                            <h1 className="heading">About Mag's Resident</h1>
                            <p>
                            We provide exclusive and affordable one-bedroom 
                            to four-bedroom apartments designed to meet the 
                            needs of our distinguished clients within Africa and the world at large.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                       <div>
                        <h1 className="heading">
                            Contact Details
                        </h1>
                        <p>
                            Address: No.172B Niyi street, Osubi Warri, Delta State.
                            <br/>
                            <br/>
                            Phone No: +234 811 365 7622
                            <br/>
                            <br />
                            Email: <a href="mailto:magsresidence@gmail.com">magsresidence@gmail.com</a>
                        </p>
                       </div>
                    </div>
                    <div className="col-md-4">
                    <div>
                        <h1 className="heading">
                            Quick links
                        </h1>
                        <p>
                            <Link to="https://wa.link/b8xq56">Reach Out</Link>
                            <hr />
                            <Link to="/apartments">Our Apartments</Link>
                            <hr />
                            <Link to="/">privacy policy</Link>
                        </p>
                       </div>
                    </div>
                </div>
            </div>
        </section>
    )
}