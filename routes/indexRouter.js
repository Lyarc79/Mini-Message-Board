const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const indexRouter = Router();
const { body } = require("express-validator");

const validateMessage = [
  body("authorName")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must have between 2 and 30 characters."),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty.")
    .isLength({ max: 500 })
    .withMessage("Maximum length is 500 characters."),
];

indexRouter.get("/", messagesController.getMessages);
indexRouter.get("/new", messagesController.renderForm);
indexRouter.post("/new", validateMessage, messagesController.createMessagePost);
indexRouter.get("/message/:id", messagesController.getMessageDetails);

module.exports = indexRouter;
