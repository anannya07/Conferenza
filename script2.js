document.getElementById('chatButton').addEventListener('click', function() {
    document.getElementById('chatWindow').style.display = 'block';
  });
  
  document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('chatWindow').style.display = 'none';
  });
  const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["how are you", "how is life", "how are things", "how are you doing"],
  
    ["what are you doing", "what is going on", "what is up"],
    ["conferenza"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],
  
    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself"
    ],
   
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    ["Event details","recent events"],
    ["I can't concentrate over my work?"],
    ["ah", "ok", "okay", "nice", "welcome"],
    ["thanks", "thank you"],
    ["what is a journal","What should I write"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["corona", "covid19", "coronavirus"],
    ["you are funny"],
    ["i dont know"],
    ["boring"],
    ["im tired"],
    ["Say something about conferenza","What is conferenza","Conferenza","Conferenza","Tell me something about coferenza"],
    
  ];
  const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    ["Okay"],
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?"
    ],
   
  
    [
      "Nothing much",
      "About to go to sleep",
      "Can you guess?",
      "I don't know actually"
    ],
    ["It's a platform of tech conference where both students and professionals can tegister Here any of the attendees can register for the event and submit their conference papaer for approval"],
    ["I am a bot "],
    ["Anannya Guchait"],
    ["I don't have a specific name"],
   
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Visit the conference details section"],
    ["Ok!first take a deep breath and try again with small steps,if u still find it difficult then take a short break,keep chatting with me"],
   ["Nice to hear"],
    ["You're welcome"],
    ["Try to write something related to the topic of the conference"],
    ["Dude!"],
    ["Yes?"],
    ["Please stay home"],
    ["Glad to hear it"],
    ["Say something interesting"],
    ["Sorry for that. Let's chat!"],
    ["Take some rest, Dude!"],
    [" It's a platform of tech conference where both students anf professionals can tegister Here any of the attendees can register for the event and submit their conference papaer for approval"],
  
    
  ];
  
  const alternative = 
  [["I am trying to find out your query"]
  ];
  
  const synth = window.speechSynthesis;
  
  function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
  }
  
  function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
        let input = inputField.value.trim();
        input != "" && output(input);
        inputField.value = "";
      }
    });
  });
  function output(input) {
    let product;
  
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  
    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();
  
    let comparedText = compare(userMessage, botReply, text);
  
    product = comparedText
      ? comparedText
      : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
  }
  
  function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray.length; y++) {
        if (triggerArray[x][y] == string) {
        let  items = replyArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
   // containMessageCheck(string);
    if (item) return item;
    else return containMessageCheck(string);
  }
  
  function containMessageCheck(string) {
    let expectedReply = [
      [
        "Good Bye, dude",
        "Bye, See you!",
        "Dude, Bye. Take care of your health in this situation."
      ],
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      ["Good morning, Have a great day!", "Morning, dude!"],
      
    ];
    let expectedMessage = [
      ["bye", "tc", "take care"],
      ["night", "good night"],
      ["evening", "good evening"],
      ["morning", "good morning"],
     
    ];
    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
      if (expectedMessage[x].includes(string)) {
     let  items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
    return item;
  }
  function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
  }
  