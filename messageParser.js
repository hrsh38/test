let input = require(`./messagetext/${16}.json`);
const fs = require("fs");

let sender = [];
let reciever = [];
let ME = "Harsh Patel";
let messagesJSON = input.messages.slice().reverse();
let isLastMe = messagesJSON[0].sender_name === ME;
if (!isLastMe) {
  reciever.push(messagesJSON.content);
}

for (let i = 0; i < messagesJSON.length; i++) {
  let m = messagesJSON[i];
  if (!m.content) {
    m.content = "[emoji]";
  }
  if (m.sender_name === ME) {
    if (!isLastMe) {
      sender.push(m.content);
    } else {
      sender[sender.length - 1] += " " + m.content;
    }
    isLastMe = true;
  } else {
    if (isLastMe) {
      reciever.push(m.content);
    } else {
      reciever[reciever.length - 1] += " " + m.content;
    }
    isLastMe = false;
  }
}

fs.writeFile("train.from", sender.join("\n"), "utf8", err => {
  if (err) {
    return console.log(err);
  } else {
    console.log("sender,urgood");
  }
});

fs.writeFile("train.to", reciever.join("\n"), "utf8", err => {
  if (err) {
    return console.log(err);
  } else {
    console.log("reciever, urgood");
  }
});
