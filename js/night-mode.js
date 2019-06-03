const THEME_DEFAULT = 'theme--default';
const THEME_DARK = 'theme--dark';
const ACTIVE = 'active';

const btnNightMode = document.querySelector('#btn-night-mode');
const htmlElem = document.querySelector('html');

const currentTheme = () => [...htmlElem.classList].find(cl => cl.match(/^theme--/));
const nightModeActive = theme => theme === THEME_DARK;
const otherTheme = theme => theme === THEME_DEFAULT ? THEME_DARK : THEME_DEFAULT;
const toggleHtmlThemeClass = () => {
  const theme = currentTheme();
  htmlElem.classList.remove(theme);
  htmlElem.classList.add(otherTheme(theme));
};
const toggleButtonActive = () => nightModeActive(currentTheme())
  ? btnNightMode.classList.add(ACTIVE)
  : btnNightMode.classList.remove(ACTIVE);

btnNightMode.addEventListener('click', () => {
  toggleHtmlThemeClass();
  toggleButtonActive();
});
