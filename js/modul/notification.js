const notification = document.querySelector('.notification');

notification.addEventListener('click', ({target}) => {
    if( target.classList.contains('notification__close') || target.closest('.notification__close')) {
        target.closest('.notification__item').remove();
        }
    })

