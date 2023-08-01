let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads   = document.getElementById('ads');
let discount = document.getElementById('discount');
let total    = document.getElementById('total');
let count    = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchTitle = document.getElementById('search-title');
let searchCategory = document.getElementById('search-category');
let deletAll = document.getElementById( 'deleteAll' );
let tbody = document.getElementById( 'tbody' );
let mode = "create";
let tmp;
let currentTime = new Date();
let date=currentTime.toLocaleDateString( "en-UK")
let time = currentTime.toLocaleTimeString( "en-US", { hour: 'numeric', minute: '2-digit', } )
let dark = document.querySelector( '#dark-mode' );
let light = document.querySelector( '#light-mode' );
let searchIcon = document.querySelector( '#search-icon' );
let selectLang = document.querySelector( '#select-lang' );
let USA= document.querySelector( '#USA-flag' );
let EGY = document.querySelector( '#EGY-flag' );
let empty = document.querySelector( '#empty' );

//switch language
const translations = {
  english: {
    hedTitle: "Product Management",
    discretion: "Application For Management any Products",
    english: "English",
    arabic: "Arabic",
    Create: "Create",
    SearchTi: "Search By Title",
    SearchCa: "Search By Category",
    deleteAll: "Delete All",
    ID: "ID",
    TITLE: "Title",
    PRICE: "Price",
    TAX: "TAX",
    ADS: "ADS",
    DISC: "DISC",
    TOTAL: "Total",
    CATEGORY: "Category",
    DATE: "Date",
    TIME: "Time",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
  },
  arabic: {
    hedTitle: "إدارة المنتجات",
    discretion: "تطبيق لإدارة  مختلف انواع المنتجات",
    english: "الأنجليزيه",
    arabic: "العربية",
    Create: "إنشاء منتج",
    SearchTi: "بحث بواسطة العنوان",
    SearchCa: "بحث بواسطة الصنف",
    deleteAll: "حذف الكل",
    ID: "الرقم",
    TITLE: "العنوان",
    PRICE: "السعر",
    TAX: "ضرائب",
    ADS: "اعلانات",
    DISC: "خصم",
    TOTAL: "المجموع",
    CATEGORY: "الصنف",
    DATE: "التاريخ",
    TIME: "الوقت",
    UPDATE: "تحديث",
    DELETE: "حذف",
  }
};
function switchLanguage(lang){
  const element = document.querySelectorAll( "[data-lang]" );
  element.forEach(( element) =>{
    const transKey = element.getAttribute( "data-lang" )
    element.textContent = translations[ lang ][ transKey ];
  })
}

// Select Language
selectLang.addEventListener( 'change', function(){
  switchLanguage( selectLang.value );
  if ( selectLang.value == 'arabic' ){
    document.dir = "rtl";
    EGY.style.display = "block";
    USA.style.display = "none";
    searchIcon.style.right = "10px";
    selectLang.value = 'arabic';
    localStorage.setItem( 'selectedLang', 'arabic' );
    date = currentTime.toLocaleDateString( "ar-EG" );
    time = currentTime.toLocaleTimeString( "ar-EG", { hour: 'numeric', minute: '2-digit', } );
    title.setAttribute( "placeholder", "عنوان المنتج" );
    price.setAttribute( "placeholder", "سعر المنتج" );
    taxes.setAttribute( "placeholder", "الضرائب" );
    ads.setAttribute( "placeholder", " الأعلانات" );
    discount.setAttribute( "placeholder", "الخصم" );
    count.setAttribute( "placeholder", " الكميه" );
    category.setAttribute( "placeholder", " الصنف" );
    search.setAttribute( "placeholder", " بحث" );
    total.setAttribute( 'data-before', 'المجموع : ' );
  }
  else if ( selectLang.value == 'english' )
  {
    document.dir = "ltr";
    USA.style.display = "block";
    EGY.style.display = "none";
    searchIcon.style.left = "10px";
    selectLang.value = 'english';
    localStorage.setItem( 'selectedLang', 'english' );
    date = currentTime.toLocaleDateString( "en-UK" );
    time = currentTime.toLocaleTimeString( "en-US", { hour: 'numeric', minute: '2-digit', } );
    title.setAttribute( "placeholder", "title" );
    price.setAttribute( "placeholder", "price" );
    taxes.setAttribute( "placeholder", "taxes" );
    ads.setAttribute( "placeholder", "ads" );
    discount.setAttribute( "placeholder", "discount" );
    count.setAttribute( "placeholder", "count" );
    category.setAttribute( "placeholder", "category" );
    search.setAttribute( "placeholder", "search" );
    total.setAttribute( 'data-before', 'Total : ' );
  }
  showData()
} )
// Save The selectedLang in localStorage
if ( localStorage.getItem( 'selectedLang' ) === 'arabic' ) { 
  document.dir="rtl";
  EGY.style.display = "block";
  USA.style.display = "none";
  searchIcon.style.right = "10px";
  selectLang.value = 'arabic'
  date = currentTime.toLocaleDateString( "ar-EG" )
  time = currentTime.toLocaleTimeString( "ar-EG", { hour: 'numeric', minute: '2-digit', } )
  title.setAttribute("placeholder","عنوان المنتج")
  price.setAttribute("placeholder","سعر المنتج")
  taxes.setAttribute("placeholder","الضرائب")
  ads.setAttribute("placeholder"," الأعلانات")
  discount.setAttribute("placeholder","الخصم")
  count.setAttribute("placeholder"," الكميه")
  category.setAttribute("placeholder"," الصنف")
  search.setAttribute( "placeholder", " بحث" )
  total.setAttribute( 'data-before', 'المجموع : ' )
    switchLanguage( selectLang.value );
}else{
  document.dir="ltr";
  USA.style.display = "block";
  EGY.style.display = "none";
  localStorage.setItem( 'selectedLang', 'english' );
  searchIcon.style.left = "10px";
  selectLang.value = 'english';
  date = currentTime.toLocaleDateString( "en-UK" )
  time = currentTime.toLocaleTimeString( "en-US", { hour: 'numeric', minute: '2-digit', } )
  title.setAttribute("placeholder","Title")
  price.setAttribute("placeholder","Price")
  taxes.setAttribute("placeholder","Taxes")
  ads.setAttribute("placeholder","Ads")
  discount.setAttribute("placeholder","Discount")
  count.setAttribute("placeholder","Count")
  category.setAttribute("placeholder","Category")
  search.setAttribute( "placeholder", "Search" )
  total.setAttribute( 'data-before', 'Total : ' )
  switchLanguage(selectLang.value);
}

// The Them Mode 
dark.addEventListener('click', function(){
  document.body.classList.add( 'dark' );
  localStorage.setItem( "mode", "dark" );
  light.style.display = "block";
  dark.style.display = "none";
} )
light.addEventListener( "click",  ()=> {
  document.body.classList.remove( "dark" )
  localStorage.setItem( "mode", "light" );
  dark.style.display = "block";
  light.style.display = "none";
} );

// Save The Them Mode in localStorage
if (localStorage.getItem("mode")==="dark") {
  document.body.classList.add( "dark" );
  light.style.display = "block";
  dark.style.display = "none";
}else{
  document.body.classList.remove( "dark" )
};

//Save Date In Session Storage
  function saveSession(){
    sessionStorage.setItem("title", title.value)
    sessionStorage.setItem("price", price.value)
    sessionStorage.setItem("taxes", taxes.value)
    sessionStorage.setItem("ads", ads.value)
    sessionStorage.setItem("discount", discount.value )
    sessionStorage.setItem("total", total.innerHTML )
    sessionStorage.setItem("count", count.value)
    sessionStorage.setItem( "category", category.value )
  }
  if (sessionStorage.key( "title" ) )
  {title.value = sessionStorage.getItem( "title" ); }
  if (sessionStorage.key( "price" ) )
  {price.value = sessionStorage.getItem( "price" ); }
  if (sessionStorage.key( "taxes" ) )
  {taxes.value = sessionStorage.getItem( "taxes" ); }
  if (sessionStorage.key( "ads" ) )
  {ads.value = sessionStorage.getItem( "ads" ); }
  if (sessionStorage.key( "discount" ) )
  {discount.value = sessionStorage.getItem( "discount" ); }
  if ( sessionStorage.key( "total" ) )
  {total.innerHTML = sessionStorage.getItem( "total" );}
  if (sessionStorage.key( "count" ) )
  {count.value = sessionStorage.getItem( "count" ); }
  if (sessionStorage.key( "category" ) )
  {category.value = sessionStorage.getItem( "category" ); }

//getTotal price
function getTotal () { 
    if(price.value !== ''){
      let result =( +price.value + +taxes.value + +ads.value) - +discount.value;
      total.textContent = result;
        total.style.background = "#008a61";
    }
    else if(price.value == ''){
      total.innerHTML = ` `;
      total.style.background="#212121"
    }
}


window.onkeyup =()=>{
  getTotal();
  saveSession();
}; 

window.onload =()=>{
  if (!price.value == '' ) { 
    total.style.background = "#008a61";
  }else if (price.valueL == '' ){
    total.style.background = "#212121";
  }
}; 

// clearData after create product
function clearData(){
  title.value="";  
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  total.innerHTML="";
  count.value="";
  category.value = "";
  total.style.background = "#212121"
}

// create product
let dataPro = [];
if (localStorage.product) {
  try {
    dataPro = JSON.parse(localStorage.product);
  } catch (error) {
    console.log(error);
  }
} else {
  dataPro = [];
}
create.onclick = function (){
  sessionStorage.clear()
  let pound;
  if(selectLang.value == 'arabic'){
    pound = 'ج.م'
  } else if ( selectLang.value == 'english' ){
    pound = '£'
  }
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
    date:date,
    time: time,
    pound:pound
  };
  if ( title.value != '' && price.value != '' && category.value != '' ) { 
    if ( mode === "create" ){
      if(selectLang.value ==  'arabic'){
        create.innerHTML = "إنشاء منتج"
      }else{
        create.innerHTML = "Create"
      }
      if(newPro.count >1){
        for ( var i = 0; i < newPro.count; i++){
          dataPro.push( newPro );
        }
        }else{
        dataPro.push( newPro );
      }
    }else if ( mode === "update" ){
      dataPro[ tmp ] = newPro;
      mode = "create";
      count.style.display = "block";
      if(selectLang.value ==  'arabic'){
        create.innerHTML = "إنشاء المنتج"
      }else{
        create.innerHTML = "create";
      }
    }
    localStorage.setItem( 'product', JSON.stringify( dataPro ) );
  }else{
    alert( 'Please Input Your Primary Data ( Title , Price , Category )')
  }
  clearData();
  showData();;
  title.focus()
};

// showData in table
function showData (){
  let update;
  let delet;
  if(selectLang.value == 'arabic'){
    update = 'تحديث'
    delet = 'حذف'
    pound ='ج.م'
  } else if ( selectLang.value == 'english' ){
    update = 'Update'
    delet = 'Delete'
  }
  table = ' '
  for ( let i = 0; i < dataPro.length; i++ ) { 
    table += `
    <tr>
    <td>${[i+1]}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total} ${dataPro[i].pound}</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].date}</td>
    <td>${dataPro[i].time}</td>
    <td><button class="btn update">${update}</button></td>
    <td><button class="btn delete">${delet}</button></td>
  </tr>
    `
  }
  tbody.innerHTML = table
  if(dataPro.length >1){
    deletAll.style.display = 'block'
  }else{
    deletAll.style.display = 'none'
  }
  deleteItem();
  updateItem();
}
showData();

// deleteItem
function deleteItem() {
  let delet = document.querySelectorAll('.delete');
  delet.forEach(function(del) {
    del.onclick = ()=> {
      let index = del.parentNode.parentNode.rowIndex - 1;
      dataPro.splice(index , 1);
      localStorage.product= JSON.stringify(dataPro);
      showData();
    }
  });
}

//update item
function updateItem(){
  let update = document.querySelectorAll( '.update' )
  update.forEach( function(upd){
    upd.onclick = ()=> {
      window.scrollTo({top:0})
      let index = upd.parentNode.parentNode.rowIndex - 1;
      title.value = dataPro[ index ].title
      price.value = dataPro[ index ].price
      taxes.value = dataPro[ index ].taxes
      ads.value = dataPro[ index ].ads
      discount.value = dataPro[ index ].discount
      getTotal();
      total.value = dataPro[ index ].total
      count.style.display="none"
      category.value = dataPro[ index ].category
      if(selectLang.value ==  'arabic'){
        create.innerHTML = "تحديث المنتج"
      }else{
        create.innerHTML = "update"
      }
      mode = "update";
      tmp = index
    }
  } );
}
updateItem()

// deleteAll items
  deletAll.onclick=()=>{
    let confirmMsg = confirm( "Are You Sure Delete All Items ?" );
    if ( confirmMsg == true ) { 
      localStorage.clear()
      dataPro.splice( 0 )
      showData();
    }
  }

//search in items
function searchItems (){
  let value = search.value;
  for ( var i = 0; i < dataPro.length; i++ ){
    if ( dataPro[ i ].title.includes( value ) ){
      console.log("true")
    }else{
      console.log("false")
    }
  }
}
search.onkeyup = function(){
  searchItems()
}


