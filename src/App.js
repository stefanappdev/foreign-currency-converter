import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, use } from 'react';
import './styles/App.css';
function App() {
    const [baseCurrency, setBaseCurrency] = useState('');
    const [destCurrency, setDestCurrency] = useState('');
    let apiURL = 'https://api.frankfurter.dev/v1/latest';
    const calcbtnRef = useRef(null);
    const baseCurrencyInputRef = useRef(null);
    const [baseCurrAmt, setbaseCurrAmt] = useState();
    const [destCurrAmt, setdestCurrAmt] = useState();
    const destCurrRef = useRef(null);
    const baseCurrRef = useRef(null);
    const currencyRates = useRef(null);
    const baseCurrencySelectBoxRef = useRef(null);
    const destCurrencySelectBoxRef = useRef(null);
    const [showResult, setShowResult] = useState(false);
    const fetchCurrencyAPI = async (url, src_currency) => {
        //fetch data from opensource foreign currency API 
        src_currency ? url = url + `?base=${src_currency}` : src_currency;
        const response = await fetch(url);
        try {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            else {
                response.json().then(data => {
                    currencyRates.current = data.rates;
                });
            }
        }
        catch (err) {
            throw new Error(err.toString());
        }
    };
    const handleSrcCurrencyChange = (e) => {
        /*handles select/dropdown for source(base) currency if
        it has a option with a value and sets it as the source currency
        as well as storing the exchange rates relative to that source currency
          */
        if (e.target.value !== '') {
            let regExp = /a-zA-Z/;
            if (!regExp.test(e.target.value)) {
                setBaseCurrency(e.target.value);
                baseCurrRef.current = e.target.value;
            }
            else {
                return;
            }
        }
        else {
            setbaseCurrAmt(0);
            setdestCurrAmt(0);
            setDestCurrency('');
            setBaseCurrency("");
        }
    };
    const handleDestCurrencyChange = (e) => {
        /*handles select/dropdown for destination currency if
       it has a option with a value,sets it as the destination currency
       and retrives its exchange rate relative to the source currency
         */
        if (e.target.value !== '') {
            let key = e.target.value;
            if (currencyRates.current) {
                let value = currencyRates.current[key];
                if (currencyRates.current[key] !== '') {
                    setDestCurrency(key);
                    destCurrRef.current = { desination_currency: key, currency_value: value };
                    setdestCurrAmt(destCurrRef.current.currency_value * baseCurrAmt);
                }
            }
        }
    };
    const calculateCurrencyValues = () => {
        ///compare flat rates of base and destinataion currency 
        if (baseCurrAmt > 0) {
            let rate_dest = destCurrRef.current.currency_value;
            let total_dest_amt = (rate_dest * baseCurrAmt);
            setdestCurrAmt(total_dest_amt);
            calcbtnRef.current.disabled = true;
            baseCurrencyInputRef.current.disabled = true;
            baseCurrencySelectBoxRef.current.disabled = true;
            destCurrencySelectBoxRef.current.disabled = true;
            setShowResult(true);
        }
        else {
            return;
        }
    };
    const clear = () => {
        setbaseCurrAmt();
        setdestCurrAmt();
        calcbtnRef.current.disabled = false;
        baseCurrencyInputRef.current.disabled = false;
        baseCurrencyInputRef.current.value = '';
        baseCurrencySelectBoxRef.current.disabled = false;
        destCurrencySelectBoxRef.current.disabled = false;
        setShowResult(false);
    };
    const handleSrcCurrencyInputChange = (event) => {
        if (event.target.value >= 0 && destCurrRef.current.desination_currency !== "") {
            setbaseCurrAmt(event.target.value);
        }
        else {
            return;
        }
    };
    useEffect(() => {
        fetchCurrencyAPI(apiURL, baseCurrency);
    }, [baseCurrency]);
    return (_jsxs("div", { id: 'app', children: [_jsx("h1", { id: 'app-title', children: "Foreign Currency Converter" }), _jsx("span", { id: 'app-tagline', children: "Convert your foreign currencies here!" }), _jsxs("div", { id: 'conversion-window', children: [_jsxs("div", { id: 'src-currency-container', className: 'currency-input-container', children: [_jsx("label", { htmlFor: 'source-currency', children: _jsx("strong", { children: "From: " }) }), _jsxs("select", { onChange: handleSrcCurrencyChange, ref: baseCurrencySelectBoxRef, id: 'source-currency', children: [_jsx("option", { value: '', children: "---SELECT---" }), _jsx("option", { value: 'USD', children: "US(USD)" }), _jsx("option", { value: 'GBP', children: "British(GBP)" }), _jsx("option", { value: 'CAD', children: "Canadian(CAD)" }), _jsx("option", { value: 'CNY', children: "Chinese(CNY)" })] }), baseCurrency && destCurrency ?
                                _jsx(_Fragment, { children: _jsx("input", { ref: baseCurrencyInputRef, value: baseCurrAmt, className: 'currency-inputs', type: 'text', placeholder: 'Enter the amount to convert here', id: 'baseCurrencyAmt', onChange: handleSrcCurrencyInputChange }) }) : ''] }), baseCurrency ? _jsxs("div", { id: 'dest-currency-container', className: 'currency-input-container', children: [_jsx("label", { htmlFor: 'destination-currency', children: _jsx("strong", { children: "To: " }) }), _jsxs("select", { onChange: handleDestCurrencyChange, ref: destCurrencySelectBoxRef, id: 'destination-currency-selectbox', children: [_jsx("option", { value: '', children: " ---SELECT--- " }), baseCurrRef.current === 'USD' ? '' : _jsx("option", { value: 'USD', children: "US(USD)" }), baseCurrRef.current === 'GBP' ? '' : _jsx("option", { value: 'GBP', children: "British(GBP)" }), baseCurrRef.current === 'CAD' ? '' : _jsx("option", { value: 'CAD', children: "Canadian(CAD)" }), baseCurrRef.current === 'CNY' ? '' : _jsx("option", { value: 'CNY', children: "Chinese(CNY)" })] }), showResult ? _jsx("span", { id: 'dest-currency-total', children: _jsx("strong", { children: baseCurrAmt + ' ' + baseCurrency + '=' + destCurrAmt + ' ' + destCurrency }) }) : ""] }) : "", _jsx("footer", { id: 'footer', children: _jsxs("div", { id: 'btns-container', children: [baseCurrency && destCurrency ? _jsx("button", { id: 'calcBtn', ref: calcbtnRef, className: 'buttons', onClick: calculateCurrencyValues, children: "Calculate" }) : "", baseCurrency && destCurrency ? _jsx("button", { id: 'clearBtn', className: 'buttons', onClick: clear, children: "Clear" }) : ''] }) })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map