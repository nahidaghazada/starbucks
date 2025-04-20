const menuToggle = document.getElementById("menuToggle")
const spans = menuToggle.querySelectorAll("span")

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('right-[0px!important]');

    if (!mobileMenu.classList.contains("right-[0px!important]")) {
        spans[1].classList.remove("hidden")
        spans[0].classList.remove("rotate-[45deg]")
        spans[2].classList.remove("rotate-[-45deg]")
        spans[0].classList.remove("translate-y-[1.8px]")
    } else {
        spans[1].classList.add("hidden")
        spans[0].classList.add("rotate-[45deg]")
        spans[2].classList.add("rotate-[-45deg]")
        spans[0].classList.add("translate-y-[1.8px]")
    }
}

const ac = document.getElementById('ac')
function accordionFooter(arg, svg) {
    const elm = document.getElementById(`${arg}`)
    const svgId = document.getElementById(`${svg}`)
    elm.classList.toggle('max-h-[500px!important]')
    svgId.classList.toggle('rotate-[180deg]')
}