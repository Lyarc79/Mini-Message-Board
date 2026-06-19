const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini MessageBoard", messages: messages });
}

async function renderForm(req, res) {
  res.render("form");
}

async function createMessagePost(req, res) {
  const { authorName, messageText } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("form", {
      errors: errors.array(),
      authorName,
      messageText,
    });
  }
  await db.insertMessage(messageText, authorName);
  res.redirect("/");
}

async function getMessageDetails(req, res) {
  const id = req.params.id;
  const message = await db.getMessageById(id);
  res.render("messageDetails", { message: message });
}

module.exports = {
  getMessages,
  renderForm,
  createMessagePost,
  getMessageDetails,
};
