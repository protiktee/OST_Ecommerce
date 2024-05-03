var ProductService = {
    LstProducts: (callback) => { 
        $.get("https://dummyjson.com/products", function (data, status) {
            callback(data);
        })
    }
}