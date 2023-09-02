

const getCategryData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const category = data.data
    displayCategory(category)
    
}

getCategryData()

const getVideoData = async (id=1000) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const video = data.data

    
    // const verifyte = document.getElementById('verifyte-icon')
    // if(data.authors[0].verified === true){
    //     verifyte.removeAttribute('hidden')
    // }else{
    //     verifyte.setAttribute('hidden', true)
    // }
    displayVideoData(video)
}

getVideoData()

const displayCategory=(data)=>{
    const categorySection = document.getElementById('category-conatiner')
    data.forEach(data =>{
        const div = document.createElement('div')
        div.classList = `bg-gray-200 py-2 px-8 rounded-lg mx-1`
        div.innerHTML = `
        <a href="#" onclick="getVideoData('${data.category_id}')">${data.category}</a>
        `
        categorySection.appendChild(div)

    })
    
}

const displayVideoData = (data) =>{
    const cardSection = document.getElementById('card-container')
    cardSection.textContent = '';
    const noContent = document.getElementById('no-content')
    if(data.length == 0){
        noContent.classList.remove('hidden')
    }else{
        noContent.classList.add('hidden')
    }

    
    data.forEach(data=>{

        const hour = Math.floor(data.others?.posted_date / 3600)
        const min = (data.others ?.posted_date % 3600).toString().slice(0, 2)
        const portsHour=(second)=>{
            const hour = Math.floor(second / 3600)
            const min = (second % 3600).toString().slice(0, 2)
            return(`${hour}hr ${min}mins ago`)
        }
       
        
        
        const div = document.createElement('div')
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure class="relative">
            <img src="${data.thumbnail}" alt="Shoes" />
            <p id='time' class="absolute bottom-4 right-4 bg-gray-900 px-2 text-white rounded-lg"> ${data.others?.posted_date !== ''? portsHour(data.others?.posted_date) :''} </p>
        </figure>
        <div class="card-body">
            <div class="flex gap-2">
                <div>
                    <img
                        src="${data.authors[0].profile_picture}"
                        width="40" class="rounded-full" alt>
                </div>
                <div>
                    <h2 class="card-title">
                        ${data.title}
                    </h2>
                    <div class="card-actions my-2">
                        <div class>Awlad Hossain</div>
                        ${data.authors[0].verified === true? `<div id="verifyte-icon" class="text-sky-400"><i class="fa-solid fa-circle-check"></i></div>` : `<div id="verifyte-icon" class="text-sky-400"><i class="fa-solid fa-circle-check hidden"></i></div>`}
                    </div>
                    <p class="text-sm">${data.others.views}</p>
                </div>
            </div>
        </div>`
        cardSection.appendChild(div)

    })
}