import { useState } from 'react'
import './styles/App.css'

function App() {
 

  return (
    <>
      <h1 id='app-title'>Foreign Currency Converter</h1>
      <span id='app-tagline'>Convert your foreign currencies here!</span>
      
      <div id='conversion-window'>
       <span>choose your currencies to begin conversion</span>

         <div>

          <label htmlFor='source-currency'>From:</label>
            <select id='source-currency'>
              <option>---SELECT---</option>
              <option value='US'>US</option>
              <option value='UK'>UK</option>
              <option value='Canada'>Canadian</option>
              <option value='China'>China</option>
              <option value='Russia'>Russia</option>
            </select>

            <input className='currency-inputs' placeholder='Enter an amount here'/>
        
           </div>

           <div className='reversible-arrow-container'>

            <img id='reversible-arrow' alt='click here swap your currencies' src=''/>

           </div>

          <div>
            <label htmlFor='destination-currency'>To:</label>
              <select id='destination-currency'>
                <option>---SELECT---</option>
                <option value='US'>US</option>
                <option value='UK'>UK</option>
                <option value='Canada'>Canadian</option>
                <option value='China'>China</option>
                <option value='Russia'>Russia</option>
              </select>

              <input className='currency-inputs' placeholder='Enter an amount here'/>
            
          </div>
      
      </div>
    </>
  )
}

export default App
