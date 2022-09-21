import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Sucess = () => {    
    const router = useRouter()
    const id = router.query.id
    const urlTerminal = `https://backend-cans.herokuapp.com/client/donates/details/${id}`
    const [payload, setPayload] = useState()
    
    axios({
        url: urlTerminal,
        method: 'get'
    }).then(
        resp => setPayload(
            resp.data
        )
           
    ).catch(
        error => console.log(error)
    )

    const setStatus = (value) =>{
        switch (value) {
            case "authorized":
                return <h1 className='text-green-700'>{value}</h1>      
            default:
                return <h1 className='text-red-700'>{value}</h1>
        }
    }

    return (
        <>
            {/* Sucesso na requisição {id} */}
            {/* {payload && JSON.stringify(payload)} */}

            {payload &&
                <div className='container'>
                    <div className='relative md:left-52 md:top-10 left-1 top-4'>
                        <table class="table-auto border border-slate-500">
                            <tbody >
                                <tr className='border border-slate-500'>
                                    <td>ID: </td>
                                    <td className='text-center'>{payload.id}</td>
                                </tr>
                                <tr className='border border-slate-500'>
                                    <td>STATUS: </td>
                                    <td className='text-center'>{setStatus(payload.status)}</td>
                                </tr>
                                <tr className='border border-slate-500'>
                                    <td>IAT: </td>
                                    <td className='text-center'>{payload.iat}</td>
                                </tr>
                                <tr className='border border-slate-500'>
                                    <td>ICA: </td>
                                    <td className='text-center'>{payload.ica}</td>
                                </tr>
                                <tr className='border border-slate-500'>
                                    <td>VALUE: </td>
                                    <td className='text-center'>{payload.authorization.Payment.Amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {/* {payload && payload.id} */}
        </>
    )
}


export default Sucess