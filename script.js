let str=''
let str2=''
let flag=false
let buttons=document.querySelectorAll('button')
let display=document.getElementById('display')

buttons.forEach((element) => {
    element.addEventListener('click',(e)=>{

        element.style.position='relative'
        element.style.top='5px'
        setTimeout(() => {
            element.style.position='static'
            element.style.bottom='5px'
        }, 250);
        



        if(flag && (element.value=='+'||element.value=='/'||element.value=='*'||element.value=='%'||element.value=='.')){
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
            str=eval(str2+str)
            display.value=str
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
            str=''
            str2=''
            display.value=str
        }
        else if(element.value=='1'||element.value=='2'||element.value=='3'||element.value=='4'||element.value=='5'||element.value=='6'||element.value=='7'||element.value=='8'||element.value=='9'||element.value=='0'||element.value=='-'){
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