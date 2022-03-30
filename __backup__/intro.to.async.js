
// PROMISE
function delay () {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 300000000; i++) {}
        reject('delayed')
    })
}

function isEvenNumber (numb) {
    return new Promise((resolve, reject) => {
        if (numb % 2 === 0) {
            resolve(true)
        } else {
            reject(false)
        }
    })
}

function showGreetingMessages (name) {
    console.log('Hai, My name is ' + name)
}

async function isOddNumber (numb) {
    if (numb % 2 !== 0) {
        return true
    } else {
        throw false
    }
}

async function main () {
    console.log('hello world')
    
    console.log('1')
    console.log('2')

    try {
        const result2 = await isOddNumber(8)
        console.log(result2)
        
        const result1 = await isEvenNumber(8)
        console.log(result1)
    
        showGreetingMessages('cindy')
    
    } catch (error) {
        console.log('catch', error)
    }
}

main()