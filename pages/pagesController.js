const mongoose = require("mongoose");
require("../models/Question");
const Question = mongoose.model("question");

class pages{

    // ROUTA QUE RENDERIZA A PAG DE CENTRO DE AJUDA
    pageHelpCenter(req,res){ // Routa que renderiza a pag de centro de ajuda
        res.status(200);
        res.render("pageFooter/helpCenter");
        return;

    }

   // ROUTA QUE SALVA AS PERGUNTAS NO BANCO DE DADOS
   async question(req,res){ // Routa que salva as perguntas no banco de dados

    let question = {
        email: req.body.email,
        question: req.body.question
    }

   
           await new Question (question).save().then(() =>{
                res.status(201);
                res.redirect("/");
                return;
            }).catch(() =>{
                res.status(500);
                res.redirect("/");
                return;
    });

} 

        // ROUTA PARA TRAZER A LISTA DAS QUESTIONS NA VIEW
        async questionGet (req, res){ // Routa para trazer a lista das questions na view.

        await Question.find().then((datas) =>{ // Buscando todos os dados das questions
                res.status(200);
                res.render("pageFooter/helpCenterList", {datas: datas,});
                return;
            }).catch(() =>{
                res.status(500);
                res.redirect("/")
                return;
            })


}

        // ROUTA DE DELEÇÃO DAS QUESTIONS
       async deleteQuestion(req,res){ // Routa de deleção das questions
        await Question.remove({_id: req.body.id}).then(() => {
             res.status(200);
             res.redirect("/helpcentermessageget");
         }).catch(() => {
             res.status(500);
             res.redirect("/helpcentermessageget");
         })
     }

     // ROUTA QUE RENDERIZA A PAG DE POLÍTICA DE PRIVACIDADE
    privaePolitic(req,res){ // Routa que renderiza a pag de política de privacidade
        res.status(200);
        res.render("pageFooter/informations/privacePolitic");
        return;

    }

}



module.exports = new pages();