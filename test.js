const body = {
    name : 'alee',
    email : 'alee0510@gmail.com'
}

let temp = []
for (let key in body) {
    temp.push(`${key} = ${body[key]}`)
}

// name = 'alee', email = 'alee0510@gmail.com'
console.log(`${temp}`)