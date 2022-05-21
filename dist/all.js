const url = 'https://jsonplaceholder.typicode.com/users',
  loading = document.querySelector('.loading'),
  userValues = {
    userName: 'name',
    email: 'email',
    address: 'address',
    addressDetails: { street: 'street', suite: 'suite', city: 'city' },
    phone: 'phone',
    company: 'company',
  },
  { userName, email, address, phone, company } = userValues,
  theadHTML = `
  <tr>
    <th>${userName}</th>
    <th>${email}</th>
    <th>${address}</th>
    <th>${phone}</th>
    <th>${company}</th>
  </tr>
`,
  fetchData = async () => {
    loading.classList.add('active'),
      await fetch(url)
        .then((e) => {
          if (e.ok) return e.json()
          throw Error('Error response')
        })
        .then((e) => {
          const t = userValues['addressDetails'],
            o = e
              .map(
                (e) => `
        <tr>
          <td>${e.name}</td>
          <td>${e.email}</td>
          <td>
            ${t.street}: ${e.address.street}<br> 
            ${t.suite}: ${e.address.suite}<br> 
            ${t.city}: ${e.address.city}
          </td>
          <td>${e.phone}</td>
          <td>${e.company.name}</td>
        </tr>
      `
              )
              .join('')
          setTimeout(() => {
            document
              .querySelector('.table__head')
              .insertAdjacentHTML('afterbegin', e.length ? theadHTML : null),
              document
                .querySelector('.table__body')
                .insertAdjacentHTML('afterbegin', o)
          }, 2e3)
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setTimeout(() => {
            loading.classList.remove('active')
          }, 2e3)
        })
  },
  popup =
    (document.addEventListener('DOMContentLoaded', () => fetchData()),
    document.querySelector('.popup')),
  openPopupButton = document.querySelector('.task__btn--open-popup'),
  closePopupButton = document.querySelector('.popup__btn--close-popup'),
  counterSpan = document.querySelector('.popup__number')
let counter = localStorage.getItem('counter') || 0
const increaseNumberOfClicked = () => {
    counter++,
      localStorage.setItem('counter', counter),
      (counterSpan.textContent = counter)
  },
  openPopup = (e) => {
    null != e && (e.classList.add('active'), increaseNumberOfClicked())
  },
  closePopup = (e) => {
    null != e && e.classList.remove('active')
  },
  closePopupByClickOutside = (e, t) => {
    e.target === t && closePopup(t)
  },
  closePopupByClickEscape = (e, t) => {
    'Escape' === e.key &&
      t.classList.contains('active') &&
      t.classList.remove('active')
  }
document.addEventListener('DOMContentLoaded', () => {
  openPopupButton.addEventListener('click', () => openPopup(popup)),
    closePopupButton.addEventListener('click', () => closePopup(popup)),
    window.addEventListener('click', (e) => closePopupByClickOutside(e, popup)),
    window.addEventListener('keyup', (e) => closePopupByClickEscape(e, popup))
})
