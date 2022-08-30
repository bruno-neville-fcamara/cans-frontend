import axios from "axios";
import React, { useState } from "react";


const Checkout = () => {
    const [result, setResult] = useState()


    const submitForm = async (event) => {
        event.preventDefault();
    
        const params = event.target
    
        const expiration = `${params.expiration_data.value.substr(5, 2)}/${params.expiration_data.value.substr(0, 4)}`
        
        const payload = JSON.stringify({
            "value": params.value_donate.value,
            "email": params.email_address.value,
            "donate_type": params.holder.value,
            "card_number": {
                "customer_name": params.name_card.value,
                "card_number": params.card_number.value.split(" ").join(""),
                "holder": params.cvv.value,
                "expiration_date": expiration,
                "brand": params.brand.value
            }
        })
    
        console.log("PAYLOAD", payload)
    
        const header = {
            "Content-Type": "application/json"
        }
    
        await axios({
            url:"https://backend-cans.herokuapp.com/client/donates/without-account",
            method: "post",
            headers: header,
            data: payload
        }).then(
            (response) => {
                setResult(JSON.stringify(response.data.response))
                setInterval(() => {
                    window.location.reload(true) 
                }, 4000);
            }
        ).catch(
            (error) => {
                console.log("Erro", JSON.stringify(error))
            }
        )
    
        
    }

    return (
        <>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">

                </div>
            </div>

            <div className="bg-green-300 text-center">
                {result && result}
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={submitForm} method="POST">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-10 sm:col-span-6">
                                            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name="email_address"
                                                id="email_address"                                                
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-10 sm:col-span-6">
                                            <label htmlFor="name_card" className="block text-sm font-medium text-gray-700">
                                                Nome no Cartão
                                            </label>
                                            <input
                                                type="text"
                                                name="name_card"
                                                id="name_card"                                                
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">
                                                Numero do Cartão
                                            </label>
                                            <input
                                                type="text"
                                                name="card_number"
                                                id="card_number"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                                Bandeira
                                            </label>
                                            <select
                                                id="brand"
                                                name="brand"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="Visa">Visa</option>
                                                <option value="Master">Master</option>
                                                <option value="Elo">Elo</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="holder" className="block text-sm font-medium text-gray-700">
                                                Tipo Cartão
                                            </label>
                                            <select
                                                id="holder"
                                                name="holder"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="CreditCard">Credito</option>
                                                <option value="DebitCard">Debito</option>
                                                <option value="Elo">Elo</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="expiration_data" className="block text-sm font-medium text-gray-700">
                                                Expiração do Cartão
                                            </label>
                                            <input
                                                type="date"
                                                name="expiration_data"
                                                id="expiration_data"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>


                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                                CVV
                                            </label>
                                            <input
                                                type="number"
                                                name="cvv"
                                                id="cvv"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="value_donate" className="block text-sm font-medium text-gray-700">
                                                Valor
                                            </label>
                                            <input
                                                type="text"
                                                name="value_donate"
                                                id="value_donate"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Doar!
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout