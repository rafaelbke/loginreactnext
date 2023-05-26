 import { useState } from 'react'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import styles from '../styles/Login.module.css'

import Logincard from "../src/components/logincard/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'

export default function CadastroPage(){
    const [formData, SetFormdata] = useState({
        name:'',
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
                const response = await fetch(`/api/user/cadastro`,{
                    method:'POST',
                    body:JSON.stringify(formData)
                })

                const json = await response.json()
                if(response.status !== 201 ) throw new Error(json)
                
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
        <Logincard title="Crie sua conta">
        <form onSubmit={handleForm} className={styles.form}>
            <Input type="text"  placeholder='Nome'required value={formData.name} onChange={(e) =>{handleFormEdit(e,'name')}}></Input>
            <Input type="text" placeholder='Seu e-mail'required value={formData.email} onChange={(e) =>{handleFormEdit(e,'email')}}></Input>
            <Input type="password" placeholder='Sua Senha' required value={formData.password}onChange={(e) =>{handleFormEdit(e,'password')}}></Input>
            <Input type="password" placeholder='Confirme sua senha'required></Input>
            <Button>Cadastrar</Button>
            {error && <p className={styles.error}>{error}</p>}
            <Link href="/login">Voltar</Link>
            </form>
        
        </Logincard>
        
        </div>
    )
}