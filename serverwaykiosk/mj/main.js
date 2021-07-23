var toppingList = [];   // 토밍 목록
var nowTabNum = 0;      // 현재 선택된 탭번호
var nowItemNum = 0;     // 현재 선택된 메뉴번호
var cartList = [];      // 카트 정보 저장할 함수
var paySum = 0;         // 결제 총액
var takeoutox = null;   // 매장, 포장 여부
var popSelect = [];     // 팝업 선택 내역

// 장바구니 리스트 생성자
function save_cartList(img, name, price, cnt, toppings) {
    this.img = img;
    this.name = name;
    this.price = price;
    this.cnt = cnt;
    this.toppings = toppings;
}


window.onload = function () {
    // 메뉴 불러오기
    getItem();

}

/* 메뉴 불러오기 메서드 */
function getItem() {

    for (var i = 0; i < arrTabList.length; i++) {

        var menudata = JSON.parse(itemList[i]);
        var menuHtml = "";

        for (var j = 0; j < menudata.length; j++) {
            menuHtml += '<div class="menu" onclick = "javascript:addmenuOpen(' + i + ', ' + j + ');">';
                menuHtml += '<table>';
            menuHtml += '<tr>';
            menuHtml += '<td><img src="'
            menuHtml += menudata[j].src;
            menuHtml += '" width=250px height=250px></td></tr>'
            menuHtml += '<tr><td><a1>'
            menuHtml += menudata[j].name;
            menuHtml += '</a1></td></tr>'
            menuHtml += '<tr><td><a2>'
            menuHtml += menudata[j].price;
            menuHtml += '</a2></td></tr></table></div>'

            var div_sq = document.getElementById(arrTabList[i]);
            console.log(div_sq);
            div_sq.innerHTML = menuHtml;
        };
    };

};

// 메뉴탭 클릭시 메뉴목록 Display
function menulist(tabNum) {
    for (var i = 0; i < arrTabList.length; i++) {
        if (i == tabNum) {
            eval("document.querySelector('#" + arrTabList[i] + "').style.display = 'block';");
        } else {
            eval("document.querySelector('#" + arrTabList[i] + "').style.display = 'none';");
        }
    }
};


// [팝업창] 추가메뉴창 열기
function addmenuOpen(tabNum, itemNum) {
    
    // 현재 선택된 내역 저장 
    nowTabNum = tabNum;
    nowItemNum = itemNum;

    document.querySelector('div.choice_main_wrap').style.display = 'block'; 
    
     var menudata = JSON.parse(itemList[nowTabNum]);

    // 메뉴명,가격 넣기        
    $('#menu_name').text(menudata[nowItemNum].name);
    $('#sumprice').text(menudata[nowItemNum].price);
    
    
}

   





// 도경 수인파트



var addlist = [];


//checked된 값 가져오기
function value_check() {
    $('input[type="radio"]:checked').each(function (index) {
        if (index != 0) {
            addlist += ' <br> ';
        }
        addlist += $(this).val();
    });
    // addlist 출력
    alert(addlist);
    /*$('#listresult').html(addlist);*/
}



//checked 여부 확인
/*function validate_check() {
    var chkRadio1 = document.getElementByName('bread');
    var chkRadio2 = document.getElementByName('cheese');
    var chkRadio3 = document.getElementByName('vegetable');
    var chkRadio4 = document.getElementByName('sauce');
    var chkRadio5 = document.getElementByName('add');
    
    var chk_cnt=0;
    for(var i=0; i<chkRadio1.length, i++){
        if(chkRadio1[i].checked == true) 
            chk_cnt++;
    }
    if(chk_cnt<1){
        alert('체크해주세요');
        document.fromname.chkRadio1[0].focus();
        retrun chkRadio1;
    }
}*/

// 체크된 값 받기
function getListValue() {

    // 선택된 목록 가져오기
    const query = 'input[type="radio"]:checked';
    const selectedList =
        document.querySelectorAll(query);

    // 선택된 목록에서 value 찾기
    var result = '';
    selectedList.forEach((el) => {
        result += el.value + ' / ';
    });

    // list 출력
    document.getElementById('listresult').innerText = result;
}

function getList(event) {
    document.getElementById('result').innerText =
        event.target.value;
}



// Radio checked 선택해제 가능하게 만들기
var beforeChecked = -1;

$(function () {
    $(document).on("click", "input[type=radio]", function (e) {
        var index = $(this).parent().index("li,label");
        if (beforeChecked == index) {
            beforeChecked = -1;
            $(this).prop("checked", false);
            totalprice();
            getListValue();
        } else {
            beforeChecked = index;
        }
    });
});


// 추가 옵션 가격 업데이트
function totalprice() {

    let sumprice = $('#sumprice').text(menudata[nowItemNum].price);

    // add radio values
    $('.radio5:checked').each(function () {
        sumprice += $(this).data("price");
    });

    // update new number
    $('#sumprice').text((sumprice).toFixed(0));
}

// total price
$(function () {
    $(document).on('change', '.radio5', totalprice);
    totalprice();
})

// 가격에 컴마찍기
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// 메뉴선택창 닫기
function choiceWinClose() {
    var choiceDiv = document.querySelector('div.choice_main_wrap');
    choiceDiv.style.display = 'none';
}


// 메뉴선택창 팝업
function choiceWindow(){
    
    var choiceDiv = document.querySelector('div.choice_main_wrap');
    choiceDiv.style.display = 'block';
    
}

//결제창 팝업
function payWindow(){
    var payDiv=document.querySelector('div.orderlist_main_wrap');
    payDiv.style.display='block';
}


// 결제창 닫기
function payWinClose(){
    var payDiv=document.querySelector('div.orderlist_main_wrap');
    payDiv.style.display='none';
}


//카드 팝업창 
function payingWindow(){
    var payingDiv=document.querySelector('div.payment_main_wrap');
    payingDiv.style.display='block';
}

// 카드창 닫기
function payingWinClose(){
   var payingDiv=document.querySelector('div.payment_main_wrap');
    payingDiv.style.display='none';
     
}

//번호표 팝업
function numWindow(){
    var numDiv=document.querySelector('div.number_main_wrap');
    numDiv.style.display='block';
}





