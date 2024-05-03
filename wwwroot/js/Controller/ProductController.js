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
        /*if (localStorage.getItem("LstCartProducts") != undefined && localStorage.getItem("LstCartProducts") != null) {
            var products = localStorage.getItem("LstCartProducts") ;
            $.each(products, function (index, value) {
                console.log(value)
                //LstCartproducts.push(JSON.parse(value))
            })
             
        }*/
        //console.log("----------Existing product---------");
        //console.log(LstCartproducts);

        var targetIndex = $(cntrl).attr("id").split('_')[1];
        var targetImage = $('#pdPicture_' + targetIndex).attr('src');
        var targetName = $('#pdName_' + targetIndex).html();
        var targetPrice = $('#pdPrice_' + targetIndex).html();

        $('#lblCartCount').html(parseInt($('#lblCartCount').html()) + 1);

        var targetProduct =
        {
            Image: targetImage,
            Name: targetName,
            Price: targetPrice
        }
        LstCartproducts.push(targetProduct);
        //localStorage.setItem("LstCartProducts", JSON.stringify(LstCartproducts) ); 
        //console.log("----------After adding new product---------");
        //console.log(LstCartproducts);

        alert("Product added to cart")
    },
    ViewCart: () => {
        if (LstCartproducts.length > 0) {
            $("#dvViewCarts").html('');
            $.each(LstCartproducts, function (index, value) {
                $("#dvViewCarts").append(`
                 <div style="clear:both;display:black;border:1px solid #eee;height:100px;width:100%">
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
                            <span>x</span>
                        </div>
                    </div>
                </div> 
                `);
            })
        }

        if ($("#dvViewCarts").css('right') == "0" || $("#dvViewCarts").css('right') == "0px") {
            $("#dvViewCarts").animate({
                right: "-300"
            }, "fast");
        }
        else {
            $("#dvViewCarts").animate({
                right: "0"
            }, "fast");
        }
    }
}