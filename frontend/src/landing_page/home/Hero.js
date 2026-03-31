import React from 'react'

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center' >
                    <img src='media/images/Homehero.png' alt='Hero image' className='mb-5' />
                    <h1 className='mt-5'>Invest in Everything</h1>
                    <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                    <button className='p-2 btn btn-primary fs-5'  style={{width:"20%", margin:"0 auto"}}>SignUp</button>
            </div>
        </div>
    );
}

export default Hero;