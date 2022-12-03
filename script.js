

const add_form = document.querySelector('.add_form'); 
const products = document.querySelector('.products')
const info = document.querySelector('.info');

const data=[
];

add_form.addEventListener('submit', (event) => { // берем add_form вешаем на него обработчик событий 
    event.preventDefault();
    const title = add_form.title.value; //
    const price = add_form.price.value;
    const count = add_form.count.value;
    data.push({title, price, count});
    add_form.title.value='';
    add_form.price.value='';
    add_form.count.value='';
    // console.log(data);
    addProducts(data);
});

function addProducts(array) {
    products.innerText = '';
    info.innerText = '';

    
    const priceInfo = document.createElement('p');
    const amountInfo = document.createElement('p');

    let priceAll = 0;
    let amountAll = 0;

    array.forEach(({title,price,count}) => {
        const container = document.createElement('div');
        const title_p = document.createElement('p');
        const price_p = document.createElement('p');
        const count_p = document.createElement('p');

        container.classList.add('products-elem');
       
        title_p.innerText = title;
        price_p.innerText = price;
        count_p.innerText = count+' x '+price+' = '+count*price;

        container.append(title_p,price_p,count_p);
        products.append(container);

        priceAll+= +count* +price;
        amountAll+= +count;

        
       

        info.append(priceInfo, amountInfo);
        products.after(info);
    });

    priceInfo.innerText = `Общая стоимость: `+ priceAll;
    amountInfo.innerText = `Общее количество: ` + amountAll;
    
}
