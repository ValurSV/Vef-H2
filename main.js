import { fetcher } from './lib/fetcher.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';

async function render(root, querystring) {
  const mainIndexJson = await fetcher('data/index.json');

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');

  console.log(type, content);

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  if (content) {
    return renderContentPage(root, mainIndexJson);
  }

  renderSubpage(root, mainIndexJson, type);
}

window.onpopstate = async (event) => {
  const root = document.getElementById('root'); // Adjust this to your root element
  const indexJson = await fetcher('path/to/index.json'); // Adjust this to your index JSON file
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  const content = urlParams.get('content');

  if (content === 'questions') {
    await renderQuestions(root, indexJson, type);
  } else if (content === 'keywords') {
    await renderKeywords(root, indexJson, type);
  } else {
    await renderSubpage(root, indexJson, type);
  }
};
const root = document.querySelector('#app');

render(root, window.location.search);
