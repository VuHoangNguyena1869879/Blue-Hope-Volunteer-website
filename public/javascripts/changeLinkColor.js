document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0];
    const navItems = document.querySelectorAll(".navigation_bar ul li");
    navItems.forEach(item => {
        const link = item.querySelector("a");
        const page = link.getAttribute("href").split("/").pop().split(".")[0];
        if (page === currentPage) {
            item.classList.add("active");
        }
        link.addEventListener("click", function() {
            navItems.forEach(navItem => navItem.classList.remove("active"));
            item.classList.add("active");
        });
    });
});