const catName = document.getElementById('catName');
const catProducts = document.getElementById('catProducts');
let DATAPRO = [];
const url = new URLSearchParams(window.location.search);
const userName = url.get("name");

function checkData() {
    fetch("http://localhost:3000/menus")
        .then(res => res.json())
        .then(info => {
            DATAPRO = info;
            showProducts();
        });
}
checkData();

function showProducts() {
    catName.innerHTML = userName;
    let kod = [];
    let children = [];
    let products = [];
    let proList = [];

    DATAPRO.map(item => {
        kod.push(...item.children);
    });

    kod = kod.filter(item => userName == item.name);
    
    if (!kod.length) return;

    if (kod[0].children.length) {
        children = kod[0].children;

        children.map((item, i) => {
            products = item.products;
            catProducts.innerHTML += `
                <div>
                    <h2 class="text-[28px] mb-6 font-bold">${item.name}</h2>
                    <div class="flex categoryAll flex-wrap py-10 border-t" id="catAll-${i}"></div>
                </div>`;

            const categoryAll = document.getElementById(`catAll-${i}`);

            products.map(product => {
                categoryAll.innerHTML += `
                    <a href="details.htm?number=${product.productNumber}&&name=${product.name}" class="lg:size-3/12 size-6/12 block px-3 mb-7">
                        <div class="mb-3">
                            <img class="w-[120px] rounded-full mx-auto" src="${product.imageURL}" />
                        </div>
                        <div>
                            <p class="text-[24px] font-semibold text-center">${product.name}</p>
                        </div>
                    </a>`;
            });
        });

    } else {
        proList = kod[0].products;
        catProducts.innerHTML = `
            <div>
                <div class="flex categoryAll flex-wrap py-10 border-t" id="catAll-main"></div>
            </div>`;

        const categoryAll = document.getElementById('catAll-main');

        proList.map(product => {
            categoryAll.innerHTML += `
                <a href="details.htm?number=${product.productNumber}&name=${product.name}" class="size-3/12 block px-3 mb-7">
                    <div class="mb-3">
                        <img class="w-[140px] rounded-full mx-auto" src="${product.assets.masterImage.uri}" />
                    </div>
                    <div>
                        <p class="text-[24px] font-semibold text-center">${product.name}</p>
                    </div>
                </a>`;
        });
    }
}
