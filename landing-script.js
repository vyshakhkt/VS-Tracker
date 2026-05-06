const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // This triggers the CSS
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the section is visible

// Tell the script to watch everything with the 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));