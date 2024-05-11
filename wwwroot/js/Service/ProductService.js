var ProductService = {
    LstProducts: (callback) => { 
        $.get("https://dummyjson.com/products", function (data, status) {
            callback(data);
        })
    },
    SingleProduct: (productID,callback) => {
        $.get("https://dummyjson.com/products/" + productID, function (data, status) {
            callback(data);
        })
    },
    LoadCategories: ( callback) => {
        $.get("https://dummyjson.com/products/categories", function (data, status) {
            callback(data);
        })
    },
    LoadProductByCategory: (CategoryName,callback) => {
        $.get("https://dummyjson.com/products/category/" + CategoryName, function (data, status) {
            callback(data);
        })
    }
}