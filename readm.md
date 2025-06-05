1- npx prisma gererate 

2 -npx prisma migrate dev --name init

rodar projeto 
3- npm start      

4-  npx prisma studio 


cria a os na mão direto pelo prisma studio 



------------------------------------------------------------

Rotas 

get os 
http://localhost:3000/os/1      //  o numero é o id da os 




---------------------------------------------------------------

login 

http://localhost:3000/login   


json 

{
    "nome": "Test User",
    "perfil": "tecnico"
}

----------------------------------------------------

Assinar 

http://localhost:3000/assinar


json 
{
    "id": 1,
    "nome": "carlos daniel",
    "perfil": "tecnico"
}


{
    "id": 1, 
    "nome": "nome",
    "perfil": "gestor"
}