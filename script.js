const products = [
  {id:1,name:"Minimal Ceramic Vase",cat:"Decor",price:1299,icon:"🏺",badge:"NEW"},
  {id:2,name:"Modern Wall Mirror",cat:"Wall Decor",price:2499,icon:"🪞",badge:"POPULAR"},
  {id:3,name:"Warm Table Lamp",cat:"Lighting",price:2199,icon:"💡",badge:"NEW"},
  {id:4,name:"Decorative Plant Pot",cat:"Lifestyle",price:999,icon:"🪴",badge:""},
  {id:5,name:"Abstract Wall Art",cat:"Wall Decor",price:1599,icon:"🖼️",badge:"SALE"},
  {id:6,name:"Elegant Candle Set",cat:"Decor",price:1199,icon:"🕯️",badge:""},
  {id:7,name:"Woven Storage Basket",cat:"Lifestyle",price:1799,icon:"🧺",badge:""},
  {id:8,name:"Ambient LED Light",cat:"Lighting",price:1399,icon:"✨",badge:"POPULAR"}
];
let cart = JSON.parse(localStorage.getItem("mustafaCart") || "[]");
const productBox=document.getElementById("products"), count=document.getElementById("cartCount"), cartItems=document.getElementById("cartItems"), total=document.getElementById("cartTotal"), formTotal=document.getElementById("formTotal");
function money(n){return "Rs. "+n.toLocaleString("en-PK")}
function renderProducts(filter="All"){
  productBox.innerHTML="";
  products.filter(p=>filter==="All"||p.cat===filter).forEach(p=>{
    productBox.innerHTML+=`<article class="product">
      ${p.badge?`<span class="badge">${p.badge}</span>`:""}
      <div class="product-img">${p.icon}</div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.cat}</p><strong class="price">${money(p.price)}</strong><button class="add" onclick="addToCart(${p.id})">ADD +</button></div>
    </article>`;
  });
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("mustafaCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  count.textContent=cart.reduce((a,x)=>a+x.qty,0);
  const sum=cart.reduce((a,x)=>a+x.price*x.qty,0);
  total.textContent=formTotal.textContent=money(sum);
  if(!cart.length){cartItems.innerHTML='<p class="empty">Your cart is empty.</p>';return}
  cartItems.innerHTML=cart.map(x=>`<div class="cart-row"><div class="cart-thumb">${x.icon}</div><div><h4>${x.name}</h4><small>${money(x.price)} × ${x.qty}</small></div><button class="remove" onclick="removeItem(${x.id})">×</button></div>`).join("");
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
const cartPanel=document.getElementById("cart"), overlay=document.getElementById("overlay"), modal=document.getElementById("modal");
function openCart(){cartPanel.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts(btn.dataset.filter)});
document.querySelectorAll(".categories a").forEach(a=>a.onclick=()=>{const f=a.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));setTimeout(()=>renderProducts(f),0)});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length){alert("Your cart is empty.");return} closeCart();modal.classList.add("show");formTotal.textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0))};
document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
document.getElementById("orderForm").onsubmit=e=>{e.preventDefault();const name=document.getElementById("name").value;const phone=document.getElementById("phone").value;const city=document.getElementById("city").value;const address=document.getElementById("address").value;const lines=cart.map(x=>`${x.name} x${x.qty}`).join(", ");const msg=`New COD Order%0AName: ${name}%0APhone: ${phone}%0ACity: ${city}%0AAddress: ${address}%0AProducts: ${lines}%0ATotal: ${formTotal.textContent}`;window.open(`https://wa.me/923001234567?text=${msg}`,"_blank");};
renderProducts();renderCart();
