import jwt from 'jsonwebtoken'

let users = []

const SECRET = process.env.JWT_SECRET

function createToken(user){
    return jwt.sign({email:user.email, name: user.name}, SECRET)
}

function readToken(token){
    try{
        return jwt.verify(token, SECRET)
    }catch (err){
        throw new Error ('token invalido')
    }

}

//essa função esta sendo chamada no index
export function verificatoken(token){
return readToken(token)
}



console.log("Chegou aqui no Services Users parte 1")

export function cadastro (body){
    const user = users.find(({email}) => email === body.email)
    if (user) throw new Error('usuario ja cadastrado')

    console.log("Chegou aqui no Services Users cadastro") 
    users.push(body)
    const token = createToken(body)
    return token
    console.log('token')

}

export function login (body){
    const user = users.find(({email}) => email === body.email)
    if (!user) throw new Erro ('Usuario não cadastrado')
    if (user.password !== body.password) throw new Erro('senha incorreta')

    const token = createToken(body)
    return token
}