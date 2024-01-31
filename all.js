data = [];
dataChk = [];
dataResult = [];
const btn_grp = document.querySelector(".button-group");
const btns = document.querySelectorAll(".button-group button");
const search_input = document.querySelector(".crop-input input");
const search_btn = document.querySelector(".search");
const showList = document.querySelector(".showList");
const showKey = document.querySelector(".show-keyword");
const sort_select = document.querySelector(".sort-select");

axios.get('https://hexschool.github.io/js-filter-data/data.json').then(function(response){
    data = response.data;
    data.forEach(function(prod_itm, prod_idx){
        let str_prodType = prod_itm.種類代碼;
        let str_prodName = prod_itm.作物名稱;
        if (str_prodType !== null && str_prodName !== null){
            if (str_prodType.trim() !== "" && str_prodType.trim() !== ""){
                dataChk.push(prod_itm);
            }
        }
    })
});
//btn_filter
btn_grp.addEventListener('click', function(e){
    if (e.target.type !== "button"){
        return;
    }
    search_input.value = "";
    sort_select.value = "排序篩選";
    for(var i=0 ; i<btns.length ; i++){
        if (btns[i].textContent == e.target.textContent)
        {
            btns[i].setAttribute("class", "active");
            let prodType = e.target.getAttribute("data-type")
            let prodFileter = dataChk.filter(function(type_itm){
                return type_itm.種類代碼 == prodType;
            })
            renderData(prodFileter);
            showKeyword(btns[i].textContent);
        }else{
            btns[i].setAttribute("class", "");
        }
        
    }
})
//input_filter
search_btn.addEventListener('click', function(e){
    if (search_input.value == ""){
        alert("請輸入作物名稱！");
        return;
    }
    disableAllBtn();
    let prodName = search_input.value;
    let nameFileter = dataChk.filter(function(name_itm){
        return name_itm.作物名稱.match(prodName);
    })
    renderData(nameFileter);
    showKeyword(search_input.value);
})
//sort_select
sort_select.addEventListener('change', function(e){
    let sortText = e.target.value.substring(1).replace("排序", "");
    dataResult.sort(function(a, b){
        return b[sortText] - a[sortText];
    })
    renderData(dataResult);
})
function disableAllBtn(){
    for(var i=0 ; i<btns.length ; i++){
        btns[i].setAttribute("class", "");
    }
    sort_select.value = "排序篩選";
}
function renderData(show_data){    
    let str = ""; 
    if (show_data.length == 0){
        str += `<td colspan="7" class="text-center p-3">查無相關資料！</td>`;
    }else{
        show_data.forEach(function(item, index){
            str += `
            <tr data-num="${index}">
                <td>${item.作物名稱}</td>
                <td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td>
            </tr>
            `;
        })        
    }
    showList.innerHTML = str;
    dataResult =  show_data;
}
function showKeyword(keyText){
    showKey.textContent = `查看 " ${keyText} " 的比價結果`;
}