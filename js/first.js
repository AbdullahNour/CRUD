
var productContainer;

if (localStorage.getItem("productData") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productData"));
    displayproducts();
}
var inpus = document.getElementsByClassName("form-control");

function validateForm(userName)
{
    var userNameRegex = /^[A-Z][a-z]{3,8}/;
    if(userNameRegex.test(userName) == false)
    {
        document.getElementById("addbtn").disabled = true;
    }
    else
    {
        document.getElementById("addbtn").removeAttribute("disabled");
    }
    
}



function imgReader()
{
    let productImg = document.getElementById("productImgInp");
    const file = productImg.files[0];
    if(file)
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load",function(){
            imgURL = this.result;
        }) 
    }
   
}


function addProduct() {

    var productName = document.getElementById("productNameInp").value;
    var productPrice = document.getElementById("productPriceInp").value;
    var productCategory = document.getElementById("productCategoryInp").value;
    var productDesc = document.getElementById("productDescInp").value;
    var productImg = imgURL;
    var product =
        {
            name: productName,
            price: productPrice,
            category: productCategory,
            Desc: productDesc,
            img :productImg
        };

    productContainer.push(product);
    localStorage.setItem("productData", JSON.stringify(productContainer));
    document.getElementById("addbtn").innerHTML = "add product";
    displayproducts();
    clearForm();
}

function displayproducts() {
    var temp = ``;
    for (var i = 0; i < productContainer.length; i++) {
        temp += ` <div class="col-md-3 mb-4">
        <div class="product">
            <div class="product-img">
                <img class="img-fluid" src=`+productContainer[i].img+`>
            </div>
            <h4>`+ productContainer[i].name + `
            <span class="ml-3 badge badge-info">`+ productContainer[i].category + `</span>
            </h4>
            <p>`+ productContainer[i].Desc + `</p>
            <div class="price">`+ productContainer[i].price +`</div>
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-sm btn-outline-danger">delete</button>
            <button onclick="updateProduct(`+ i + `)" class="btn btn-sm btn-outline-warning">update</button>
        </div>
    </div>`;
    }
    document.getElementById("productsRow").innerHTML = temp;

}

function searchProducts(term) {
    var temp = ``;

    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            temp += ` <div class="col-md-3 mb-4">
            <div class="product">
                <div class="product-img">
                    <img class="img-fluid" src=`+productContainer[i].img+`>
                </div>
                <h4>`+ productContainer[i].name + `
                <span class="ml-3 badge badge-info">`+ productContainer[i].category + `</span>
                </h4>
                <p>`+ productContainer[i].Desc + `</p>
                <div class="price">`+ productContainer[i].price + `</div>
                <button onclick="deleteProduct(`+ i + `)" class="btn btn-sm btn-outline-danger">delete</button>
               <button  onclick="updateProduct(`+ i + `)" class="btn btn-sm btn-outline-warning">update</button>
            </div>
        </div>`;
        }
    }
    document.getElementById("productsRow").innerHTML = temp;
}


function deleteProduct(indx) {
    var deleted = productContainer.splice(indx, 1);
    localStorage.setItem("productData", JSON.stringify(productContainer));
    displayproducts();

}


function updateProduct(indx)
{
    
    document.getElementById("productNameInp").value = productContainer[indx].name;
    document.getElementById("productPriceInp").value = productContainer[indx].price;
    document.getElementById("productCategoryInp").value = productContainer[indx].category;
    document.getElementById("productDescInp").value = productContainer[indx].Desc;
    productImg = productContainer[indx].img;
    document.getElementById("addbtn").innerHTML = "Update";
    deleteProduct(indx);
}


function clearForm()
{
    for(var i = 0 ; i < inpus.length ; i++)
    {
        inpus[i].value ="";
        productImg.value="";
    }

}




