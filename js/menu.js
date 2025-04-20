let DATA

function checkData() {
    fetch("http://localhost:3000/menus")
        .then(res => res.json())
        .then(info => {
            DATA = info
            load = false
            loading()
        })
}
checkData()

const categoryList = document.getElementById('categoryList')
const categoryAll = document.getElementById('categoryAll')
const hideSvg = document.getElementById('hideSvg')

let load = true
function loading() {
    if(!load) {
        hideSvg.style.display = 'none'
        show()
    }
}
loading()

function show() {
    DATA.forEach((item, i) => {
        categoryList.innerHTML += `
            <h2 class="text-[24px] font-semibold mb-3 border-b-2 hover:border-green-800">${item.name}</h2>
            <ul class="catList mb-4" id="catList-${i}"></ul>
        `
        if (categoryAll) {
            categoryAll.innerHTML += `
                <div>
                    <h2 class="text-[28px] mb-6 font-bold">${item.name}</h2>
                    <div class="flex catAll flex-wrap py-10 border-t" id="catAll-${i}"></div>
                </div>
            `
        }

        let kod = item.children

        kod.forEach(child => {
            document.getElementById(`catList-${i}`).innerHTML += `
                <li class="text-[20px] cursor-pointer hover:text-green-800 mb-2 font-normal text-[#6B6B6B]">
                    <a href="products.htm?name=${child.name}">${child.name}</a>
                </li>
            `

            if (categoryAll) {
                document.getElementById(`catAll-${i}`).innerHTML += `
                    <div class="lg:size-6/12 size-full px-3 mb-8"> 
                        <a href="products.htm?name=${child.name}" class="flex cursor-pointer items-center">
                            <div class="mr-3 w-[70px] sm:w-[120px] rounded-full overflow-hidden flex-shrink-0">
                                <img class="w-full" src="${child.categoryImageURL}" />
                            </div>
                            <div>
                                <p class="text-[24px] font-medium">${child.name}</p>
                            </div>
                        </a>
                    </div>
                `
            }
        })
    })
}
