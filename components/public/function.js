// import { useDispatch, useSelector } from "react-redux";


function currencyFormat(num) {
    // console.log(num)
    var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // var money = num
    return money + ' VND';
}

function add(data, current) {
    // data.new = "hello"
    var something = {}
    Object.assign(something, data);
    something.new = 'abcd'
    console.log(something)
}

function transDictToArray(data, current) {
    var rep = JSON.parse(JSON.stringify(data))
    var arr = []
    if(rep[current.id_product]){
        const number = rep[current.id_product].amount
        rep[current.id_product].amount = number + 1
        for(var i in rep){
            arr.push(rep[i])
        }
    }else{
        for(var i in rep){
            arr.push(rep[i])
        }
        arr.push(current)
    }
    // console.log(arr)
    return arr
}

function transDictToArray2(data, current, num) {
    var rep = JSON.parse(JSON.stringify(data))
    // console.log(data)
    var arr = []
    if(rep[current.id_product]){
        const number = rep[current.id_product].amount
        rep[current.id_product].amount = number + num
        for(var i in rep){
            arr.push(rep[i])
        }
    }else{
        for(var i in rep){
            arr.push(rep[i])
        }
        // current.amount = num
        arr.push(current)
    }

    return arr
}

function transDictToArray1(data) {
    var rep = JSON.parse(JSON.stringify(data))
    var arr = []
    for(var i in rep){
        arr.push(rep[i])
    }
    return arr
}

const postAPI = async (link, body, token='') => {
    const req = await fetch('http://192.168.0.2:8000/'+ link, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })
    return req.json()
}

const putAPI = async (link, body, token='') => {
    const req = await fetch('http://192.168.0.2:8000/'+ link, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })
    return req.json()
}

const getAPI = async (link, token = '') => {
    const req = await fetch('http://192.168.0.2:8000/'+ link, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    return req.json()
}

const getStatus = (status) => {
    switch (status) {
        case 0:
            return 'Đã hủy đơn'
        case 1:
            return 'Đang xử lý'
        case 2:
            return 'Đã thanh toán'
        case 3:
            return 'Đang giao'
        case 4:
            return 'Đang giao'
        case 5:
            return 'Đã giao hàng'
    }
}

export default { currencyFormat, transDictToArray, transDictToArray1, transDictToArray2, postAPI, getAPI, getStatus, putAPI }