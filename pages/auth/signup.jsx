import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useRouter } from 'next/router'

const SignUp = () => {
  const router = useRouter();
  const URL_BACKEND = 'http://localhost:8000'

  const submitForm = async (event) => {
    event.preventDefault();
    
    const params = event.target
    
    await axios({
      url: `${URL_BACKEND}/client/sign_up`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
          "email": params.email.value,
          "password": params.password.value
      })
    }).then(
      (response) => {
        if(response.status == 201){
          router.push("/api/auth/signin")
        }
      }
    ).catch(
      (response) => console.log("Erro: ", JSON.stringify(response))
    )
  }

  return (
    <>      
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            Images
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Sign up to your account
            </h2>
            
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitForm} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              
              {/* <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;
