import { renderAccount } from"../index.js";


const heroBtn = document.querySelector('.hero__btn');
const overlay = document.querySelector(".overlay");
const modal = document.querySelector('.modal');
const lestTrnsaction = document.getElementById('list__trans');




heroBtn.addEventListener('click', () => {
    overlay.classList.add('overlay_open');
    modal.classList.add('modal_open');
});

overlay.addEventListener('click', (event) => {
    const target = event.target;
    if(target === overlay || target.closest('.modal__close')) {
        overlay.classList.remove('overlay_open');
        modal.classList.remove('modal_open');
    }
});

const form = document.querySelector('form');
const modalTitle = document.querySelector('.modal__title')

form.addEventListener('submit',(event) => {
    event.preventDefault();
    
    fetch('https://bank-api-transactions.herokuapp.com/api/transactions',{
        method: 'POST',
        body: new FormData(form)
    })
    .then((data) => {
        if(!data.ok) {
            return data.json().then((data) => Promise.reject(data));
        }
        
        return data.json();
    })
    .then((data) => {
        const { type, amount, date, description } = data;

            const item = document.createElement('li');
        item.classList.add('exchange-rates__item', type !== "Sending" ? 'exchange-rates__item_up': 'exchange-rates__item_down');
        item.innerHTML = `
        <span class="exchange-rates__currency">${date}/${description}</span>
        <span class="exchange-rates__value">${amount}</span>
        `;
        
        overlay.classList.remove('overlay_open');
        modal.classList.remove('modal_open');
        lestTrnsaction.prepend(item);
        renderAccount();

    })
    .catch((data) => {
        console.log(data);

        const notification = document.querySelector('.notification');
        const item = document.createElement('li');
        item.classList.add('notification__item');
        item.innerHTML = `
        <span>${data.info}</span>
            <button class="notification__close" type="button" aria-label="Закрыть нотификашку">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z"></path>
                </svg>
            </button>
        `;

        notification.prepend(item);
        overlay.classList.remove('overlay_open');
        modal.classList.remove('modal_open');

    }) 
        
    })
    



        
