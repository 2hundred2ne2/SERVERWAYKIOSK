//위시리스트 배열
var wishList=[];

function saveList(cnt, name, price, topping){
    this.cnt=cnt;
    this.name=name;
    this.price=price;
    this.topping=topping;
}

saveList.prototype.makeHtml=function(index){
    console.log(this.cnt+' : '+this.name+' : '+this.price+' : '+this.topping);
    
    var listHtml='';
    listHtml+='<tr>';
    listHtml+=' <td>'+index+'</td>';
    listHtml+=' <td>'+this.cnt+'</td>';
    listHtml+=' <td>'+this.name+'</td>';
    listHtml+=' <td>'+this.price+'</td>';
    listHtml+=' <td>'+this.topping+'</td>';
    listHtml+=' <td><a href="javascript:delMenu('+index+')">취소</a></td>';
    listHtml+='</tr>'
 
    return listHtml;
}

//리스트 정렬
function setlist(){
    var listrow=document.querySelector('#');
    
    for(var i=0; i<wishList.length; i++){
        tbody+='<tr>';
        tbody+='    <td>'+i+'</td>';
        tbody+='    <td>'+wishList[i].cnt+'</td>';
        tbody+='    <td>'+wishList[i].name+'</td>';
        tbody+='    <td>'+wishList[i].price+'</td>';
        tbody+='    <td>'+wishList[i].topping+'</td>';
        tbody+='    <td><a href="javascript:delMenu('+index+')">선택취소</a></td>';
        tbody+='</tr>';
    }
    listrow.innerHTML=tbody;
}

//위시리스트 해당 메뉴 선택취소
function delMenu(index){
    var delChk=confirm('해당 메뉴를 선택취소하시겠습니까?');
    
    if(delChk){
        wishList.splice(index, 1);
        
        localStorage.setItem('wishList', JSON.stringify(wishList));
        
        alert('취소되었습니다.');
        
        setlist();
    }
}

