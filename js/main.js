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
let minutes = currentTime.getMinutes();
let hours = currentTime.getHours();
let day = currentTime.getDate();
let month = currentTime.getMonth();
let year = currentTime.getFullYear();

// result for total price
function getTotal () { 
    if(price.value !== ''){
      let result =( +price.value + +taxes.value + +ads.value) - +discount.value;
      total.textContent  = result;
      total.style.background="#068d28"
    }
    else if(price.value == ''){
      total.innerHTML = ` `;
      total.style.background="#a5aabd"
    }
  }
window.onkeyup =()=>{
  getTotal();

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
  total.style.background = "#a5aabd"
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
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
      day:day,
      month: month,
      year: year,
      hours: hours,
      minutes:minutes,
  };
  if ( title.value != '' && price.value != ''&& category.value != '' ) { 
    if ( mode === "create" ){
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
      create.innerHTML = "Create";
    }
    localStorage.setItem( 'product', JSON.stringify( dataPro ) );
  }else{
    alert( 'Please Input Your Primary Data ( Title , Price , Category )')
  }
  clearData();
  showData();
  title.focus()
};

// showData in table
function showData (){
  table = ' '
  for ( let i = 0; i < dataPro.length; i++ ) { 
    table += `
    <tr>
    <td>${[i+1]}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price} £</td>
    <td>${dataPro[i].taxes} £</td>
    <td>${dataPro[i].ads} £</td>
    <td>${dataPro[i].discount} £</td>
    <td>${dataPro[i].total} £</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].day + "/" + (dataPro[i].month + 1) + "/" + dataPro[i].year}</td>
    <td>${dataPro[i].hours + ":" + dataPro[i].minutes}</td>
    <td><button class="btn update">UPDATE</button></td>
    <td><button class="btn delete">DELETE</button></td>
  </tr>
    `
  }
  tbody.innerHTML = table
  if(dataPro.length >1){
    deletAll.innerHTML = `Delete All`
    deletAll.classList.add('btn')
  }else{
    deletAll.innerHTML = ` `;
    deletAll.classList.remove('btn')
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
      create.innerHTML = "Update"
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
