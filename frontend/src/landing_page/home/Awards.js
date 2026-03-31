import React from 'react'

function Awards() {
    return (
         <div className='continer mt-5'>
            <div className='row'>
              <div className='col-6 p-5'>
                <img src='/media/images/largestBroker.svg'></img>
              </div>
              <div className='col-6 p-5 mt-5'>
                <h1>Largest stock broker of India</h1>
                <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                <div class="container">
                  <div class="row">
    
                   <div class="col">
                     <ul>
                      <li>Futures and Options</li>
                      <li>Commodity derivatives</li>
                      <li>Currency derivatives</li>
                   </ul>
                  </div>

                  <div class="col">
                      <ul>
                       <li>Stocks & IPOs</li>
                       <li>Direct mutual funds</li>
                       <li>Bonds and Govt. securities</li>
                      </ul>
                 </div>
                </div>
              </div>
                <img src='media/images/pressLogos.png' style={{width:"90%"}}></img>
              </div>
            </div>
         </div>
    );
}

export default Awards;