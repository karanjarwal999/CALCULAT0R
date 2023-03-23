let str=''
let str2=''
let flag=false
let minus=true
let buttons=document.querySelectorAll('button')
let display=document.getElementById('display')
let parent=document.querySelector('#parent')
let history=JSON.parse(localStorage.getItem('history'))||[]
let Container=document.querySelector('.Container')

let historybutton=document.querySelector('#historybtn>button')
let historyfunc=document.querySelector('#historyfunc')
let historyclick=document.querySelector('#historyclick')

display.addEventListener('input',()=>{
    str=display.value
})
display.addEventListener("keypress", function (e) {
    let element=document.getElementsByName(e.key)
    element[0].style.position='relative'
    element[0].style.top='5px'
    setTimeout(() => {
        element[0].style.position='static'
        element[0].style.bottom='5px'
    }, 250);
    if(e.key=='Enter'){
        flag=true
        let value=str
        str=eval(str2+str)
        display.value=str
        let obj={}
        obj.que=value
        obj.ans=str
        history.push(obj)
        localStorage.setItem('history',JSON.stringify(history))
    }
})

buttons.forEach((element) => {
    element.addEventListener('click',(e)=>{

        element.style.position='relative'
        element.style.top='5px'
        setTimeout(() => {
            element.style.position='static'
            element.style.bottom='5px'
        }, 250);
        
        if(element.value=='-'&&minus){
            str+=element.value
            minus=!minus
            display.value=str
        }
        if(flag && (element.value=='+'||element.value=='/'||element.value=='*'||element.value=='%'||element.value=='.'||element.value=='-')){
            let k=str[str.length-1]
            if((k=='+'||k=='/'||k=='-'||k=='*'||k=='%'||k=='.')){
                str = str.substring(0, str.length - 1);
            }
            if(str.length>=26){
                str2+=str[0]
                str=str.substring(1, str.length)
            }
            str+=element.value
            display.value=str
        }
        else if(element.value=='='){
            flag=true
            let value=str
            str=eval(str2+str)
            display.value=str
            let obj={}
            obj.que=value
            obj.ans=str
            history.push(obj)
            localStorage.setItem('history',JSON.stringify(history))
        }
        else if(element.value=='delete'){
            flag=true
            str = str.substring(0, str.length - 1);
            if(str.length<26){
                if(str2.length!=0){
                    str=str2[str2.length-1]+str
                    str2=str2.substring(0, str2.length-1)
                }
            }
            display.value=str
        }
        else if(element.value=='c'){
            flag=false
            minus=!minus
            str=''
            str2=''
            display.value=str
        }
        else if(element.value=='1'||element.value=='2'||element.value=='3'||element.value=='4'||element.value=='5'||element.value=='6'||element.value=='7'||element.value=='8'||element.value=='9'||element.value=='0'){
            flag=true
            if(str.length>=26){
                str2+=str[0]
                str=str.substring(1, str.length)
            }
            str+=element.value
            display.value=str
        }
    })
});


// history click event
historybutton.addEventListener('click',()=>{
    display.style.display='none'
    Container.style.display='none'
    historyclick.style.display='block'
    parent.style.border='2px solid black'
    displayhistory(history)

})

let historydiv;
// show default message
    function showdefaultmess(value){
        let mess=document.createElement('p')
        mess.setAttribute('class','question')
        mess.textContent=value
        historydiv.append(mess)
    }

// display function that render data
function displayhistory(data) {

    historydiv=document.querySelector('.historydiv')
    historydiv.innerHTML=''

    // sending a default message
    if(data.length==0){ showdefaultmess('You can see your history here') }
    else{
    data.forEach((element) => {
        let Q=document.createElement('p')
        Q.setAttribute('class','question')
        Q.textContent=element.que
        let ans=document.createElement('p')
        ans.setAttribute('class','answer')
        ans.textContent=element.ans
        historydiv.append(Q,ans)
    });
}
}


// close history event
let closehistory=document.getElementById('closehistory')
closehistory.addEventListener('click',()=>{
    display.style.display='block'
    Container.style.display='grid'
    historyclick.style.display='none'
    parent.style.border='none'
})

// clear history event
let clearhistory=document.getElementById('clearhistory')
clearhistory.addEventListener('click',()=>{
    history=[]
    localStorage.setItem('history',JSON.stringify(history))
    displayhistory(history)
})