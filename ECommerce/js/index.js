const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

const navLeft = menu.getBoundingClientRect().left;
navOpen.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.add("show");
    document.body.classList.add("show");
    navBar.classList.add("show");
  }
});

navClose.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.remove("show");
    document.body.classList.remove("show");
    navBar.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  if (!link) return;
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready(){

  var remove_cartitems = document.getElementsByClassName('remove_button')
  console.log(remove_cartitems)
  for(var i=0; i < remove_cartitems.length; i++){
    var button = remove_cartitems[i]
    updatecartTotal()
    button.addEventListener('click',removecartItem)
  }
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    console.log(quantityInputs)
    for(var i = 0; i < quantityInputs.length; i++){
      var inputs = quantityInputs[i]
      inputs.addEventListener('change', quantityChanged)
    }
    let prname
    let prprice
    let prlink
    prname = localStorage.getItem("pname")
    prprice = localStorage.getItem("pprice")
    prlink = localStorage.getItem("imagelink")

   var mytable = document.getElementById("total")
    console.log(mytable)
    var rowval= document.getElementsByClassName("cart-itemprice")[0].innerText = prprice
    console.log(rowval)
    var rowname= document.getElementsByClassName("cart-pname")[0].innerText = prname
    var rowlink= document.getElementsByClassName("productlink")[0].src = prlink
    var newrow = mytable.insertRow()
   updatecartTotal()
}
function ordercomplete(){
  alert("ORDER PLACED!");
  window.location.href='index.html';
}
function submitbtn(){
  alert("DETAILS  SAVED!");
  window.location.href='index.html';
}
function login(){
  alert("LOGGED IN SUCESSFULLY!");
  window.location.href='index.html';
}
function register(){
  window.location.href='newaccount.html';
}
function account(){
  alert("Registered!");
  window.location.href='index.html';
}
function removecartItem(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
  updatecartTotal()
}

function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value)){
    input.value = 1
  }
  updatecartTotal()
}

function updatecartTotal(){
  var cartItemContainer = document.getElementsByClassName("container-md cart")[0]
  var cartRows = cartItemContainer.getElementsByClassName("cart-row")
  var total = 0
  var subtotal = 0
  for(var i=0; i < cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-itemprice')[0]
    var quantityElement = cartRow.getElementsByClassName("cart-quantity")[0]
    var price = parseFloat(priceElement.innerText.replace('₹',''))
    var quantity = quantityElement.value
    subtotal = price * quantity
    document.getElementsByClassName('sub-total')[i].innerText = '₹' + subtotal
    total = total + (price * quantity)
  }
  document.getElementsByClassName('total-cart')[0].innerText = '₹' + total
}


let linkname
let image
linkname = localStorage.getItem("name")
image = localStorage.getItem("image")
pdname = document.getElementsByClassName('changePD')[0].innerText = linkname
console.log(pdname)
addimsliced = image.slice(46)
var point = '.'
addfin = point.concat(addimsliced)
localStorage.setItem("imagelink",addfin)
addim = document.getElementsByClassName("changeImage")[0].src = addfin

var getlinks = document.getElementsByClassName("clicktocart")
var getlink = getlinks[0]
console.log(getlinks)
for(var i=0; i < getlinks.length; i++){
  var getlink = getlinks[i]
  getlink.addEventListener('click', addtocart)
}

function addtocart(event){
    var buttonclicked = event.target
    var linkname = buttonclicked.parentElement.parentElement
    var pname = linkname.innerText.split('\n')[0]
    var pprice = linkname.innerText.split('\n')[1]
    localStorage.setItem("pname",pname)
    localStorage.setItem("pprice",pprice)
}

