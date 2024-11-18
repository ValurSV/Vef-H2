import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";

export async function renderQuestions(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;
  let mainElement = null;

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
      questionElement.className = "question";
      questionElement.innerText = contentJson.questions[i].question;
      root.appendChild(questionElement);


      for (let j = 0; j < contentJson.questions[i].answers.length; j++) {
        const answerElement = document.createElement("radio");
        answerElement.className = "answer";
        answerElement.innerText = contentJson.questions[i].answers[j].answer;
        
        
        questionElement.appendChild(answerElement);


      }
    }
  }
}
