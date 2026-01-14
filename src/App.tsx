import { useState,useEffect,useRef, use } from 'react'
import './styles/App.css'




 function App() {

const [baseCurrency,setBaseCurrency]=useState('');
const [destCurrency,setDestCurrency]=useState('')
let apiURL='https://api.frankfurter.dev/v1/latest'
const calcbtnRef=useRef(null)
const baseCurrencyInputRef=useRef(null)
const [baseCurrAmt,setbaseCurrAmt]=useState();
const[destCurrAmt,setdestCurrAmt]=useState();
const destCurrRef=useRef(null)
const baseCurrRef=useRef(null)
const currencyRates=useRef(null);
const baseCurrencySelectBoxRef=useRef(null);
const destCurrencySelectBoxRef=useRef(null);
const [showResult,setShowResult]=useState(false);






const fetchCurrencyAPI= async (url:string,src_currency?:string)=>{
  //fetch data from opensource foreign currency API 
  
  
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

    }catch(err){
                  throw new Error(err.toString())
    }           

  }




const handleSrcCurrencyChange=(e):void=>{

  /*handles select/dropdown for source(base) currency if 
  it has a option with a value and sets it as the source currency
  as well as storing the exchange rates relative to that source currency
    */
    if(e.target.value!==''){
      let regExp=/a-zA-Z/;

      if (!regExp.test(e.target.value)){
         setBaseCurrency(e.target.value)
         baseCurrRef.current=e.target.value;
    
      }else{return}
     
     
    }else{
      

      setbaseCurrAmt(0)
      setdestCurrAmt(0)
      setDestCurrency('')
      setBaseCurrency("")
    }
  }

const handleDestCurrencyChange=(e):void=>{

   /*handles select/dropdown for destination currency if 
  it has a option with a value,sets it as the destination currency
  and retrives its exchange rate relative to the source currency
    */
    if(e.target.value!==''){
       
       let key:string=e.target.value;


       if(currencyRates.current){
        let value:number=currencyRates.current[key];

              if(currencyRates.current[key]!==''){
                setDestCurrency(key)
                destCurrRef.current={desination_currency:key,currency_value:value};
                setdestCurrAmt(destCurrRef.current.currency_value*baseCurrAmt)
              }


       }
       
    
    }
}


const calculateCurrencyValues=():void=>{
      ///compare flat rates of base and destinataion currency 
      if(baseCurrAmt>0){

      
      let rate_dest:number=destCurrRef.current.currency_value;
      let total_dest_amt:number=(rate_dest*baseCurrAmt);
      setdestCurrAmt(total_dest_amt)
      calcbtnRef.current.disabled=true;
      baseCurrencyInputRef.current.disabled=true;
      baseCurrencySelectBoxRef.current.disabled=true;
      destCurrencySelectBoxRef.current.disabled=true;
      setShowResult(true)
      }else{
        return
      }

}

const clear=():void=>{
  setbaseCurrAmt()
  setdestCurrAmt()
  calcbtnRef.current.disabled=false;
  baseCurrencyInputRef.current.disabled=false;
  baseCurrencyInputRef.current.value='';
  baseCurrencySelectBoxRef.current.disabled=false;
  destCurrencySelectBoxRef.current.disabled=false;
  setShowResult(false)
}




const handleSrcCurrencyInputChange=(event)=>{
  if(event.target.value>=0 && destCurrRef.current.desination_currency!==""){
    setbaseCurrAmt(event.target.value)

  }else{
    return
  }
  

}






 useEffect(()=>{
        
        fetchCurrencyAPI(apiURL,baseCurrency)
        
      
      },[baseCurrency]

    )
    
 





 
  return (
    <div id='app'>
      <h1 id='app-title'>Foreign Currency Converter</h1>
      <span id='app-tagline'>FX conversion in a flash!</span>



      <img alt='app-logo' id='app-logo' src='/images/piggybank.svg'></img>
      
      <div id='conversion-window'>

       

        

         <div id='src-currency-container' className='currency-input-container'>

          <label htmlFor='source-currency'>
            <strong>From: </strong>
          </label>

         

            <select  onChange={handleSrcCurrencyChange} ref={baseCurrencySelectBoxRef} id='source-currency'>
              <option value=''>---SELECT---</option>
              <option value='USD'>US(USD)</option>
              <option value='GBP'>British(GBP)</option>
              <option value='CAD'>Canadian(CAD)</option>
              <option value='CNY'>Chinese(CNY)</option>
              
            </select>

            

            {baseCurrency&&destCurrency?
            <>
  
              <input 
              ref={baseCurrencyInputRef}
              value={baseCurrAmt}
              className='currency-inputs' 
              type='text'
              placeholder='Enter amount to convert'
              id='baseCurrencyAmt'
              onChange={handleSrcCurrencyInputChange}
            />
            
            
            </>:''}
        
           </div>


          
          
          
          
          {baseCurrency?<div id='dest-currency-container' className='currency-input-container'>

            <label htmlFor='destination-currency'>
               <strong>To: </strong>
            </label>
              <select onChange={handleDestCurrencyChange} ref={destCurrencySelectBoxRef} id='destination-currency-selectbox'>
              <option value=''> ---SELECT--- </option>
              {baseCurrRef.current==='USD'?'':<option value='USD'>US(USD)</option>}
              {baseCurrRef.current==='GBP'?'': <option value='GBP'>British(GBP)</option>}
              {baseCurrRef.current==='CAD'?'':<option value='CAD'>Canadian(CAD)</option>}
              {baseCurrRef.current==='CNY'?'':<option value='CNY'>Chinese(CNY)</option>}
              </select>            
          </div>:""}
            
            <footer id='footer'>
              <br/>


               {showResult?<div id='dest-currency-total'>
                  <strong>{baseCurrAmt+' '+baseCurrency+'='+destCurrAmt+' '+destCurrency }</strong>
                </div>:""}


                <div id='btns-container'>

                    {baseCurrency&&destCurrency?<button id='calcBtn' ref={calcbtnRef} className='buttons' onClick={calculateCurrencyValues}>Calculate</button>:""}
                    {baseCurrency&&destCurrency?<button id='clearBtn' className='buttons' onClick={clear}>Clear</button>:''}
                </div>

            </footer>
          
      </div>
    </div>
  )
}

export default App
