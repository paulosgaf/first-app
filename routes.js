const express = require("express");
const router = express.Router();


router.use(express.static('public'));


router.get('/',(req,res)=>{ 
    res.render('pages/home');
});

router.get('/lista',(req,res)=>{

    res.render('pages/lista');

});

router.get('/cadastro',(req,res)=>{ 

    res.render('pages/cadastro',{users:users}); 
});

router.post('/cadastro/remove',(req,res)=>{
   
    let name = req.body.name;

    if(users.length==0){
        console.log("Erro: Não há elemento a ser removido!");
        return res.status(500).json({
            status:'error',
            error:"Removed element: ${name}"
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

            } else if(cont==users.length-1){
                console.log("Erro ao remover elemento: ",name);
                return res.status(400).json({
                    status:'error',
                    error:"Didn't Remove element ${name}"
                });
            }
        }
    }
    

});


router.post('/cadastro/update',(req,res)=>{

    var validacao = true;

    image=req.body.image;
    name=req.body.name; 
    email=req.body.email;
    address=req.body.address;
    age=req.body.age;
    heigth=req.body.heigth;
    vote=req.body.vote;

    const imageRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
    const numberRegex = /[0-9]/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!imageRegex.test(image)) { //verifica imagem
        var validacao = false;
    }

    else if (numberRegex.test(name)) { //nome sem numero
        var validacao = false;
    }

    else if(!emailRegex.test(email)){ //email formato
        var validacao = false;
    }

    else if(!numberRegex.test(address)){ //endereco com numero
        var validacao = false;
    }

    else if(age <= 0 || age > 110){ //idade limitada
        var validacao = false;
    }

    else if(heigth <= 0 || heigth > 3){ //altura limitada
        var validacao = false;
    }

    else if(vote != "true" && vote != "false"){ //voto true ou false
        var validacao = false;
    }
    

    if (validacao) {

        users[req.body.id].image=req.body.image;
        users[req.body.id].name=req.body.name; 
        users[req.body.id].email=req.body.email;
        users[req.body.id].address=req.body.address;
        users[req.body.id].age=req.body.age;
        users[req.body.id].heigth=req.body.heigth;
        users[req.body.id].vote=req.body.vote;

        res.sendStatus(200); 
        console.log("Dados recebidos: ",req.body);
    }

    else{

        res.sendStatus(400); 
    }


});

router.post('/cadastro/add',(req,res)=>{
    let user={image:"",name:"",email:"",address:"",heigth:"",age:"",vote:""};

    user.image = req.body._image;
    user.name = req.body._name;
    user.email = req.body._email;
    user.address = req.body._address;
    user.heigth = req.body._heigth;
    user.age = req.body._age;
    user.vote = req.body._vote;

    users.push(user);
    console.log("Usuário cadastrado: ",user);

    res.render('pages/cadastro');

});

module.exports = router;



