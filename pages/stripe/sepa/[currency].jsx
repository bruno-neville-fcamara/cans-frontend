
import Input from "../../components/Inputs";
import {useState, useEffect} from 'react'
import list_country from "../../../services/list_country";
import axios from "axios";
import { useRouter } from 'next/router'
import CurrencyInput from 'react-currency-input-field';


const App = () => {
    
    const [load, setLoad] = useState(false)
    const [activeTerminal, setActiveTerminal] = useState(false)
    const [errors, setErrors] = useState(false)
    const [success, setSuccess] = useState(false)
    const urlTerminal = "https://backend-cans.herokuapp.com"
    const router = useRouter()    


    const routerValue = () => {
        try {   
            if(router.query.value) {
                const value = router.query.value
                return(
                    <>
                        <CurrencyInput                                        
                            id="value_donate"
                            name="value_donate"
                            required
                            disabled
                            value={value}
                            className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                            focus:ring-green-500 sm:text-sm"
                            intlConfig={currency()}
                        /> 
                    </>
                )
            }else{
                return (
                    <>
                        <CurrencyInput                                        
                            id="value_donate"
                            name="value_donate"
                            required
                            className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                            focus:ring-green-500 sm:text-sm"
                            intlConfig={currency()}
                        /> 
                    </>)
            }
        } catch (error) {
            return (
                <>
                    <CurrencyInput                                        
                        id="value_donate"
                        name="value_donate"
                        required
                        className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                        focus:ring-green-500 sm:text-sm"
                        intlConfig={currency()}
                    /> 
                </>)
        }
    
    }

    const currency = () => {
        const data = router.query.currency

        if(data == "euro"){
            return { locale: 'en-US', currency: 'EUR' }
        }else if(data == "dollar"){
            return { locale: 'en-US', currency: 'USD' }
        }else if(data == "real"){
            return { locale: 'pt-BR', currency: 'BRL', decimalScale: 2 }
        }
        
    }

    const currency_raw = () => {
        const data = router.query.currency

        if(data == "euro"){
            return "eur"
        }else if(data == "dollar"){
            return "usd"
        }else if(data == "real"){
            return "brl"
        }
    }

    const submitForm = (event) => {
        event.preventDefault()

        const params = event.target
        
        params.button_submit.disabled = true

        setLoad(true)

        const value = params.value_donate.value
                        .replace("R$", "")
                        .replace("$", "")
                        .replace("€", "")
                        .replaceAll(".", "")
                        .replaceAll(",", "")

        
        const iban = params.iban_donate.value
                        .replaceAll(" ", "")

        const payload = JSON.stringify(
            {
                "name": params.name_donate.value,
                "email": params.email_donate.value,
                "iban": iban,
                "amount": parseInt(value),
                "currency": currency_raw(),
                "address": {
                  "line1": params.address_line1_donate.value,
                  "country": params.address_country_donate.value
                }
            }
        )        

        axios({
            method: 'post',
            url: `${urlTerminal}/client/donates/stripe`,
            headers: {'Content-Type': 'application/json'},
            data: payload
        }).then(
            resp => {
                console.log(resp.data.id)
                setSuccess(true)
            }
        ).catch(
            error => setErrors(true)
        )
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${urlTerminal}/health-check`
          })
          .then(resp => setActiveTerminal(true))
          .catch(error => setActiveTerminal(false))
        
    }, [])
    
    return (
        <>
            {activeTerminal && 
                <h1>
                    Terminal: <span className="text-green-600">Habilitado</span>
                </h1>
            }
            {errors && 
                <h1>
                    Request: <span className="text-red-600">Send Error!</span>
                </h1>
            }
            {success && 
                <h1>
                    Request: <span className="text-green-600">Sucess Send!</span>
                </h1>
            }
            <div className="mt-5 md:col-span-2 md:mt-0 md:px-80 pl-10">
                <div className="sm:overflow-hidden sm:rounded-md">

                    <div className="bg-white px-4 py-3 text-center sm:px-6">
                        <div className="inline-flex justify-center rounded-md border w-48
                                                        border-transparent py-2 px-4 text-sm 
                                                        font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
                            Imagem
                        </div>
                    </div>   

                    <form onSubmit={submitForm} method="POST">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            
                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <Input 
                                        title="Email"
                                        name_object="email_donate"
                                        placeholder="name@enterprise.com"
                                        type="email"
                                    />
                                </div>

                                <div className="col-span-3 sm:col-span-2">
                                    <Input 
                                        title="Name"
                                        name_object="name_donate"
                                        placeholder="Your Name"
                                        type="text"
                                    />                                
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-3 sm:col-span-3">
                                    <Input 
                                        title="Address Line"
                                        name_object="address_line1_donate"
                                        placeholder="Frankfurt"
                                        type="text"
                                    />
                                </div>

                                <div className="col-span-3 sm:col-span-1">

                                    <label 
                                        htmlFor="address_country_donate" 
                                        className="block text-sm font-medium text-gray-700">                                     
                                        Address Country
                                    </label>                                
                                    <div className="mt-1 flex rounded-md shadow-sm">                                    
                                        <select 
                                            name="address_country_donate"
                                            required
                                            className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                                                    focus:ring-green-500 sm:text-sm">
                                            
                                            {
                                                list_country.map((currency) => <option key={currency.id} value={currency.id}>{currency.name}</option> )
                                            }
                                        </select>  
                                    </div> 
                                </div>
                                
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-3 sm:col-span-3">
                                    <Input 
                                        title="IBAN"
                                        name_object="iban_donate"
                                        placeholder="AT611904300234573201"
                                        type="text"
                                    />
                                </div>
                                <div className="col-span-3 sm:col-span-1">                                        
                                    <label 
                                        htmlFor="value_donate"
                                        className="block text-sm font-medium text-gray-700">                                         
                                        Value
                                    </label>
                                    {routerValue()}

                                                                         
                                    
                                </div>                           
                            </div>   

                        </div>

                        <div className="bg-white px-4 py-3 text-center sm:px-6">
                            <button type="submit" id="button_submit" className="inline-flex justify-center rounded-md border w-48
                                                            border-transparent bg-green-600 py-2 px-4 text-sm 
                                                            font-medium text-white shadow-sm hover:bg-green-700 
                                                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Donate
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {
                load && 

                    <div className="mt-5 md:col-span-2 md:mt-0 md:px-80 pl-10">
                        <h2 className="text-blue-600">
                            Carregando ...
                        </h2>                        
                    </div>
            }

        </>
    )
}

export default App;