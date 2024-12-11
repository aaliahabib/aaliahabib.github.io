window.addEventListener('DOMContentLoaded', event => {

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    const modal = document.getElementById('custom-modal');
    const closeButton = modal.querySelector('.close-btn');
    const openModalButtons = document.querySelectorAll('.card');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');



    // Function to open modal and populate with content
    function openModal(title) {
        if (title === "animate-from-audio") {
            window.open('https://new.express.adobe.com/tools/animate-from-audio', '_blank');
            return;
        } else if (title === "snow-sim") {
            window.open('https://github.com/APikielny/snow', '_blank');
            return;
        } else if (title === "taxi-cab") {
            window.open('https://adams-first-project-662a3f.webflow.io/', '_blank');
            return;
        } else if (title === "cloth-sim") {
            window.open('https://github.com/aaliahabib/cloth-simulation', '_blank');
            return;
        }
        modal.style.display = 'flex';
        modalTitle.textContent = title
        if (title === "TAing") {
            modalBody.innerHTML = `<p class="lead"> I TAed various CS courses through college but the most challenging and meaningful experience was when I got the opportunity to Head TA the intro CS course at Brown with Andy van Dam. <br> I worked on a team of 5 Head TAs; we were responsible
                for redesigning projects, writing lecture slides, and hiring, training and coordinating a staff of 32 TAs. And, since it was 2021, we had to figure out how to make all of this work online! As part of the online redesign, I got
                to spend time rethinking the way we presented content for lab assignments and wrote and animated a series of educational “pre-lab” videos - here are a couple examples: </p>
                <div class-"video-container">
                <iframe src="https://www.youtube.com/embed/bM2u5OUF1YQ?si=kXWd-BdkFWGmiukq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <iframe src="https://www.youtube.com/embed/hIPZZWe8nsE?si=sInxWKq-SrtN_BtJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>`;
        } else if (title === "scitoons") {
            modalBody.innerHTML = `<p> Scitoons, led by Professor Oludurotimi Adetunji, is a group at Brown that collaborates with researchers at the University to create animated videos that attempt to present the highly technical content of their research in accessible and engaging ways through short, animated videos. 
            I spent a little over a year working with this awesome group of people from very different technical backgrounds, learning about excited research and scripting and animating videos. Here are a couple examples:</p>     
            <iframe src="https://www.youtube.com/embed/mGb3rqJzqOk?si=BKxRN8mBP-gvPwgJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe src="https://www.youtube.com/embed/q3-S5hM-3QY?si=LWwFT1GLug7Wyl0P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        } else {
            modalBody.textContent = "hi";
        }



    }

    // Close the modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Event listeners for buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            openModal(title);
        });
    });

});