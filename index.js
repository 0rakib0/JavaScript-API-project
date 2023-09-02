

const getCategryData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const category = data.data
    displayCategory(category)
    
}

getCategryData()

const getVideoData = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const video = data.data
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
    data.forEach(data=>{
        const verifyte = document.getElementById('verifyte-icon')
        console.log(data.authors[0].verified)
        const div = document.createElement('div')
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure class="relative">
            <img src="${data.thumbnail}" alt="Shoes" />
            <p class="absolute bottom-4 right-4 text-red-500 bg-gray-900 px-2 text-white rounded-lg">3hrs 56 min ago</p>
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
                        <div id="verifyte-icon" class="text-sky-400 hidden"><i
                                class="fa-solid fa-circle-check"></i></div>
                    </div>
                    <p class="text-sm">91K views</p>
                </div>
            </div>
        </div>`
        if(data.authors[0].verified === true){
            verifyte.classList.remove('hidden');
        }
        cardSection.appendChild(div)

    })
    


}