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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Berlian M.";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.forEach((project, index) => {
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

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end


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