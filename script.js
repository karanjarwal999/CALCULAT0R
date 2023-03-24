let str = ''
let str2 = ''
let flag = false
let keypad = true
// flag check operater are repeating or not

let minus = 1
let buttons = document.querySelectorAll('button')
let display = document.getElementById('display')
let parent = document.querySelector('#parent')
let history = JSON.parse(localStorage.getItem('history')) || []
let Container = document.querySelector('.Container')

let historybutton = document.querySelector('#historybtn>button')
let historyfunc = document.querySelector('#historyfunc')
let historyclick = document.querySelector('#historyclick')

display.addEventListener('input', () => {
    str = display.value
})

let his = false
window.addEventListener('keydown', (e) => {
    let element = document.getElementsByName(e.key)
    if (e.key == 'h') {
        if (his) {
            his = !his
            element[0].click()
        }
        else {
            his = !his
            element[1].click()
        }
    }
    else if(element[0]!=undefined) {
        element[0].click()
    }

})


buttons.forEach((element) => {
    element.addEventListener('click', (e) => {

        //to add click UI
        element.style.position = 'relative'
        element.style.top = '5px'
        setTimeout(() => {
            element.style.position = 'static'
            element.style.bottom = '5px'
        }, 250);

        if (element.value == '-' && minus < 2) {
            let k = str[str.length - 1]
            if ((k == '+' || k == '/' || k == '*' || k == '%' || k == '.')) {
                str = str.substring(0, str.length - 1);
            }
            str += element.value
            minus++
            display.value = str
        }
        if (flag && (element.value == '+' || element.value == '/' || element.value == '*' || element.value == '%' || element.value == '.')) {
            let k = str[str.length - 1]
            if ((k == '+' || k == '/' || k == '*' || k == '-' || k == '%' || k == '.')) {
                str = str.substring(0, str.length - 1);
            }
            if (minus >= 0) { minus-- }

            //when str length is greater then 26 input field overflow in rigth side to handle that we are storing element after 26 in str2
            if (str.length >= 26) {
                str2 += str[0]
                str = str.substring(1, str.length)
            }
            str += element.value
            display.value = str
        }
        else if (element.value == '=') {
            flag = true
            let value = str
            let k
            let Storage = str
            try {
                k = new String(eval(str2 + str))
                //when syntax is invalid its create an error and assign k = undefined
            } catch (error) {
                alert('invalid syntax')
            }
            str = k

            //when eval perform  opration invalid syntax or null it return undefined this if statement handle that  
            if (k == undefined || k == 'undefined') {
                str = Storage
            }
            display.value = str

            //to store data in LS
            let obj = {}
            obj.que = value
            obj.ans = str
            history.push(obj)
            localStorage.setItem('history', JSON.stringify(history))
        }
        else if (element.value == 'delete') {
            flag = true
            let k = str[str.length - 1]
            str = str.substring(0, str.length - 1);
            if (k == '-') { minus-- }

            //to add str2 element in str when str length is less then 26
            if (str.length < 26) {
                if (str2.length != 0) {
                    str = str2[str2.length - 1] + str
                    str2 = str2.substring(0, str2.length - 1)
                }
            }
            display.value = str
        }
        else if (element.value == 'c') {
            flag = false
            minus = !minus
            str = ''
            str2 = ''
            display.value = str
        }
        else if (element.value == '1' || element.value == '2' || element.value == '3' || element.value == '4' || element.value == '5' || element.value == '6' || element.value == '7' || element.value == '8' || element.value == '9' || element.value == '0') {
            minus = 1
            flag = true
            if (str.length >= 26) {
                str2 += str[0]
                str = str.substring(1, str.length)
            }
            str += element.value
            display.value = str
        }
    })
});


// history click event
historybutton.addEventListener('click', () => {
    display.style.display = 'none'
    Container.style.display = 'none'
    historyclick.style.display = 'block'
    parent.style.border = '2px solid black'
    displayhistory(history)

})

let historydiv;
// show default message
function showdefaultmess(value) {
    let mess = document.createElement('p')
    mess.setAttribute('class', 'message')
    mess.textContent = value
    historydiv.append(mess)
    historydiv.style.justifyContent = 'start';
}

// display function that render data
function displayhistory(data) {

    historydiv = document.querySelector('.historydiv>p')
    historydiv.innerHTML = ''
    historydiv.style.justifyContent = 'end';

    // sending a default message
    if (data.length == 0) { showdefaultmess('You can see your history here') }
    else {
        let temp = ``
        data.forEach((element) => {
            temp += `${element.que}<br><span>${element.ans}</span><br>`
        });
        historydiv.innerHTML = temp
    }
    // historydiv.scrollTop = historydiv.scrollHeight
}


// close history event
let closehistory = document.getElementById('closehistory')
closehistory.addEventListener('click', () => {
    display.style.display = 'block'
    Container.style.display = 'grid'
    historyclick.style.display = 'none'
    parent.style.border = 'none'
})

// clear history event
let clearhistory = document.getElementById('clearhistory')
clearhistory.addEventListener('click', () => {
    history = []
    localStorage.setItem('history', JSON.stringify(history))
    displayhistory(history)
})