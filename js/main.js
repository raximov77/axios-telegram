
let elUsersList = document.querySelector(".users-list")

function getRequest(){
    axios.get("https://dummyjson.com/products").then(res => {
        res.data.products.map(item => {
            let elItem = document.createElement("li")
            elItem.className = `w-[350px] p-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-2         
            `
            elItem.innerHTML = `
                <div class="relative overflow-hidden rounded-lg">
                    <img class="w-full h-[220px] object-cover rounded-lg" src="${item.images[0]}" alt="Product image">
                </div>
                <div class="mt-4">
                    <h2 class="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">${item.title}</h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">${item.description}</p>
                    <button onclick="handleSendMessage(${item.id})" class="w-full bg-blue-500 dark:bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-300">
                        Send Message
                    </button>
                </div>
            `;
            elUsersList.appendChild(elItem)
        })
    })
}

getRequest()


/* Bot */

const TOKEN = "7399334564:AAHKxAyhxGEYwgESn4S9aZw7QUmKjhpjXuU"
const CHAT_ID = "842680481" 
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

function handleSendMessage(id){
    axios.get(`https://dummyjson.com/products/${id}`).then(res  => {
        let message = `<b>Product Info</b>\n`
        message += `<b>Name: ${res.data.title}</b>\n`
        message += `<b>Description: ${res.data.description}</b>\n`

        axios.post(HTTP, {
            chat_id:CHAT_ID,
            photo:res.data.images[0],
            parse_mode:"html",
            caption:message
        })
    })

   
}  