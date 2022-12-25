
function writeLocal(products) {
    localStorage.setItem('products', JSON.stringify(products))
}
function readLocal() {
    return JSON.parse(localStorage.getItem('products')) ?? [];
}


const add_form = document.querySelector('.add_form'); 
const products = document.querySelector('.products')
const info = document.querySelector('.info');

// берем add_form вешаем на него обработчик событий 
add_form.addEventListener('submit', (event) => { 
    event.preventDefault();
    const id = Date.now()
    const title = add_form.title.value; //
    const price = +add_form.price.value;
    const count = +add_form.count.value;
    // data.push({id, title, price, count});

    writeLocal([...readLocal(), { id, title, price, count }]);

    add_form.title.value='';
    add_form.price.value='';
    add_form.count.value='';
    // console.log(data);
    // addProducts(data);

    rerender()
});

//создаем карточки товара
function addProducts(id, title,price,count) {
    const container = document.createElement('div');
    const del_btn = document.createElement('button')
    const title_p = document.createElement('p');
    const price_p = document.createElement('p');
    const count_p = document.createElement('p');

    del_btn.classList.add('btn-del')
    container.classList.add('products-elem');

    del_btn.innerHTML = '<i class="lar la-trash-alt"></i>'
    title_p.innerText = `${title}`;
    price_p.innerText = `${price}`;
    count_p.innerText = `${count} x ${price} = ${count*price}`;

    container.append(del_btn, title_p, price_p, count_p);
        
    del_btn.addEventListener('click', () => deleteCard(id))

        // info.append(priceInfo, amountInfo);
        // products.after(info);

    return container;
};

//удаляем карточки
function deleteCard(deletedId) {
    const filteredProducts = readLocal().filter(({ id }) => id !== deletedId)
    writeLocal(filteredProducts)
    rerender()
}
    
//Общая количество товара и общая стоимость
function showTotalAmount() {
    const priceInfo = document.createElement('p');
    const amountInfo = document.createElement('p');

    info.append(priceInfo, amountInfo);

    const total_sum = readLocal().reduce((sum, { price, count }) => sum + (price * count), 0)
    const total_count = readLocal().reduce((sum, { count }) => sum + count, 0)

    priceInfo.innerText = `Общая стоимость: ${total_sum} `;
    amountInfo.innerText = `Общее количество:  ${total_count}`;
}

function rerender() {
    products.innerText = '';
    info.innerText = '';

    readLocal().forEach(({ id, title, price, count }) => {
        const product = addProducts(id, title, price, count)
        products.append(product);
    })

    if (readLocal().length === 0) {
        info.innerText = ' Товары отсутствуют.'
    } else {
        showTotalAmount()
    }

}

rerender();
