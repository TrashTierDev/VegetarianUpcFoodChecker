document.getElementById('darkMode').onclick = changeToDarkMode
document.getElementById('lightMode').onclick = changeToLightMode

function changeToDarkMode(){
    document.querySelector('body').style.backgroundColor ='black'
    document.querySelector('h1').style.color='lightpink'
    document.querySelector('label').style.color='lightpink'
    document.querySelector('h2').style.color='lightpink'
    document.querySelector('input').style.color='lightpink'
    document.querySelector('input').style.backgroundColor='black'
    document.querySelector('button').style.backgroundColor='black'
    document.querySelector('button').style.color='lightpink'
    const nodeList = document.querySelectorAll('th');
    for (i = 0; i <nodeList.length;i++){nodeList[i].style.color='lightpink'}
    const nodeList1 = document.querySelectorAll('th');
   for (i = 0; i <nodeList1.length;i++){nodeList1[i].style.backgroundColor='black'}
   const nodeList2 = document.querySelectorAll('th');
   for (i = 0; i <nodeList2.length;i++){nodeList2[i].style.borderColor='white'}
   const nodeList3 = document.querySelectorAll('td');
   for (i = 0; i <nodeList3.length;i++){nodeList3[i].style.color='lightpink'}
   const nodeList4 = document.querySelectorAll('td');
  for (i = 0; i <nodeList4.length;i++){nodeList4[i].style.backgroundColor='black'}
  const nodeList5 = document.querySelectorAll('td');
  for (i = 0; i <nodeList5.length;i++){nodeList5[i].style.borderColor='white'}
  const nodeList6 = document.querySelectorAll('.unknownMaybe');
  for (i = 0; i <nodeList6.length;i++){nodeList6[i].style.backgroundColor='yellow'}
  const nodeList7 = document.querySelectorAll('.non-veg-item');
  for (i = 0; i <nodeList7.length;i++){nodeList7[i].style.backgroundColor='red'}
    document.querySelector('button').style.borderColor='white'
    document.querySelector('input').style.borderColor='white'
}

function changeToLightMode(){
    document.querySelector('body').style.backgroundColor ='white'
   document.querySelector('h1').style.color='lightblue'
   document.querySelector('label').style.color='lightblue'
   document.querySelector('h2').style.color='lightblue'
   document.querySelector('input').style.color='lightblue'
   document.querySelector('input').style.backgroundColor='white'
   document.querySelector('input').style.borderColor='black'
   document.querySelector('button').style.backgroundColor='white'
   document.querySelector('button').style.color='lightblue'
   const nodeList = document.querySelectorAll('th');
   for (i = 0; i <nodeList.length;i++){nodeList[i].style.color='lightblue'}
   const nodeList1 = document.querySelectorAll('th');
   for (i = 0; i <nodeList1.length;i++){nodeList1[i].style.backgroundColor='white'}
   const nodeList2 = document.querySelectorAll('th');
   for (i = 0; i <nodeList2.length;i++){nodeList2[i].style.borderColor='black'}
   const nodeList3 = document.querySelectorAll('td');
   for (i = 0; i <nodeList3.length;i++){nodeList3[i].style.color='lightblue'}
   const nodeList4 = document.querySelectorAll('td');
   for (i = 0; i <nodeList4.length;i++){nodeList4[i].style.backgroundColor='white'}
   const nodeList5 = document.querySelectorAll('td');
   for (i = 0; i <nodeList5.length;i++){nodeList5[i].style.borderColor='black'}
   const nodeList6 = document.querySelectorAll('.unknownMaybe');
  for (i = 0; i <nodeList6.length;i++){nodeList6[i].style.backgroundColor='yellow'}
  const nodeList7 = document.querySelectorAll('.non-veg-item');
  for (i = 0; i <nodeList7.length;i++){nodeList7[i].style.backgroundColor='red'}
   document.querySelector('button').style.borderColor='black'
}

function getFetch(){
    let inputVal = document.getElementById('barcode').value

if (inputVal.length !==12){
    alert (`Please ensure that barcode is 12 characters`)
    return;
}

    const url =`https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`


fetch(url)
    .then(res => res.json())
    .then (data => {
        console.log(data)
        if (data.status === 1){
            const item = new ProductInfo(data.product)
            item.showInfo()
            item.listIngredients()
        //call additonal stuff
        } else if (data.status === 0){
            alert(`Product ${inputVal} not found. Please check barcode and try again.`)
        }
    })
    .catch (err => {
        console.log(`error ${err}`)
    });
}

    class ProductInfo {
        constructor(productData){//i am passing in data.product
            this.name = productData.product_name
            this.ingredients = productData.ingredients
            this.image = productData.image_url
        }

        showInfo(){
        document.getElementById('product-img').src =this.image
        document.getElementById('product-name').innerText =this.name
        }

        listIngredients(){
            let tableRef =document.getElementById('ingredient-table')
            for( let i= 1; i < tableRef.rows.length;){
                tableRef.deleteRow(i);
            }
            if(!(this.ingredients == null)){
            for(let key in this.ingredients) {
                let newRow = tableRef.insertRow(-1)
                let newICell = newRow.insertCell(0)
                let newVCell = newRow.insertCell(1)
                let newIText = document.createTextNode(this.ingredients[key].text)
                let vegStatus = this.ingredients[key].vegetarian == null ?'unknown' : this.ingredients[key].vegetarian
                let newVText = document.createTextNode(vegStatus)
                newICell.appendChild(newIText)
                newVCell.appendChild(newVText)
                if(vegStatus === 'yes'){
                    newVCell.classList.add('veg-item')
                } else if (vegStatus === 'no'){
                    newVCell.classList.add('non-veg-item')
                } else if (vegStatus === 'unknown' || vegStatus === 'maybe')
                    newVCell.classList.add('unknownMaybe')
                }
            }
        }
    }

