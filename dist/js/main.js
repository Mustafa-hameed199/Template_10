let log = console.log;
// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Reveal Elements ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
function revealElements() {
    let duration = 1.15;
    let timingFunction = "ease-in-out";
    
    
    document.querySelector("html").style.setProperty("--transition_duration", duration + "s" );
    document.querySelector("html").style.setProperty("--transition_ease_func", timingFunction );
    
    const elements = document.querySelectorAll(".spot");
    
    let options = {
        threshold: .25,
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
links[0].classList.add("active")
links.forEach(a => {
    a.addEventListener("click" , e => {
        e.preventDefault();
        links.forEach(el => el.classList.remove("active"));
        a.classList.add("active");
        if (window.innerWidth < 992) navIcon.click();
        if (e.currentTarget.classList.contains("btn")) return;
        let id = a.dataset.scroll;
        let sec = document.getElementById(id);
        let target = sec.offsetTop - headerHeight; // 71 is header height.. i did not make it dynamic cuz it makes problems with bootstrap when its media icon 

        window.scrollTo({
            top: target,
            behavior: "smooth"
        })
    })
})

document.querySelectorAll(".home .btn , header .nav-link.btn").forEach(el => {
    el.addEventListener("click", () => {
        window.scrollTo({
            top: document.getElementById("about").offsetTop - headerHeight,
            behavior:"smooth"
        })
    })
})

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ media icon ▪▪▪▪▪▪▪▪▪▪▪▪▪ 

navIcon.addEventListener("click", _=> navIcon.classList.toggle("show"))

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ header background & sync links ▪▪▪▪▪▪▪▪▪▪▪▪▪ 

window.addEventListener("scroll",_=> {
    if (scrollY > 50 ) { header.classList.add("show") } 
    else { header.classList.remove("show") }

    sections.forEach(s => {
        if (scrollY >= (s.offsetTop - headerHeight ) - 16 ) {
            links.forEach(el => el.classList.remove("active"));
            let id = s.getAttribute("id");
            document.querySelector(`[data-scroll=${id}]`).classList.add("active");
        }
    })
})

// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Stats ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const stats = document.querySelector(".stats");
const numbers = document.querySelectorAll(".stats [data-num]");
let start = false;


window.addEventListener("scroll",() => {
    if (scrollY >= stats.offsetTop - 500) {
        if (!start) {
            numbers.forEach(span => {
                let run = setInterval(() => {
                    span.innerHTML++
                    if ( span.innerHTML == span.dataset.num ) {
                        clearInterval(run);
                    }
                } , 500 / span.dataset.num )
            })
        }
        start = true;
    }
})

// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Portfolio ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const list = document.querySelectorAll(".gallery__list li");
const items = document.querySelectorAll(".gallery__imgs .item");


list.forEach(el => {
    el.addEventListener("click",(e) => {
        list.forEach( li => li.classList.remove("active") );
        el.classList.add("active");

        let type = e.currentTarget.dataset.img;
        items.forEach(i => {
            if (i.classList.contains(type)) {
                i.classList.remove("hide");
                i.classList.add("show");
            }
            else { 
                i.classList.remove("show");
                i.classList.add("hide")
            }
        })
    })
})

// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Testimonials ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const slider = document.querySelector(".slider");
const sliderItems = [...document.querySelectorAll(".testimonials .slider .slide")];
const indicator = document.querySelector(".testimonials .indicators");
let itemsGap = 5; // 5rem
let slideIndex = 0;


document.querySelector("html").style.setProperty("--testimonial-gap", itemsGap + "rem");


// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ create indicators & add function ▪▪▪▪▪▪▪▪▪▪▪▪▪ 

for (let i = 1 ; i <= sliderItems.length ; i++) {
    let li = document.createElement("li");
    indicator.appendChild(li);
}

const bullets = [...indicator.children];
bullets[slideIndex].classList.add("active")

bullets.forEach(li => {
    li.addEventListener("click" , () => {
        bullets.forEach(el => el.classList.remove("active"));
        li.classList.add("active");
        let index = bullets.findIndex(el => el === li);
        slideIndex = index;
        slider.style.transition = '.5s ease-in-out'
        activeSlide();
        moveSlide();
    })
})

// --------------  check if the slide is in first or last -----------

function checkSlide() {
    let currentB = bullets.find(el => el.classList.contains("active"));
    let indexB = bullets.indexOf(currentB);

    if ( indexB === bullets.length - 1) {
        slideIndex = sliderItems.length - 3;
    } else if (indexB === 0) {
        slideIndex = 0;
    }
    moveSlide();
}


function moveSlide() {
    if (window.innerWidth >= 1200) {
        let slideWidth = sliderItems[3].getBoundingClientRect().width;
        slider.style.transform = `translateX(-${(slideWidth + (itemsGap * 16)) * slideIndex}px)`;
    } else {
        slider.style.transform = `translateX( calc((-100% - ${itemsGap - 1}rem) * ${slideIndex + 1}) )`;
    }
}
moveSlide();
window.addEventListener("resize",() => {
    checkSlide();
    activeSlide();
});

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ slide click ▪▪▪▪▪▪▪▪▪▪▪▪▪
function slideClick() {
    sliderItems.forEach(slide => {
        slide.addEventListener("click", () => {
            let index = sliderItems.findIndex(el => el === slide);
            if (slide.classList.contains("firstClone")) {
                slideIndex = 0;
                slider.style.transition = 'unset';
                sliderItems[1].style.transition = "unset";
            } else if (slide.classList.contains("lastClone")) {
                slideIndex = sliderItems.length - 3;
                slider.style.transition = 'unset';
                sliderItems[sliderItems.length - 2].style.transition = "unset";
            } else {
                slideIndex = index - 1;
                sliderItems[1].style.transition = ".5s ease-in-out";
                sliderItems[sliderItems.length - 2].style.transition = ".5s ease-in-out";
                slider.style.transition = '.5s ease-in-out';
            }
            bullets.forEach(el => el.classList.remove("active"))
            bullets[slideIndex].classList.add("active");
            activeSlide();
            moveSlide();
        })
    })
}

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ infinite slide trick :)  ▪▪▪▪▪▪▪▪▪▪▪▪▪
let cloneFirst = sliderItems[0].cloneNode(true);
let cloneLast = sliderItems[sliderItems.length - 1].cloneNode(true);

cloneFirst.classList.add("firstClone");
cloneLast.classList.add("lastClone");

sliderItems.push(cloneFirst);
sliderItems.unshift(cloneLast);


slider.appendChild(cloneFirst)
slider.prepend(cloneLast);
slideClick();

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ active Slide on click  ▪▪▪▪▪▪▪▪▪▪▪▪▪
function activeSlide() {
    sliderItems.forEach(el => el.classList.remove("active"));
    sliderItems[slideIndex + 1].classList.add("active");
}
activeSlide()

// ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪ Interval function  ▪▪▪▪▪▪▪▪▪▪▪▪▪
let num = 1;
let run = setInterval(() => {
    num++
    sliderItems.forEach( el => el.addEventListener("click",() => num = sliderItems.indexOf(el) ) )
    bullets.forEach( el => el.addEventListener("click",() => num = bullets.indexOf(el) ) )
    if (num > sliderItems.length - 1 ) num = 2;
    sliderItems[num].click()
    if (num == sliderItems.length - 1) num = 1
} , 5000);


// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Our Clients ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const clientSlider = document.querySelector(".our-clients .slider");
const sliderBox = document.querySelector(".our-clients .box");

sliderBox.append(clientSlider.cloneNode(true));

// ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ Blog ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
const cards = document.querySelectorAll(".blog .card");

cards.forEach(card => card.addEventListener("click",() => card.querySelector("a").click() ) )






