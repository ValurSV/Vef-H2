import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";



export async function renderQuestions(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));
console.log(indexJson.title);
console.log(indexJson.navigation);

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;
  let mainElement = null;
  mainElement = document.querySelector("main");

  const efni = document.createElement("div");
  efni.className = "efni";


  if (indexJson.navigation.find((i) => i.slug === type)) {
    foundType = type;
  }

  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
  } else {
    const contentJsonFile = `data/${type}/questions.json`;
    const contentJson = await fetcher(contentJsonFile);
    console.log(contentJson); //Prentar út json skrána í console, virðist samt bara prenta HTML

    for (let i = 0; i < contentJson.questions.length; i++) {
      const questionElement = document.createElement("div");
      questionElement.className = "questionDiv";

      
      const questionLabel = document.createElement("label");
      questionLabel.innerText = contentJson.questions[i].question;
      questionLabel.className = "question";


      questionElement.appendChild(questionLabel);

      efni.appendChild(questionElement);
      mainElement.appendChild(efni); // ATH mögulega hægt að gera þetta mikið betur

      


      for (let j = 0; j < contentJson.questions[i].answers.length; j++) {
        const answerElement = document.createElement("div");
        answerElement.className = "answerDiv";


        const answerLabel = document.createElement("label");
        answerLabel.innerText = contentJson.questions[i].answers[j].answer;

        const answerRadio = document.createElement("input");
        answerRadio.type = "radio";
        answerRadio.value = contentJson.questions[i].answers[j].correct;
        answerRadio.name = "question" + i;
        

        answerElement.appendChild(answerLabel);
        answerElement.appendChild(answerRadio);
        questionElement.appendChild(answerElement);


      }
    }
  }
  const button = document.createElement("button");
  button.innerText = "Submit";
  button.addEventListener("click", () => {
    let correctCount = 0;
    const questions = document.querySelectorAll(".questionDiv");
    questions.forEach((question, index) => {
      const selectedAnswer = question.querySelector(`input[name="question${index}"]:checked`);
      if (selectedAnswer && selectedAnswer.value === "true") {
        correctCount++;
      }
    });
    alert(`Þú fékkst ${correctCount} af ${questions.length}.`);
  });

  efni.appendChild(button);
 
}
