import Link from 'next/link'
import styles from '../styles/Login.module.css'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Logincard from "../src/components/logincard/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'

export default function LoginPage(){
    const [formData, SetFormdata] = useState({
        
        email:'',
        password:'',

    })
    const [error, setError] = useState('')
    const router = useRouter()


      const handleFormEdit = (event, name) => {
        SetFormdata({
            ...formData,
            [name]:event.target.value
        })
    }

    const handleForm = async (event) => {

        try{
            event.preventDefault();
            const response = await fetch(`/api/user/login`,{
                method:'POST',
                body:JSON.stringify(formData)
            })

            const json = await response.json()
            if(response.status !== 200 ) throw new Error(json)
            
            setCookie('authorization',json)
            router.push('/')

            
            console.log(response.status)
            console.log(json)
            console.log(formData)
          
            
        }catch (err){
            setError(err.message)

        }
      
        //previve que a pagina seja recarregada
    }

    return(
        <div className={styles.background}>
           <Logincard title="Acesse sua conta">
            <form onSubmit={handleForm} className={styles.form}>
            <Input type="text" placeholder='Seu e-mail'value={formData.email}required  onChange={(e) =>{handleFormEdit(e,'email')}}></Input>
            <Input type="password" placeholder='sua Senha'value={formData.password}required  onChange={(e) =>{handleFormEdit(e,'password')}}></Input>
            <Button>Entrar</Button>
            {error && <p className={styles.error}>{error}</p>}
            <Link href="/cadastro">Ainda não tem cadastro</Link>

            </form>
        
        </Logincard>
        </div>

    )

}