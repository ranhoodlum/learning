const { v4: uuidv4 } = require("uuid");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  console.log("ran");
  res.json(Object.values(req.context.models.messages));
});

router.get("/:messageId", (req, res) => {
  res.json(req.context.models.users[req.params.messageId]);
});

router.post("", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.model.messages[id] = message;

  res.json(message);
});

router.delete("/:messageId", (req, res, next) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.model.messages;

  // new messages after deleting the message
  req.context.model.messages = otherMessages;

  return res.send(message);
});

router.put("/:messageId", (req, res) => {
  const { id, text, userId } = req.context.model.messages.find(
    (message) => message.id === req.params.messageId,
  );

  const updatedMessage = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  messages = req.context.model.messages.map((message) => {
    if (message.id === req.params.messageId) {
      message = updatedMessage;
    }
  });

  res.json(updatedMessage);
});

module.exports = router;
