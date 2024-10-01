$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("bnbdCMGbGgqyOdWf-");

        emailjs.sendForm('service_vznoxjp', 'template_ywc91ta', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Berlian M.";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Scientist", "UI/UX Designer", "Freelancer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

var typed= new Typed(".typing-textHello", {
    strings: ["Hi There", "Hello", "Bonjour", "안녕하세요", "こんにちは", "مرحبا", "你好"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 3000,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response;
    if (type === "skills") {
        response = await fetch("skills.json");
    } else if (type === "projects") {
        response = await fetch("./projects/projects.json");
    } else {
        response = await fetch("./certifications/certification.json");
    }
    
    const data = await response.json();
    return data;
}


function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 9).forEach((project, index) => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">  
                <div class="btns">
                    <button class="btn view-detail-btn" data-index="${index}"><i class="fas fa-eye"></i> View Detail</button>
                    <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                </div>
                </div>
            </div>
        </div>`
    });
    // <p>${project.desc}</p>
    projectsContainer.innerHTML = projectHTML;
    
    // Tambahkan event listener untuk tombol "View Detail Project"
    document.querySelectorAll('.view-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            let projectIndex = this.getAttribute('data-index');
            let project = projects[projectIndex];
            showModal(project);
        });
    });

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
    srtop.reveal('.work .box', { interval: 200 });
}

// Fungsi untuk menampilkan modal dengan detail project
function showModal(project) {
    const modal = document.getElementById("projectModal");

    // Set detail project ke dalam modal
    document.getElementById("modalProjectName").innerText = project.name;
    document.getElementById("modalProjectDesc").innerText = project.desc;
    
    // Set gambar project ke dalam modal
    const projectImage = document.getElementById("modalProjectImage");
    projectImage.src = `/assets/images/projects/${project.image}.png`; // Sesuaikan path gambar

    // Tampilkan modal
    modal.style.display = "block";

    // Fungsi untuk menutup modal
    document.querySelector(".close").onclick = function() {
        modal.style.display = "none";
    };

    // Tutup modal jika klik di luar area modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function showCertification(certification) {
    let certificationContainer = document.querySelector("#certification .box-container");
    let certificationHTML = "";
    certification.slice(0, 9).forEach((certif) => {
        certificationHTML += `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/certifications/${certif.image}.png" alt="certification" />
            <div class="content">
                <div class="tag">
                    <h3>${certif.name}</h3>
                </div>
            </div>
        </div>`
    });
    // <p>${project.desc}</p>
    certificationContainer.innerHTML = certificationHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
    srtop.reveal('.work .box', { interval: 200 });
}


fetchData().then(data => {
    showSkills(data);
});

fetchData("certifications").then(data => {
    showCertification(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }

// // Start of Tawk.to Live Chat
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

// Swiper.js
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    initialSlide: 2,
    spaceBetween: 30,
    centeredSlides: true,
    // loop: true, 
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     dynamicBullets: true,
    // },
    navigation: {
        nextEl: '.next', 
        prevEl: '.prev', 
    },
    effect: 'slide',
    slideToClickedSlide: true,
    breakpoints: {
        0: { 
        slidesPerView: 1, 
        centeredSlides: false,
        },
        768: { 
        slidesPerView: 2, 
        centeredSlides: false,
        },
        1024: { 
        slidesPerView: 3, 
        centeredSlides: true,
        }
    }
    });

  
  
  

