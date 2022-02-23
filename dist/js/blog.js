let log = console.log;
// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Reveal Elements ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
function revealElements() {
    let duration = 1.15;
    let timingFunction = "ease-in-out";
    
    
    document.querySelector("html").style.setProperty("--transition_duration", duration + "s" );
    document.querySelector("html").style.setProperty("--transition_ease_func", timingFunction );
    
    const elements = document.querySelectorAll(".spot");
    
    let options = {
        threshold: 0,
        rootMargin: "0px"
    }
    
    let observer = new IntersectionObserver(watch , options)
    function watch(entries) {
        entries.forEach(el => {
            if (el.isIntersecting) {
                el.target.classList.add("spotted")
                setTimeout(() => {
                    el.target.classList.remove("un-reveal");
                } , duration * 2500);
            } 
        })
    }
    
    elements.forEach(el => observer.observe(el));
}
// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Loader ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
let loader = document.querySelector(".loader");

window.addEventListener("load",()=> {
    loader.classList.add("hide");
    revealElements();
    setTimeout(() => loader.style.display = "none" , 500);
})

// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Header ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const links = [...document.querySelectorAll("header .nav .nav-link")];
const navIcon = document.querySelector("header .navbar-toggler");
const header = document.querySelector("header");
const sections = document.querySelectorAll(".sec");
let headerHeight = 71;

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ links click ▪▪▪▪▪▪▪▪▪▪▪▪▪
links.forEach(a => {
    a.addEventListener("click" , e => {
        e.preventDefault();
        links.forEach(el => el.classList.remove("active"));
        a.classList.add("active");
        if (window.innerWidth < 992) navIcon.click();
    })
})

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ media icon ▪▪▪▪▪▪▪▪▪▪▪▪▪ 

navIcon.addEventListener("click", _=> navIcon.classList.toggle("show"))

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ header background & sync links ▪▪▪▪▪▪▪▪▪▪▪▪▪ 

window.addEventListener("scroll",_=> {
    if (scrollY > 20 ) { header.classList.add("show") } 
    else { header.classList.remove("show") }

    sections.forEach(s => {
        if (scrollY >= (s.offsetTop - headerHeight ) - 16 ) {
            links.forEach(el => el.classList.remove("active"));
            let id = s.getAttribute("id");
            document.querySelector(`[data-scroll=${id}]`).classList.add("active");
        }
    })
})