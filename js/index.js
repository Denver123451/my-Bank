import './modul/modal.js'
import './modul/menu.js'
import './modul/tabs-about-us.js'
import './modul/notification.js'


const lest = document.getElementById('about-us--id');
const lestTrnsaction = document.getElementById('list__trans');
const loading = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded', () => {
    renderAccount();
    renderTransaction();
 


})


export function renderAccount () {
    fetch('https://bank-api-transactions.herokuapp.com/api/account')
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        const { account } = data;
        const item = document.createElement('div');
        item.classList.add('div__item');
        item.innerHTML = `
        <h3 class="exchange-rates__title">На вашем счету ${account} hrn</h3>

        `
        lest.innerHTML = '';
        lest.append(item);
        loading.remove();
    })
}

function renderTransaction () {
    fetch('https://bank-api-transactions.herokuapp.com/api/transactions')
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        Object.values(data).forEach((elem) =>{
            const { type, amount, date, description } = elem;

            const item = document.createElement('li');
        item.classList.add('exchange-rates__item', type !== "Sending" ? 'exchange-rates__item_up': 'exchange-rates__item_down');
        item.innerHTML = `
        <span class="exchange-rates__currency">${date}/${description}</span>
        <span class="exchange-rates__value">${amount}</span>
        `;
        lestTrnsaction.prepend(item);
        }) 
        
    })
   
}