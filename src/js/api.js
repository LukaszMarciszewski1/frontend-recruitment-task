const url = 'https://jsonplaceholder.typicode.com/users'
const loading = document.querySelector('.loading')

const userValues = {
  userName: 'name',
  email: 'email',
  address: 'address',
  addressDetails: {
    street: 'street',
    suite: 'suite',
    city: 'city',
  },
  phone: 'phone',
  company: 'company',
}

const { userName, email, address, phone, company } = userValues

const theadHTML = `
  <tr>
    <th>${userName}</th>
    <th>${email}</th>
    <th>${address}</th>
    <th>${phone}</th>
    <th>${company}</th>
  </tr>
`

const fetchData = async () => {
  loading.classList.add('active')
  await fetch(url)
  .then(response => {
    if(!response.ok) throw Error('Error response')
    return response.json()
  })
  .then(data => {
    const {addressDetails} = userValues
    const tbodyHTML = data.map(user => (
      `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            ${addressDetails.street}: ${user.address.street}<br> 
            ${addressDetails.suite}: ${user.address.suite}<br> 
            ${addressDetails.city}: ${user.address.city}
          </td>
          <td>${user.phone}</td>
          <td>${user.company.name}</td>
        </tr>
      `
    )).join('')
    setTimeout(() => {
      document.querySelector('.table__head').insertAdjacentHTML("afterbegin", data.length ? theadHTML : null)
      document.querySelector('.table__body').insertAdjacentHTML("afterbegin", tbodyHTML)
    }, 2000)
    })
  .catch (error => console.log(error))
  .finally(() => {
    setTimeout(() => {
      loading.classList.remove('active')
    }, 2000)
  });
 }

 document.addEventListener('DOMContentLoaded', () => fetchData())