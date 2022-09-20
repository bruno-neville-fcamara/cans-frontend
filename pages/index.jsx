
import Input from "./components/Inputs";
import {useState} from 'react'
import list_brand from "./services/list_brand";

const LoadCard = () => {
    return (
        <>
            <div className="mt-5 md:col-span-2 md:mt-0 md:px-80 pl-10">
                Carregando ...
            </div>
            
        </>
    )
}

const App = () => {

    const [load, setLoad] = useState(false)

    const submitForm = (event) => {
        event.preventDefault()

        const params = event.target
        
        params.button_submit.disabled = true

        setLoad(true)
    }
    
    return (
        <>
            <div className="mt-5 md:col-span-2 md:mt-0 md:px-80 pl-10">
                <div className="sm:overflow-hidden sm:rounded-md">

                    <div className="bg-white px-4 py-3 text-center sm:px-6">
                        <div className="inline-flex justify-center rounded-md border w-48
                                                        border-transparent py-2 px-4 text-sm 
                                                        font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
                            <img 
                                src="https://thumbs.dreamstime.com/b/donate-button-line-icon-help-vector-illustration-isolated-white-online-donation-outline-style-design-designed-web-145940111.jpg"
                                width={200}/>
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
                                        placeholder="Bruno Neville"
                                        type="text"
                                    />                                
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <Input 
                                        title="Card Number"
                                        name_object="card_number_donate"
                                        placeholder="12345678910111213"
                                        type="text"
                                    />
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <Input 
                                        title="Expiration Date"
                                        name_object="exp_card_donate"
                                        placeholder="YYYY/MM"
                                        type="date"
                                    />                                              
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <Input 
                                        title="CVV"
                                        name_object="cvv_donate"
                                        placeholder="CVV"
                                        type="text"
                                    />                                              
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-3 sm:col-span-2">

                                    <label 
                                        htmlFor="currency-donate" 
                                        className="block text-sm font-medium text-gray-700">                                     
                                        Brand
                                    </label>                                
                                    <div className="mt-1 flex rounded-md shadow-sm">                                    
                                        <select 
                                            onChange={e => updateCurrency(e.target.value)}
                                            name="brand_donate"
                                            className="block w-full flex-1 rounded border-gray-300 focus:border-green-500 
                                                    focus:ring-green-500 sm:text-sm">
                                            
                                            {
                                                list_brand.map((currency) => <option key={currency.id} value={currency.id}>{currency.name}</option> )
                                            }
                                        </select>  
                                    </div> 
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                    <Input 
                                        title="Value"
                                        name_object="value_donate"
                                        type="number"
                                    />
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

            {load && <LoadCard/>}

        </>
    )
}

export default App;