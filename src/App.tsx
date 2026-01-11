import { useState,useEffect,useRef, use } from 'react'
import './styles/App.css'




 function App() {

const [baseCurrency,setBaseCurrency]=useState('');
const [destCurrency,setDestCurrency]=useState('');
const [baseCurrencyValue,setBaseCurrencyValue]=useState(null);
const [destCurrencyValue,setDestCurrencyValue]=useState(null);
const [rates,setRates]=useState(null);

 useEffect(()=>{
        
        fetchCurrencyAPI(apiURL,baseCurrency)
      
      },[baseCurrency])
    


const handleSrcCurrencyChange=(e)=>{
    if(e.target.value===''){
      return
    }else{
      setBaseCurrency(e.target.value)
      console.log(rates)
    }  
     
}

const handleDestCurrencyChange=(e)=>{
    if(e.target.value===''){
      return
    }else{
      
      
  }
}

let apiURL='https://api.frankfurter.dev/v1/latest'

const fetchCurrencyAPI= async (url:string,src_currency?:string)=>{
  
  
  
  src_currency? url=url+`?base=${src_currency}`:src_currency;  
  const response=await fetch(url);  
  try{ 
      if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }else{
                      
                response.json().then(data=>{
                    setRates(data.rates)
                        })
                }

    }catch(error){
                  console.error(error)
    }           

  }
 
  return (
    <div id='app'>
      <h1 id='app-title'>Foreign Currency Converter</h1>
      <span id='app-tagline'>Convert your foreign currencies here!</span>
      
      <div id='conversion-window'>

       

        

         <div className='currency-input-container'>

          <label htmlFor='source-currency'>
            <strong>From: </strong>
          </label>

         

            <select onChange={handleSrcCurrencyChange}  id='source-currency'>
              <option value=''>---SELECT---</option>
              <option value='USD'>US</option>
              <option value='GBP'>British</option>
              <option value='CAD'>Canadian</option>
              <option value='CNY'>Chinese</option>
              
            </select>

            

            <input 
              
              value={baseCurrencyValue}
              className='currency-inputs' 
              type='text' 
              placeholder=' $ 0.00'
            />
        
           </div>

           

            <img id='reversible-arrow-img'  alt='click here swap your currencies'  src='public/images/reversible-arrow.svg'/> 

          
          
          
          
          <div className='currency-input-container'>

            <label htmlFor='destination-currency'>
               <strong>To: </strong>
            </label>

              <select onChange={handleDestCurrencyChange} id='destination-currency'>
                <option>---SELECT---</option>
              <option value='USD'>US</option>
              <option value='GBP'>British</option>
              <option value='CAD'>Canadian</option>
              <option value='CNY'>Chinese</option>
              </select>

              

              <input 
                className='currency-inputs' 
                type='text' 
                placeholder='$ 0.00'
                value={destCurrencyValue}

              />
            
          </div>
      </div>
    </div>
  )
}

export default App
