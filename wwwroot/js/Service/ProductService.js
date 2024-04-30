var ProductService = {
    LstProducts: (callback) => { 
        $.get("http://localhost:12666/ProductAPI/LisProduct", function (data, status) {
            callback(data);
        })
    }
}