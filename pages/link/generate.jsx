import { useState } from "react"
import CurrencyInput from 'react-currency-input-field';


const LinkGenerate = () => {

    const [currency, setCurrencyValue] = useState("dollar")
    const [initConfig, setInitConfig] = useState({ locale: 'en-US', currency: 'USD' })
    const [value, setValueDigit] = useState("")

    const setCurrency = (event) => {
        let params = event.target.value
        if(params == 'dollar'){
            setCurrencyValue("dollar")
            setInitConfig({ locale: 'en-US', currency: 'USD' })
        }else if(params == 'euro'){
            setCurrencyValue("euro")
            setInitConfig({ locale: 'en-US', currency: 'EUR' })
        }

    }

    const setValue = (event) => {
        let params = event.target.value
        params = params
                    .replaceAll(",", "")
                    .replaceAll(".", "")
                    .replaceAll(" ", "")
                    .replaceAll("$", "")
                    .replaceAll("€", "")
        setValueDigit(params)
    }
    return(
        <>
            <div>
                <section>
                    <div className="text-center m-8">
                        <select onChange={setCurrency} id="currency" >
                            <option value="dollar">$ - Dollar</option>
                            <option value="euro">€ - Euro</option>
                        </select>
                    </div>
                    <div className="text-center mb-10">
                        <CurrencyInput                                        
                            id="value_donate"
                            name="value_donate"
                            required
                            onKeyUp={setValue}
                            className=""
                            intlConfig={initConfig}
                        />
                    </div>
                         
                    <div className="text-center">
                        
                        <a href={
                            'https://cans-frontend.vercel.app/stripe/sepa/' + 
                            currency + 
                            (value && `?value=${value}`)
                        }
                            className="text-blue-700">Acesse Pelo Link
                        </a> 
                        <br/><br/>
                            <span className="">Ou Copie</span>
                        <br/><br/>
                        <h1 className="text-green-600">
                            https://cans-frontend.vercel.app/stripe/sepa/
                            {currency} 
                            {value && `?value=${value}`}
                        </h1>
                    </div>
                </section>
            </div>
        </>
    )
}

export default LinkGenerate;