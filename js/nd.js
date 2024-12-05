document.addEventListener('DOMContentLoaded', () => {
    const allSections = Array.from(document.querySelectorAll('section'));
    const navbarMenu = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Create navigation links for each section
    allSections.forEach(section => {
        const listItem = document.createElement('li');
        const anchorLink = document.createElement('a');
        anchorLink.textContent = section.getAttribute('data-nav');
        anchorLink.href = `#${section.id}`;
        anchorLink.classList.add('menu__link');
        listItem.appendChild(anchorLink);
        navbarMenu.appendChild(listItem);
    });

    // Smooth scroll to section on navbar link click
    navbarMenu.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Highlight the section in viewport and corresponding navbar link on scroll
    window.addEventListener('scroll', () => {
        let activeSection = null;
        allSections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top >= 0 && sectionRect.top < window.innerHeight / 2) {
                activeSection = section;
            }
        });

        // Remove active class from all sections
        allSections.forEach(section => {
            section.classList.remove('your-active-class');
        });

        // Add active class to the current section
        if (activeSection) {
            activeSection.classList.add('your-active-class');
        }

        // Highlight the corresponding navbar link
        document.querySelectorAll('.menu__link').forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${activeSection?.id}`) {
                navLink.classList.add('active');
            }
        });
    });

    // Show or hide the scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Smooth scroll to top on button click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
