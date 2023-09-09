const express = require("express");
const router = express.Router();
const pagesController = require("./pagesController");

// ROUTA QUE RENDERIZA A PAG DE CENTRO DE AJUDA
router.get("/helpcentermessage",pagesController.pageHelpCenter);

// ROUTA QUE SALVA AS PERGUNTAS NO BANCO DE DADOS
router.post("/question",pagesController.question);

// ROUTA QUE RENDERIZA A PAG DE LISTAGEM DO CENTRO DE AJUDA
router.get("/helpcentermessageget",pagesController.questionGet);

// ROUTA DE DELEÇÃO DAS QUESTIONS
router.post("/questionD",pagesController.deleteQuestion);

// ROUTA QUE RENDERIZA A PAG DE POLÍTICA DE PRIVACIDADE
router.get("/privaceplitic",pagesController.privaePolitic);

module.exports = router;