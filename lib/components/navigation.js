import { el } from '../elements.js';

export function renderNavigation(navigation, onClickHandler) {
  /*
  <nav>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
    <a href="${url}">${title}</a>
  </nav>
  */
  const navigationElement = el('ul', { class: 'navigation__list' });

  for (const item of navigation) {
    const { title, slug } = item;
    /* sama og
    const title = item.title;
    const slug = item.slug;
    */
    const href = `/?type=${slug}`;
    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      el('a', { href, class: 'navigation__link' }, title),
    );
    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
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