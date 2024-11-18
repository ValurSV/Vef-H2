import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";
import { renderQuestions } from "./questions.js";

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));

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
      itemElement.appendChild(button);
      button.addEventListener("click", (e) => {
        if (!e) {
          return;
        }

        renderQuestions(root, indexJson, type);
        const contentDiv = e?.target?.parentElement?.querySelector("div");
      });

      const itemText = document.createElement("div");

      contentElement.appendChild(itemElement);
    }

    mainElement = el("main", {}, el("p", {}, contentElement));
  }

  const footerElement = el("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
