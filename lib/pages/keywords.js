import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";


export async function renderKeywords(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;
  let mainElement = null;
 
  if (indexJson.navigation.find((i) => i.slug === type)) {
    foundType = type;
  }

  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
    console.log(mainElement)
  } else {
    const contentJsonFile = `data/${type}/keywords.json`;
    const contentJson = await fetcher(contentJsonFile);
    console.log(contentJson); //Prentar út json skrána í console, virðist samt bara prenta HTML

const keywordDiv = document.createElement("div");
keywordDiv.className = "keywordDiv";

    for (let i = 0; i < contentJson.keywords.length; i++) {

      
      
      const keywordElement = document.createElement("div");
      keywordElement.className = "keyword";

      
if (contentJson.keywords[i].english) {
      const keywordEnglish = document.createElement("h3");
      keywordEnglish.innerText = contentJson.keywords[i].title + ' English: ' + contentJson.keywords[i].english;

      keywordElement.appendChild(keywordEnglish);
}
else {const keywordTitle = document.createElement("h3");
  keywordTitle.innerText = contentJson.keywords[i].title;

  keywordElement.appendChild(keywordTitle);}

      const keywordP = document.createElement("p");
      keywordP.innerText = contentJson.keywords[i].content;

      keywordElement.appendChild(keywordP);

      keywordDiv.appendChild(keywordElement);
      const objecttobeadded = document.querySelector(".efni")
    if (objecttobeadded)  {
      objecttobeadded.appendChild(keywordDiv);

    }
  }
}
}