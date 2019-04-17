import express from 'express';
import cors from 'cors';
import { Localizacao } from './dao/localizacao';
import { Tamanhos } from './dao/tamanhos';
import { Sabores } from './dao/sabores';
import { User } from './dao/user';

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
  console.log('server is running on port 3000');
  
})

const userDao = new User();

app.get('/',(req,res) => {
  res.send('It works!')
})

app.get('/cidades',(req,res) => {
  res.send(Localizacao.ObterCidades())
})

app.get('/tamanhos',(req,res) => {
  res.send(Tamanhos.ObterTamanhos())
})

app.get('/bairros/:id',(req,res) => {
  res.send(Localizacao.ObterBairros(req.params.id))
})

app.get('/sabores/:id',(req,res) => {
  res.send(Sabores.ObterSabores(req.params.id))
})

app.post('/logon',(req,res) => {
  
  let userName = req.body.userName
  let password = req.body.password

  let user = {
    userName : userName,
    password : password,
  }

  if (userDao.validateUser(user)) {
    res.send({'message':'Usuário autenticado com sucesso!'})
  } else {
    res.status(404).send({'message': 'Usuário e senha inválidos'})
  }
})

app.post('/create',(req,res) => {

  let userName = req.body.userName
  let password = req.body.password

  let user = {
    userName : userName,
    password : password,
  }

  let creation = userDao.createUser(user)
  res.send(creation)

})