// Testimonial Slider
let tstSld = document.querySelectorAll(".tst-sld");
let count = 0;

let showSld =(index)=>{
    tstSld.forEach((tst)=>tst.classList.remove("active"));
    tstSld[count].classList.remove("active")
    count = index

    if (count < 0) {
        count = tstSld.length - 1
    }else if(count > tstSld.length - 1){
        count = 0;
    }

    tstSld[count].classList.add("active")
}

let playNxt =()=>{
    showSld(count + 1)
    console.log(count)
}

let autoP=()=>{
    setInterval(()=>{
        playNxt()
    },5000)
}

autoP();

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .reveal, .zoom-in').forEach(el => {
    observer.observe(el);
});

// Facts Slider
let factSlides = document.querySelectorAll('.fact-01');
let factCount = 0;
let factPrevBtn = document.querySelector('.Ft-Prev-btn');
let factNextBtn = document.querySelector('.Ft-Next-btn');

if (factPrevBtn && factNextBtn) {
    factPrevBtn.addEventListener('click', () => {
        factSlides[factCount].classList.remove('active');
        factCount = (factCount - 1 + factSlides.length) % factSlides.length;
        factSlides[factCount].classList.add('active');
    });

    factNextBtn.addEventListener('click', () => {
        factSlides[factCount].classList.remove('active');
        factCount = (factCount + 1) % factSlides.length;
        factSlides[factCount].classList.add('active');
    });
}

// Theme Switcher
const themeSwitcher = document.createElement('button');
themeSwitcher.innerHTML = '◐';
themeSwitcher.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--bg);
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
`;
document.body.appendChild(themeSwitcher);

themeSwitcher.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'obsidian' ? 'ivory' : 'obsidian';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form-inner');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you within 24 hours.');

        // Reset form
        contactForm.reset();
    });
}

// Mobile Side Drawer
const hamburger = document.getElementById('hamburger');
const sideDrawer = document.getElementById('sideDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

console.log('Hamburger element:', hamburger);
console.log('Side drawer element:', sideDrawer);
console.log('Close drawer element:', closeDrawer);

function openDrawer() {
    console.log('Opening drawer...');
    console.log('Hamburger position before:', hamburger.style.position);
    sideDrawer.classList.add('open');
    hamburger.style.position = 'absolute';
    hamburger.style.left = '-9999px';
    console.log('Hamburger position after:', hamburger.style.position);
    document.body.style.overflow = 'hidden';
}

function closeDrawerFn() {
    console.log('Closing drawer...');
    sideDrawer.classList.remove('open');
    hamburger.style.position = '';
    hamburger.style.left = '';
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', openDrawer);
    console.log('Hamburger click listener added');
}

if (closeDrawer) {
    closeDrawer.addEventListener('click', closeDrawerFn);
    console.log('Close drawer click listener added');
}

drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawerFn);
});

// Header scroll effect - change nav text color based on scroll position
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const logo = document.querySelector('.logo h2');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY > heroHeight * 0.5) {
        // Scrolled past hero - use theme colors
        navLinks.forEach(link => {
            link.style.color = 'var(--text-primary)';
        });
        logo.style.color = 'var(--accent)';
    } else {
        // In hero section - white text for dark overlay
        navLinks.forEach(link => {
            link.style.color = '#ffffff';
        });
        logo.style.color = '#ffffff';
    }
});