import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";
import { renderKeywords } from "./keywords.js";
import { renderQuestions } from "./questions.js";



export async function renderSubpage(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title + " - " + type));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let foundType = null;

  if (indexJson.navigation.find((i) => i.slug === type)) {
    foundType = type;
  }



  let mainElement;
  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
  } else {
    const contentJsonFile = `data/${type}/index.json`;
    const contentJson = await fetcher(contentJsonFile);

    const content = contentJson.content;
    const contentElement = document.createElement("div");
    contentElement.classList.add("valmynd");

    // TODO ættum að skoða html structure hér
    for (const item of content) {


      const itemElement = document.createElement("section");

      const button = document.createElement("button");
      button.textContent = item.title;
      button.setAttribute("href", `/?type=${type}/${item.slug}`);
      itemElement.appendChild(button);
      button.addEventListener("click", (e) => {
        if (!e) {
          return;
        }

        // Remove content from .efni
        const contentContainer = document.querySelector(".efni");
        if (contentContainer) {
          contentContainer.innerHTML = "";
        }

        if (item.type === "questions") {
          renderQuestions(root, indexJson, type);
          efni.innerHTML = "";
          console.log(type + " er " + item.type);

          return;
        }
        if (item.type === "keywords") {
          renderKeywords(root, indexJson, type);
          efni.innerHTML = "";
          console.log(type + " er " + item.type);

          return;
        }
        if (item.type === "lectures") {
          console.log(type + " er " + item.type);
          efni.innerHTML = "";
          return;
        }
      });

      const itemText = document.createElement("div");

      
      contentElement.appendChild(itemElement);
    }
    

    mainElement = el("main", {},contentElement );
  }

  const efni = document.createElement("div");
efni.classList.add("efni");
mainElement.appendChild(efni);

  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}

