import bedRoom from '../assets/WhatsApp Image 2024-09-14 at 10.22.58.jpeg'
import livinRoom from '../assets/WhatsApp Image 2024-09-14 at 10.23.27.jpeg'
import swimmingPool from '../assets/WhatsApp Image 2024-09-14 at 10.23.41.jpeg'

function WelcomeGrid() {
  return (
    <>
        <div className='row fSection'>
            <div className='col-md-4 w-grid '>
                <div className='living'>
                    <div className='w-backdrop'>
                    <h3 className='heading'>living room</h3>
                    <p>enjoy super comfy living rooms</p>
                    </div>

                </div>
            </div>
            <div className='col-md-4 w-grid '>
                <div className='bed'>
                    <div className='w-backdrop'>
                        <h3 className='heading'>bed room</h3>
                        <p>home away from home experience</p>
                    </div>

                </div>
            </div>
            <div className='col-md-4 w-grid '>
                <div className='swimming' >
                    <div className='w-backdrop'>
                    <h3 className='heading'>swimming pool</h3>
                    <p>have exciting relaxation with us</p>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default WelcomeGrid
