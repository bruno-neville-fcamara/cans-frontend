import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import qs from 'qs'

export default NextAuth({
  providers: [
    CredentialsProvider({
        name: "Area do Doador",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "Digite seu Email"},
            password: {label: "Senha", type: "password"}
        },        
        async authorize(credentials, req){
            const data = qs.stringify({
              'username': credentials.email,
              'password': credentials.password
            })

            const URL_BACKEND = 'http://localhost:8000'

            const res = await axios({
              method: "post",
              url: `${URL_BACKEND}/client/sign_in`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: data
            })

            if(res.status == 200){
              return res.data
            }
            return null            
        }
    })
  ],
  pages:{
    newUser: "/auth/signup",
    // signIn: "/auth/signin"
  }
})