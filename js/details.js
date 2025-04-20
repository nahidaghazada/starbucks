const detailsCat = document.getElementById('detailsCat')
const detailsUrl = new URLSearchParams(window.location.search)
const number = detailsUrl.get("number")
const detName = detailsUrl.get("name")
const hideSvg = document.getElementById('hideSvg')

let load = true
function loading() {
    if(!load) {
        hideSvg.style.display = 'none'
        showDetails()
    }
}
loading()

let DATADETAILS = []
function checkData() {
    fetch("https://starbucks-data-phi.vercel.app/menus")
        .then(res => res.json())
        .then(info => {
            console.log(info);
            DATADETAILS = info;
            load = false
            loading();
        })
        .catch(error => {
            console.error("Məlumat yüklənərkən səhv baş verdi: ", error);
        });
}
checkData()

function showDetails() {
    let kod = []
    let proList = []
    let children = []

    DATADETAILS.map(item => {
        kod.push(...item.children)
    })

    kod.map(item => {
        if (item.children && item.children.length) {
            children.push(...item.children)
        } else {
            children.push(...item.products)
        }
    })

    children.map((item => {
        if (item.children) {
            proList.push(...item.products)
        } else {
            proList.push(item)
        }
    }))


    proList = proList.filter(item => item.productNumber == number && item.name == detName)
    // console.log(proList);
    proList.map(item => {
        detailsCat.innerHTML = `
                                    <div class="w-full lg:w-5/12 lg:pr-3">
                                        <div class="max-w-[400px] mx-auto">
                                            <img class="w-full" src="${item.imageURL}" />
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-7/12 lg:pl-3">
                                        <div>
                                            <h2 class="text-white text-center lg:text-start font-bold text-[45px]">${item.name}</h2>
                                            </div>
                                    </div>
                                    `


    })
}

