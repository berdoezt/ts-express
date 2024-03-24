// function f(){
//     setTimeout(() => {
//         console.log("hello async")
//     }, 2000)
// }

// f()
// console.log("ini duluan")

// function f(): Promise<void>{
//     return new Promise<void>((resolve, reject) => {
//         setTimeout(() => {
//             console.log("hello async")
//         }, 2000)
//     })
// }

// f().then(() =>{
//     console.log("ini duluan")
// })

// console.log(
//     "ini duluan"
// )

function f(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            console.log("hello async")
            // resolve()
        }, 2000)
    })
}

async function g() {
    try {
        await f()
        console.log("ini duluan")
    }catch(e){
        
    }
    
}

g().then()

