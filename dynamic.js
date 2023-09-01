const loadTabs = async () => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();

    loadAll(data.data[0].category_id);

    const tabsContainer = document.querySelector('.tabs');

    let id = data.data[0].category_id;

    data.data.forEach((e) => {

        const a = document.createElement('a');
        e.category === 'All' ? a.className = 'tab rounded text-white bg-red-600' : a.className = 'tab rounded text-white bg-gray-400';
        a.innerText = e.category;
        a.addEventListener('click', () => {
            loadAll(e.category_id);
            id = e.category_id;
        })


        tabsContainer.appendChild(a);
    });




    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.replace('bg-red-600', 'bg-gray-400'))

            tab.classList.replace('bg-gray-400', 'bg-red-600')


        });
    });




    document.getElementById('sort-btn').addEventListener('click', () => {
        loadAll(id, true);
    })


}






const loadAll = async (id, sort = false) => {
    const cardContainer = document.getElementById("card-container");

    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();


    const sortData = () => {
        data.data.sort((a, b) => {
            const A = parseFloat(a.others.views);
            const B = parseFloat(b.others.views)

            return B - A;
        })



    }

    if (sort) {
        sortData();
    }





    data.data.forEach((e) => {

        const child = `
        <div class="card w-72 rounded-none">
        <div class="relative">
        <img class="w-full rounded-lg h-44" src=${e.thumbnail} alt="" />
        ${e.others?.posted_date ?
                `<h1 class="absolute right-5 bottom-3 text-white text-sm bg-gray-900 px-2 rounded">${Math.floor((parseInt(e.others.posted_date) / 3600))} hrs ${Math.floor(parseInt(e.others.posted_date) / 60) - (60 * Math.floor(e.others.posted_date / 3600))} min ago</h1>`
                :
                ""
            }
       </div>

            <div class="flex mt-5 h-24">

                    <div class="mr-3 w-1/5">
                        <img class="w-10 h-10 rounded-full" src=${e.authors[0].profile_picture} alt="">
                    </div>

                    <div class="w-4/5">
                        <h3 class="text-base font-bold break-words">${e.title}</h3>
                        <div class="flex gap-2 my-2">
                            <p class="text-sm text-gray-600">${e.authors[0].profile_name}</p>
                            ${e.authors[0]?.verified ? '<i class="fa-solid fa-check text-sm bg-blue-700 w-5 h-5 text-center rounded-full " style="color: white;"></i>' : ''}
                        </div>
                        <p class="text-sm text-gray-600">${parseFloat(e.others.views)}K views</p>
                    </div>
               

  `

        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = child;

        cardContainer.appendChild(cardDiv);

    })

    data.data.length > 0 ?

        document.getElementById('no-data-logo').classList.replace("flex", "hidden")
        :
        document.getElementById('no-data-logo').classList.replace("hidden", "flex")


}






loadTabs();




