const popup = document.querySelector('.popup')
const openPopupButton = document.querySelector('.task__btn-open-popup')
const closePopupButton = document.querySelector('.popup__btn-close-popup')
const resetCounterButton = document.querySelector('.popup__btn-reset')
const counterSpan = document.querySelector('.popup__number')
let counter = localStorage.getItem('counter') || 0
const clickLimit = 5

const increaseNumberOfClicked = () => {
  counter++
  localStorage.setItem('counter', counter)
  counterSpan.textContent = counter
  counter >= clickLimit && resetCounterButton.classList.add('active')
}

const resetNumberOFClicked = () => {
  localStorage.removeItem('counter');
  counterSpan.textContent = 0
  counter = 0
  resetCounterButton.classList.remove('active')
}

const openPopup = popup => {
  if (popup == null) return
  popup.classList.add('active')
  increaseNumberOfClicked()
}

const closePopup = popup => {
  if (popup == null) return
  popup.classList.remove('active')
}

const closePopupByClickOutside = (e, popup) => {
  if (e.target === popup) {
    closePopup(popup)
  }
}

const closePopupByClickEscape = (e, popup) => {
  if (e.key === 'Escape' && popup.classList.contains('active')) {
    popup.classList.remove('active')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  openPopupButton.addEventListener('click', () => openPopup(popup))
  closePopupButton.addEventListener('click', () => closePopup(popup))
  resetCounterButton.addEventListener('click', resetNumberOFClicked)
  window.addEventListener('click', (e) => closePopupByClickOutside(e, popup))
  window.addEventListener('keyup', (e) => closePopupByClickEscape(e, popup))
})
