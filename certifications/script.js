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
            document.title = "Certifications | Portfolio Berlian M.";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

// fetch Certifications start
function getCertifications() {
    return fetch("../certifications/certification.json")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

function showCertifications(certifications, start = 0, limit = 10) {
    let certificationsContainer = document.querySelector(".certification .box-container");
    let certificationsHTML = "";

    // Batasi jumlah data yang akan dirender untuk mencegah crash
    const selectedCertifications = certifications.slice(start, start + limit);

    selectedCertifications.forEach(certification => {
        certificationsHTML += `
        <div class="grid-item ${certification.category}">
            <div class="box tilt">
                <img draggable="false" src="/assets/images/certifications/${certification.image}.png" alt="certification" />
                <div class="content">
                    <div class="tag">
                        <h3>${certification.name}</h3>
                    </div>
                </div>
            </div>
        </div>`;
    });

    certificationsContainer.insertAdjacentHTML("beforeend", certificationsHTML);
    
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    // Make sure Isotope is re-layout after adding elements
    $('.box-container').imagesLoaded(function () {
        var $grid = $('.box-container').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            masonry: {
                columnWidth: '.grid-item', // Atur columnWidth agar sesuai dengan card
            }
        });
        
        // Refresh layout to fix any misalignment issues
        $grid.isotope('layout');
    });
}

// Lazy load more certifications when scrolling
function setupLazyLoading(certifications) {
    let currentIndex = 0;
    const batchSize = 30; // Number of certifications to load at a time

    function loadMore() {
        if (currentIndex < certifications.length) {
            showCertifications(certifications, currentIndex, batchSize);
            currentIndex += batchSize;
        }
    }

    // Initial load
    loadMore();

    // Set up scroll listener
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
            loadMore();
        }
    });

    // Continuously check if all data has loaded, otherwise keep loading
    const intervalId = setInterval(() => {
        if (currentIndex < certifications.length && document.body.scrollHeight <= window.innerHeight) {
            loadMore();
        } else {
            clearInterval(intervalId); // Stop checking once all data is loaded
        }
    }, 500);
}

getCertifications().then(data => {
    setupLazyLoading(data);
});
// fetch Certifications end



// // disable developer mode
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