const products = [
    {
        name: "Gringa al pastor",
        price: 50,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Gringa de suadero",
        price: 55,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Gringa de costilla",
        price: 60,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Orden de pastor",
        price: 70,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Orden de suadero",
        price: 75,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Orden de alambre",
        price: 80,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }, {
        name: "Refresco",
        price: 15,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nesciunt alias ratione recusandae ab distinctio."
    }
]

/*const addProducts = () => {
    products.forEach((product, index) => {
        let newProduct = { ...product, img: `https://picsum.photos/id/${index}/300` }
        
    })
}*/

//addProducts();

const printProducts = (productsList) => {
    console.log("printing")
    $(".products-wrapper .row").empty()
    $.each(productsList, (key, value) => {
        $(".products-wrapper .row").append(
            `
                <div class="col-12 col-sm-3">
                    <div class="card product-card mb-3" data-product-key=${key}>
                        <img src=${value.img} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title product-name">${value.name}</h5>
                            <p class="card-text product-description">${value.description}</p>
                            <p class="text-primary text-right text-italic">$ <span class="product-price">${value.price}</span></p>
                            <div class="form-group">
                                <label for="">Cantidad</label>
                                <input type="number" class="form-control" value="0">
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    })
}

const getProducts = () => {
    $.ajax({
        url: 'https://jquerycrud-ed8dc.firebaseio.com/products/.json',
        method: 'GET',
        success: (response) => {
            console.log(response)
            printProducts(response)
        },
    });
}

getProducts();

const saveOrder = (orderObject) => {
    $.ajax({
        url: 'https://jquerycrud-ed8dc.firebaseio.com/orders/.json',
        method: 'POST',
        data:JSON.stringify(orderObject),
        success: (response) => {
            console.log(response)
        },
    });
}

$("#submit-order").on('click', () => {
    let customerOrder = [];
    $(".product-card").each((index, value) => {
        let productQuantity = $(value).find("input").val();
        if (productQuantity != 0) {
            let productPrice = $(value).find(".product-price").text();
            let productId = $(value).data('product-key');
            let productName = $(value).find('.product-name').text();
            let productTotal = productQuantity * parseInt(productPrice);
            let productObject = { productId, productName, productTotal }
            console.log(productObject)
            customerOrder.push(productObject);
        }
    })
    console.log(customerOrder);
    let orderTotal = customerOrder.reduce((sum, i) => {
        console.log(i)
        return sum + (i.productTotal)
    }, 0)
    console.log('gran total', orderTotal)
    let orderObject = {customerOrder,orderTotal}
    saveOrder(orderObject)
})








