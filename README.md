
<p align="center">
  <h1 align="center">Desafio Boticário</h1>  
</p>

### Tecnologias usadas:
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
   <img height="32" width="32" src="https://wiki.postgresql.org/images/3/30/PostgreSQL_logo.3colors.120x120.png">
   <img height="32" width="128" src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png">
   <img src="https://img.icons8.com/color/48/000000/typescript.png"/>
</p>

### Requisitos:
```
Docker
Docker compose
Node v14.17.3
```

### Executando a aplicação:
Faça o clone da aplicação e execute:
```
docker-compose up
```

### Utilizando a aplicação:
Acesse a URL:
```
http://localhost:3333/swagger/
```
Scripts:

```
CADASTRO USUÁRIO

curl -X POST \
  http://localhost:3333/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 8d6331d7-ea02-0f44-ff6a-ce51fbe3f9af' \
  -d '{
	"fullName": "teste",
	"email": "teste@gmail.com",
	"password": "123456",
	"cpf": "123.123.123.12"
}'
```

```
AUTENTICAR USUÁRIO

curl -X POST \
  http://localhost:3333/sessions \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: e1e9a214-c225-6a0b-3407-cf55b9696c31' \
  -d '{
	"email": "teste@gmail.com",
	"password": "123456"
}'
```

```
CADASTRAR PEDIDO

curl -X POST \
  http://localhost:3333/orders \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcyNzI5NDIsImV4cCI6MTYyNzM1OTM0Miwic3ViIjoiMyJ9.GHVvPD7wOHU9oIDzPFryjUPtFP_ToXZzyAPb8h04gFw' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: f9a5cb88-6b74-74b8-1fdb-82eea6047e34' \
  -d '{ 
	"code": 123, 
	"price": 9.99, 
	"date": "2021-07-21",
	"cpf": "123.123.123.12" 
}'
```

```
LISTAR PEDIDOS

curl -X POST \
  http://localhost:3333/orders \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcyNzI4MzYsImV4cCI6MTYyNzM1OTIzNiwic3ViIjoiMyJ9.W6QedRLgI14sn21oBorcCDNz-_yERZyNmeTKsSQsHiU' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: d916ec37-d89d-89d0-9085-19c547b8a534' \
  -d '{ 
	"code": 123, 
	"price": 9.99, 
	"date": "2021-07-21",
	"cpf": "123.123.123.12" 
}'
```

```
ATUALIZAR PEDIDO

curl -X PUT \
  'http://localhost:3333/orders?order_id=1' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcyNzMxNTQsImV4cCI6MTYyNzM1OTU1NCwic3ViIjoiMyJ9.tuSH3Ms9I8rRPyiyMHpGcGPCbsU4q2rNG6Qqa0c-rsg' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: df8a6503-3f0e-2297-8696-ec87aa7db96a' \
  -d '{ 
	"code": 321,
	"price": 119.99, 
	"date": "2021-07-21",
	"cpf": "432.688.207-78" 
}'
```

```
APAGAR UM PEDIDO

curl -X DELETE \
  'http://localhost:3333/orders?order_id=22' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 099e0480-f8db-0f0a-4bea-5393ddeede56'
```

```
CHAMADA EXTERNA

curl -X GET \
  http://localhost:3333/cashback \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcyNzM0MjgsImV4cCI6MTYyNzM1OTgyOCwic3ViIjoiMyJ9.8zfp4GlVHtcUBOcemFDLiysVNhtfWOsUgXdrJi1bzyo' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 0c1f3216-7361-7d16-0c17-5d0353e69b65'
```

