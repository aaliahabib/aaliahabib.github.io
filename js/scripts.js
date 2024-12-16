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
        modal.style.display = 'flex';
        modalTitle.textContent = title
        if (title === "TAing") {
            modalBody.innerHTML = `<p class="lead"> I TAed various CS courses through college but the most challenging and meaningful experience was when I got the opportunity to Head TA the intro CS course at Brown with Andy van Dam. <br> I worked on a team of 5 Head TAs; we were responsible
                for redesigning projects, writing lecture slides, and hiring, training and coordinating a staff of 32 TAs. And, since it was 2021, we had to figure out how to make all of this work online! As part of the online redesign, I got
                to spend time rethinking the way we presented content for lab assignments and wrote and animated a series of educational “pre-lab” videos - here are a couple examples: </p>
                <div class="video-container">
                <iframe src="https://www.youtube.com/embed/bM2u5OUF1YQ?si=kXWd-BdkFWGmiukq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <iframe src="https://www.youtube.com/embed/hIPZZWe8nsE?si=sInxWKq-SrtN_BtJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>`;
        } else if (title === "scitoons") {
            modalBody.innerHTML = `<p> Scitoons, led by Professor Oludurotimi Adetunji, is a group at Brown that collaborates with researchers at the University to create animated videos that attempt to present the highly technical content of their research in accessible and engaging ways through short, animated videos. 
            I spent a little over a year working with this awesome group of people, learning about excited research and scripting and animating videos. Here are a couple examples:</p>     
            <div class="video-container">
            <iframe src="https://www.youtube.com/embed/mGb3rqJzqOk?si=BKxRN8mBP-gvPwgJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe src="https://www.youtube.com/embed/q3-S5hM-3QY?si=LWwFT1GLug7Wyl0P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>`
        } else if (title === "animate-from-audio") {
            modalBody.innerHTML = `<p> Animate from Audio was my first project Adobe. It's an app that allows users to animate 2D characters from audio. 
            The tool uses a deep learning model to predict the facial expressions of a character based on the audio input and is designed to be 
            user-friendly and intuitive, allowing users to create high-quality animations without the need for advanced animation skills. 
            You can check it out <a href="https://new.express.adobe.com/tools/animate-from-audio" target="_blank">here</a>! </p>`;

        } else if (title === "taxi-cab") {
            modalBody.innerHTML = `<p> For my first hackathon, my friends (Adam Pikielny, Mark Lavarayentyev, Charlie Gagnon) and I built taxiCAB. 
            Course registration at Brown was often chaotic. Often, to get a spot in a popular class, one had to monitor the registration 
            site (Courses At Brown, or, CAB) to see if a spot was available and nab it. We built an app that monitored CAB using Selenium, 
            so see if a specified course got a new opening, and then texted you. I worked primarily on the data storage. I can't promise it still works, 
            but you can check it out <a href="https://adams-first-project-662a3f.webflow.io/" target="_blank">here</a>. </p>`
        } else if (title === "snow-sim") {
            modalBody.innerHTML = `<p> As a final project for a graduate level computer graphics course, I implemented a snow simulation using the Material Point Method. As someone who 
          initially wanted to study physics, being able to apply physical constraints to graphic modelling was a lot of fun. You can check out the code 
          <a href="https://github.com/APikielny/snow" target="_blank">here</a>. </p>`
        } else if (title === "cloth-sim") {
            modalBody.innerHTML = `<p> For a final project in a computer graphics course, my friend Adam Pikielny and I implemented a cloth simulation, modelling the cloth using the point spring method. 
          You can check out the code <a href="https://github.com/aaliahabib/cloth-simulation" target="_blank">here</a>. </p>`
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