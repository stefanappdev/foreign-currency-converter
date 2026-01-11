import { useState,useEffect,useRef, use } from 'react'
import './styles/App.css'




 function App() {

const [baseCurrency,setBaseCurrency]=useState('');
const [destCurrency,setDestCurrency]=useState('');
const baseCurrInputRef=useRef(null);
const destCurrInputRef=useRef(null);
const destCurrRef=useRef(null)
const baseCurrRef=useRef(null)
const [baseCurrencyActive,isbaseCurrencyActive]=useState(false);
const [currencyRateActive,isCurrencyRateActive]=useState(false)
const currencyRates=useRef(null);

 useEffect(()=>{
        
        fetchCurrencyAPI(apiURL,baseCurrency)
       
      
      },[baseCurrency]
    )
    
 

const handleSrcCurrencyChange=(e)=>{
    if(e.target.value!==''){
      setBaseCurrency(e.target.value)
      baseCurrRef.current=e.target.value;
      isbaseCurrencyActive(true);
      isCurrencyRateActive(true);
      console.log(baseCurrRef.current)
     
    }else{
      isbaseCurrencyActive(false);
      isCurrencyRateActive(false);
    }
  }

const handleDestCurrencyChange=(e)=>{
    if(e.target.value!==''){
       console.log(currencyRates)
       let key=e.target.value;


       if(currencyRates.current){
        let value=currencyRates.current[key];

              if(currencyRates.current[key]!==''){
                setDestCurrency(key)
                destCurrRef.current={desination_currency:key,value:value};
                console.log(destCurrRef.current)
              }


       }
       
    
    }
}


const handleSrcCurrencyInputChange=(e)=>{
  

}


const handleDestCurrencyInputChange=(e)=>{
  

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
                    currencyRates.current=data.rates
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

       

        

         <div id='src-currency-container' className='currency-input-container'>

          <label htmlFor='source-currency'>
            <strong>From: </strong>
          </label>

         

            <select  onChange={handleSrcCurrencyChange}  id='source-currency'>
              <option value=''>---SELECT---</option>
              <option value='USD'>US(USD)</option>
              <option value='GBP'>British(GBP)</option>
              <option value='CAD'>Canadian(CAD)</option>
              <option value='CNY'>Chinese(CNY)</option>
              
            </select>

            

            <input 
              
              ref={baseCurrInputRef}
              className='currency-inputs' 
              type='text' 
              placeholder=' $ 0.00'
              onChange={handleSrcCurrencyInputChange}
            />
        
           </div>

           

          {baseCurrencyActive&&currencyRateActive?<img 
            id='reversible-arrow-img'  
            alt='click here swap your currencies'  
            src='public/images/reversible-arrow.svg'
            />:''}

          
          
          
          
          {baseCurrencyActive&&currencyRateActive?<div id='dest-currency-container' className='currency-input-container'>

            <label htmlFor='destination-currency'>
               <strong>To: </strong>
            </label>

              <select onChange={handleDestCurrencyChange} id='destination-currency'>
                <option>---SELECT---</option>
              <option value='USD'>US(USD)</option>
              <option value='GBP'>British(GBP)</option>
              <option value='CAD'>Canadian(CAD)</option>
              <option value='CNY'>Chinese(CNY)</option>
              </select>

              

              <input 
                className='currency-inputs' 
                type='text' 
                placeholder='$ 0.00'
                ref={destCurrInputRef}
                onChange={handleDestCurrencyInputChange}
              />
            
          </div>:""}



      </div>
    </div>
  )
}

export default App
