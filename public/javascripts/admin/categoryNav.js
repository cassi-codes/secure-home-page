// Category Navigation with Scroll Detection (Mobile Only)
document.addEventListener('DOMContentLoaded', function() {
    const categoryNav = document.getElementById('categoryNav');
    const categoryNavItems = document.querySelectorAll('.category-nav-item');
    const categorySections = document.querySelectorAll('.category-section');

    if (!categoryNav || categorySections.length === 0) return;

    // Initialize with first category
    if (categorySections.length > 0) {
        const firstCategory = categorySections[0].dataset.category;
        categoryNavItems.forEach(item => {
            if (item.dataset.category === firstCategory) {
                item.classList.add('active');
            }
        });
    }

    // Intersection Observer for automatic category detection
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    let activeCategory = null;

    const observer = new IntersectionObserver((entries) => {
        // Filter only intersecting entries
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);

        // If there are intersecting entries, use the first one
        if (intersectingEntries.length > 0) {
            const entry = intersectingEntries[0];
            const category = entry.target.dataset.category;

            // Only update if it's a different category
            if (activeCategory !== category) {
                activeCategory = category;

                // Remove active class from all items first
                categoryNavItems.forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class only to the matching item
                categoryNavItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.classList.add('active');
                        // Scroll nav item into view with offset from left edge
                        const container = item.parentElement;
                        const itemLeft = item.offsetLeft;
                        const offset = 20; // 20px padding from left edge

                        container.scrollTo({
                            left: itemLeft - offset,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        }
    }, observerOptions);

    // Observe all category sections
    categorySections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll on nav item click
    categoryNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.dataset.category;
            const targetSection = document.getElementById('category-' + targetCategory);

            // Immediately update active state on click
            activeCategory = targetCategory;
            categoryNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');

            // Remove focus from the clicked button
            this.blur();

            if (targetSection) {
                const navHeight = categoryNav.offsetHeight;
                const navbarHeight = 56; // navbar height
                const offset = navHeight + navbarHeight + 10; // 10px extra padding

                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
