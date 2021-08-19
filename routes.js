const express = require("express");
const router = express.Router();

// const faker = require("faker");

// let db = require("./db");

// db.criarDB("minhaBaseDados");

//Especifica a pasta contendo arquivos estáticos. 
//O nome 'public' não precisará ser colocado na rota 
//Para serem alcançados os arquivos e pastas que estão dentro dele. 
//Por isso na imagem que está na página home.ejs só há o indicativo para 'images'
router.use(express.static('public'));



//************* Exemplode Rotas ************* 

/*

http://localhost:3030/css
http://localhost:3030/images
http://localhost:3030/index.html

/ = http://localhost:3030/
/about = http://localhost:3030/about
/cadastro =  http://localhost:3030/cadastro

*/


//Req é um objeto que recebe dados da requisição HTTP feita (request). Res permite enviar uma resposta ao navegador (Response)
router.get('/',(req,res)=>{ //callback - funcao que trata dado evento GET
    res.render('pages/home');
});

router.get('/about',(req,res)=>{ //callback - funcao que trata dado evento  GET

    res.render('pages/about');
});

router.get('/cadastro',(req,res)=>{ //callback - funcao que trata dado evento  GET

    //a funcao render pode receber um pametro na forma de objeto literal
    //no caso, ela irá receber um objeto com campo chamado users e com valor igual ao vetor users
    res.render('pages/cadastro',{users:users}); 
});

router.post('/cadastro/remove',(req,res)=>{
    //let item =req.body.id; //pega o valor passado através do parâmetro id e atribui a variável item. 
    let name = req.body.name;

    if(users.length==0){
        console.log("Erro: Não há elemento a ser removido!");
        return res.status(400).json({
            status:'error',
            error:`Removed element: ${name}`
        });

    } else {
        for(let cont=0;cont<users.length;cont++){
            if(users[cont].name==name){
                users.splice(cont,1);
                console.log("Elemento Removido: ",name);
                return res.status(200).json({
                    status:'sucess',
                    data:users
                });
                //res.send(JSON.stringify({sucess:`Elemento removido com sucesso: ${name}`}));
            } else if(cont==users.length-1){
                console.log("Erro ao remover elemento: ",name);
                return res.status(400).json({
                    status:'error',
                    error:`Removed element: ${name}`
                });
            }
        }
    }
    
    
    //users.splice(item,1); //este método permite adicionar ou remover um item do vetor em uma dada posição. 
    //res.render('pages/cadastro',{users:users});
    //res.sendStatus(200); //envia mensagem 200 significando que as modificacoes foram ok
    //res.send(JSON.stringify({sucess:`Elemento removido com sucesso: ${name}`}));
    //console.log("Elemento Removido: ",name);
    
});



router.post('/cadastro/update',(req,res)=>{
    //substitui os valores armazenados no item do vetror dado por id, por valores fornecidos como parametro vindos do navegador.
    //recebe dados do cliente na forma de um objeto JSON

    users[req.body.id].name=req.body.name;
    users[req.body.id].email=req.body.email;
    users[req.body.id].address=req.body.address;
    users[req.body.id].age=req.body.age;
    users[req.body.id].height=req.body.height;
    users[req.body.id].vote=req.body.vote;

    console.log("Dados recebidos: ",req.body);//mostra no console do servidor os dados recebidos

    res.sendStatus(200); //envia mensagem 200 significando que as modificacoes foram ok
});

router.get('/cadastro/list',(req,res)=>{
    //Para fazer em casa: Como seria uma rotina para listar todos os itens cadastrados?

});

router.post('/cadastro/addUser',(req,res)=>{
    //Para fazer em casa: Como seria uma rotina para listar todos os itens cadastrados?

});

//Essa linha permite que este código seja exportado como um módulo e possa ser usado em outras partes da aplicação.
module.exports = router;