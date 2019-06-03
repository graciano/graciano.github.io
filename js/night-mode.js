const THEME_DEFAULT = 'theme--default';
const THEME_DARK = 'theme--dark';
const ACTIVE = 'active';
const NIGHT_START = 19;
const NIGHT_END = 6;
const HOUR_NOW = (new Date()).getHours();

const btnNightMode = document.querySelector('#btn-night-mode');
const htmlElem = document.querySelector('html');

const isNight = () => NIGHT_START <= HOUR_NOW || HOUR_NOW <= NIGHT_END;
const themeByCurrentHour = () => isNight() ? THEME_DARK : THEME_DEFAULT;
const nightModeActive = theme => theme === THEME_DARK;
const otherTheme = theme => theme === THEME_DEFAULT ? THEME_DARK : THEME_DEFAULT;
const currentTheme = () => localStorage.getItem('theme') || themeByCurrentHour();
const setInitialTheme = () => htmlElem.classList.add(currentTheme());
const toggleHtmlThemeClass = () => {
  const theme = currentTheme();
  const newTheme = otherTheme(theme);
  htmlElem.classList.remove(theme);
  htmlElem.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
};
const toggleButtonActive = () => nightModeActive(currentTheme())
  ? btnNightMode.classList.add(ACTIVE)
  : btnNightMode.classList.remove(ACTIVE);

btnNightMode.addEventListener('click', () => {
  toggleHtmlThemeClass();
  toggleButtonActive();
});

setInitialTheme();
