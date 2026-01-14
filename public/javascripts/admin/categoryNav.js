document.addEventListener('DOMContentLoaded', function() {
    const categoryNav = document.getElementById('categoryNav');
    const categoryNavItems = document.querySelectorAll('.category-nav-item');
    const categorySections = document.querySelectorAll('.category-section');

    if (!categoryNav || categorySections.length === 0) return;

    if (categorySections.length > 0) {
        const firstCategory = categorySections[0].dataset.category;
        categoryNavItems.forEach(item => {
            if (item.dataset.category === firstCategory) {
                item.classList.add('active');
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    let activeCategory = null;

    const observer = new IntersectionObserver((entries) => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        if (intersectingEntries.length > 0) {
            const entry = intersectingEntries[0];
            const category = entry.target.dataset.category;

            if (activeCategory !== category) {
                activeCategory = category;

                categoryNavItems.forEach(item => {
                    item.classList.remove('active');
                });

                categoryNavItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.classList.add('active');
                        const container = item.parentElement;
                        const itemLeft = item.offsetLeft;
                        const offset = 20;

                        container.scrollTo({
                            left: itemLeft - offset,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        }
    }, observerOptions);
    categorySections.forEach(section => {
        observer.observe(section);
    });

    categoryNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.dataset.category;
            const targetSection = document.getElementById('category-' + targetCategory);

            activeCategory = targetCategory;
            categoryNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');

            this.blur();

            if (targetSection) {
                const navHeight = categoryNav.offsetHeight;
                const navbarHeight = 56;
                const offset = navHeight + navbarHeight + 10;

                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
