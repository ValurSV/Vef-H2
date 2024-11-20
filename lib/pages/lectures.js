import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";


export async function renderLectures(root, indexJson, type) {
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
    const contentJsonFile = `data/${type}/lectures.json`;
    const contentJson = await fetcher(contentJsonFile);
    console.log(contentJson); //Prentar út json skrána í console, virðist samt bara prenta HTML

    // Loop over lectures in the data
    contentJson.lectures.forEach(lecture => {
      const lecturesElement = document.createElement('div');
      lecturesElement.classList.add('lectures');

      // Create and append the title
      const title = document.createElement('h2');
      title.textContent = lecture.title;
      lecturesElement.appendChild(title);

      const content = document.querySelector('.efni');
      content.appendChild(lecturesElement);  // Append the lecture element to content

      // Loop over each content in the current lecture
      lecture.content.forEach(contentItem => {  // Renamed 'content' to 'contentItem'
          const contentElement = document.createElement('div');
          contentElement.classList.add('content');
  
          let datadescription;

          // Handle different content types
          switch (contentItem.type) {
              case 'quote':
                  datadescription = document.createElement('blockquote');
                  datadescription.textContent = contentItem.data;
                  if (contentItem.attribute) {
                      const cite = document.createElement('footer');
                      cite.textContent = contentItem.attribute;
                      datadescription.appendChild(cite);
                  }
                  break;
              case 'text':
                  datadescription = document.createElement('p');
                  datadescription.textContent = contentItem.data;
                  break;
              case 'heading':
                  datadescription = document.createElement('h2');
                  datadescription.textContent = contentItem.data;
                  break;
              case 'list':
                  datadescription = document.createElement('ul');
                  contentItem.data.forEach(item => {
                      const listItem = document.createElement('li');
                      listItem.textContent = item;
                      datadescription.appendChild(listItem);
                  });
                  break;
              case 'code':
                  datadescription = document.createElement('pre');
                  const codeBlock = document.createElement('code');
                  codeBlock.textContent = contentItem.data;
                  datadescription.appendChild(codeBlock);
                  break;

              case 'image': // New case for images
                  datadescription = document.createElement('img');
                  datadescription.src = contentItem.data; // Assuming data contains the image URL
                  datadescription.alt = contentItem.caption || "Image"; // Default alt text if caption is missing
                  
                  // If there's a caption, add it under the image
                  if (contentItem.caption) {
                      const captionElement = document.createElement('figcaption');
                      captionElement.textContent = contentItem.caption;
                      const figureElement = document.createElement('figure');
                      figureElement.appendChild(datadescription);
                      figureElement.appendChild(captionElement);
                      datadescription = figureElement; // Use the figure element to wrap both image and caption
                  }
                  break;

              default:
                  // Handle any unexpected content type
                  console.log('Unknown content type:', contentItem.type);
          }

          // If a description has been created, append it to contentElement
          if (datadescription) {
              contentElement.appendChild(datadescription);
              lecturesElement.appendChild(contentElement); // Append the contentElement to the lecturesElement
          }
      });
  });
}

  }
  

