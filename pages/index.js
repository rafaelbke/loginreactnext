import styles from '../styles/Home.module.css'
import { getCookie } from 'cookies-next'
import { verificatoken } from '../services/user'

export default function Home() {
  return (
    <div>
      Perfil do usuario
    </div>
  )
}


export const getServerSideProps = async ({req,res})=> {
  try{
      //pega o token do cookie
      const token = getCookie('authorization' , {req,res})
    console.log(token)
    if(!token) throw new Error('Token Invalido')

    verificatoken(token) 

    return{
      props:{}
    }
  } catch (err){
      return {
          redirect:{  
            permanent:false,
            destination:'/login'


          },
          props:{}
        
      }
  }
}