var LstCartproducts = [];

var ProductController = {
    LoadProductCategory: (pUrl) => {
        let LiCategories = ""; 
        ProductService.LoadCategories(function (response) {  
            $.each(response, function (index, value) {
                LiCategories = LiCategories + `<a href="${pUrl}?CategoryName=${value}">${value}</a><br />`;
            })   
            $('#ulMenu').html(LiCategories);
        }) 
    },
    LstCategoryProducts: (CategoryName) => {
        ProductService.LoadProductByCategory(CategoryName,function (response) {
            let productContent = '';
            $.each(response.products, function (index, value) {
                productContent = productContent + `
                    <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id='pdPicture_${value.id}' src="${value.thumbnail}" onclick="window.location.href='/Product/SingleProduct/${value.id}'" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content">
                                <h4 id='pdName_${value.id}' onclick="window.location.href='/Product/SingleProduct/${value.id}'">${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${value.id}'>${value.price}</b></p>
                                        <a href="#" class="btn btn-primary" id='btnPdAddToCart_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
                            </div>
                        </div>
                    </div> 
					`;

            })
            $('#dvProductList').html(productContent);
        })
    },
    LstProducts: () => {
        ProductService.LstProducts(function (response) {
            let productContent = ''; 
            $.each(response.products, function (index, value) { 
                productContent = productContent + `
                    <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id='pdPicture_${value.id}' src="${value.thumbnail}" onclick="window.location.href='/Product/SingleProduct/${value.id}'" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content">
                                <h4 id='pdName_${value.id}' onclick="window.location.href='/Product/SingleProduct/${value.id}'">${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price"><strike>${value.price}</strike> <b id='pdPrice_${value.id}'>${value.price}</b></p>
                                        <a href="#" class="btn btn-primary" id='btnPdAddToCart_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
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
            id: targetIndex,
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
            if (targetIndex != value.id) {
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
                 <div id="dvCartWrapper_${value.id}" style="clear:both;display:black;border:1px solid #eee;height:100px;width:100%">
                    <div class="row" style="padding:5px;">
                        <div class="col col-sm-3">
                            <img src="${value.Image}" style="width:100px;" onclick="window.location.href='/Product/SingleProduct/${value.id}'"/>
                        </div>
                        <div class="col col-sm-3">
                            <span onclick="window.location.href='/Product/SingleProduct/${value.id}'">${value.Name}</span>
                        </div>
                        <div class="col col-sm-3">
                            <span>${value.Price}</span>
                        </div>
                        <div class="col col-sm-3">
                            <span id="delCartProduct_${value.id}" style="padding:3px;background:red;color:white;cursor:pointer" onclick="javascript:ProductController.DeleteFromCart(${value.id})">x</span>
                        </div>
                    </div>
                </div> 
                `);
            })

            //Checkout details update 
            if ($('body').find('#dvDetailsCartsProduct').length > 0) {
                $.each(LstCartproducts, function (index, value) {
                    $("#dvDetailsCartsProduct").append(`
                     <div id='dvChkOutCartWrapper_${value.id}' style="clear:both;display:black;border:1px solid #eee;height:100px;width:100%">
                        <div class="row" style="padding:5px;">
                            <div class="col col-sm-3">
                                <img src="${value.Image}" style="width:100px;" onclick="window.location.href='/Product/SingleProduct/${value.id}'"/>
                            </div>
                            <div class="col col-sm-3">
                                <span onclick="window.location.href='/Product/SingleProduct/${value.id}'">${value.Name}</span>
                            </div>
                            <div class="col col-sm-3">
                                <span>${value.Price}</span>
                            </div>
                            <div class="col col-sm-3">
                                <span id='delChkOutCartProduct_${value.id}' style='padding:3px;background:red;color:white;cursor:pointer' onclick="javascript:ProductController.DeleteFromCart(${value.id})">x</span>
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
    LoadCartCommon: () => {
        if (localStorage.getItem("LstCartproducts") != null && localStorage.getItem("LstCartproducts") != undefined) {
            LstCartproducts = JSON.parse(localStorage.getItem("LstCartproducts"));
            ProductController.ArrangeProductsForCart();
        }
    },
    SingleProduct: (ProductID) => {
        ProductService.SingleProduct(ProductID, function (response) {
            
            var ImageHtml=''
            $.each(response.images, function (index, value) {
                if (index == 0) {
                    ImageHtml = ImageHtml + `
                    <div class="col" style="width:100px;height:100px;">
                            <img src="${value}" onclick="javascript:$('#imgTargetBigView').attr('src','${value}')" style="width:100px;height:100px" />
                        </div>
                    `
                }
                else {
                    ImageHtml = ImageHtml + `
                    <div class="col" style="width:100px;height:100px;margin-left:5px">
                            <img src="${value}" onclick="javascript:$('#imgTargetBigView').attr('src','${value}')" style="width:100px;height:100px" />
                        </div>
                    `
                }
            })

            $('#dvSignleViewProduct').html(
                `
                <div class="row">
                <div class="col col-4">
                    <div class="row">
                        <div class="col col-12" style="width:500px;height:264px">
                            <img id="imgTargetBigView" src="${response.images[0]}" style="width:100%;height:264px" />
                        </div>
                    </div>
                    <div class='row' style="margin-top:10px;width:500px;height:210px;overflow:auto">
                       ${ImageHtml}
                    </div>
                </div>
                <div class="col col-8">
                    <span>${response.title}</span><br />
                    <span> ${response.description} </span><br />
                    <span> ${response.price} </span><br />
                    <span class='btn btn-primary'> Add To Cart </span><br />
                </div>
            </div>
                `
            );
        })
    }

}