var LstCartproducts = [];

var ProductController = {
    LstProducts: () => {
        ProductService.LstProducts(function (response) {
            let productContent = '';
            console.log(response);
            $.each(response.products, function (index, value) {
                console.log(value)
                productContent = productContent + `
                    <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                    <img id='pdPicture_${index}' src="${value.thumbnail}" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content">
                                    <h4 id='pdName_${index}'>${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${index}'>${value.price}</b></p>
                                        <a href="#" class="btn btn-primary" id='btnPdAddToCart_${index}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
                            </div>
                        </div>
                    </div> 
					`;

            })
            $('#dvProductList').html(productContent);
        })
    },
    AddToCart: (cntrl) => {
        var targetIndex = $(cntrl).attr("id").split('_')[1];
        var targetImage = $('#pdPicture_' + targetIndex).attr('src');
        var targetName = $('#pdName_' + targetIndex).html();
        var targetPrice = $('#pdPrice_' + targetIndex).html();

        var targetProduct =
        {
            Image: targetImage,
            Name: targetName,
            Price: targetPrice
        }
        LstCartproducts.push(targetProduct);

        ProductController.ArrangeProductsForCart();
        alert("Product added to cart");
    },
    DeleteFromCart: (targetIndex) => {
        debugger;
        let LstCartproducts_upd = [];
        $.each(LstCartproducts, function (index, value) {
            if (targetIndex != index) {
                LstCartproducts_upd.push(value)
            }
        })
        //if (LstCartproducts != 0)
        LstCartproducts = LstCartproducts_upd;
        localStorage.setItem("LstCartproducts", JSON.stringify(LstCartproducts));
        ProductController.ArrangeProductsForCart();
        alert("Cart updated")
    },
    ViewCart: () => {
        if ($("#dvViewCartsWrapper").css('right') == "0" || $("#dvViewCartsWrapper").css('right') == "0px") {
            $("#dvViewCartsWrapper").animate({
                right: "-300"
            }, "fast");
        }
        else {
            $("#dvViewCartsWrapper").animate({
                right: "0"
            }, "fast");
        }
    },
    ArrangeProductsForCart: () => {
        $('#lblCartCount').html("0");
        $("#dvViewCarts").html('');
        if ($('body').find('#dvDetailsCartsProduct').length > 0) {
            $("#dvDetailsCartsProduct").html('');
        }
        if (LstCartproducts.length > 0) {
            //Cart Count update
            $('#lblCartCount').html(LstCartproducts.length);

            //View Cart update 
            $.each(LstCartproducts, function (index, value) {
                $("#dvViewCarts").append(`
                 <div id='dvCartWrapper_${index}' style="clear:both;display:black;border:1px solid #eee;height:100px;width:100%">
                    <div class="row" style="padding:5px;">
                        <div class="col col-sm-3">
                            <img src="${value.Image}" style="width:100px;" />
                        </div>
                        <div class="col col-sm-3">
                            <span>${value.Name}</span>
                        </div>
                        <div class="col col-sm-3">
                            <span>${value.Price}</span>
                        </div>
                        <div class="col col-sm-3">
                            <span id='delCartProduct_${index}' style='padding:3px;background:red;color:white;cursor:pointer' onclick="javascript:ProductController.DeleteFromCart(${index})">x</span>
                        </div>
                    </div>
                </div> 
                `);
            })

            //Checkout details update 
            if ($('body').find('#dvDetailsCartsProduct').length > 0) {
                $.each(LstCartproducts, function (index, value) {
                    $("#dvDetailsCartsProduct").append(`
                     <div id='dvChkOutCartWrapper_${index}' style="clear:both;display:black;border:1px solid #eee;height:100px;width:100%">
                        <div class="row" style="padding:5px;">
                            <div class="col col-sm-3">
                                <img src="${value.Image}" style="width:100px;" />
                            </div>
                            <div class="col col-sm-3">
                                <span>${value.Name}</span>
                            </div>
                            <div class="col col-sm-3">
                                <span>${value.Price}</span>
                            </div>
                            <div class="col col-sm-3">
                                <span id='delChkOutCartProduct_${index}' style='padding:3px;background:red;color:white;cursor:pointer' onclick="javascript:ProductController.DeleteFromCart(${index})">x</span>
                            </div>
                        </div>
                    </div>
                    `);
                })
            }

        }
    },
    PrepareCartForCheckoutUI: (url) => {
        if (LstCartproducts.length > 0) {
            localStorage.setItem("LstCartproducts", JSON.stringify(LstCartproducts));
            window.location.href = url;
        }
        else {
            alert('Cart Empty');
        }
    },
    LoadCartProductsForCheckout: () => {
        if (localStorage.getItem("LstCartproducts") != null && localStorage.getItem("LstCartproducts") != undefined) {
            LstCartproducts = JSON.parse(localStorage.getItem("LstCartproducts"));
            ProductController.ArrangeProductsForCart();
        }
    }
}