(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


// preloader

// const preloader = document.querySelector(".preloader");
// window.addEventListener("load", function(){
//     preloader.classList.add("hide-preloader");

// })

// Function to fetch the header content from pages/header.html
function fetchHeaderContent() {
  fetch('pages/header.html')
      .then(response => response.text())
      .then(content => {
          const headerContainer = document.getElementById('headerContainer');
          headerContainer.innerHTML = content;
      })
      .catch(error => {
          console.error('Error fetching header:', error);
      });
}
// Call the function to fetch the header content when the page loads
document.addEventListener('DOMContentLoaded', fetchHeaderContent);


// Function to fetch the header content from pages/contact.html
function fetchContactContent() {
  fetch('pages/contact.html')
      .then(response => response.text())
      .then(content => {
          const contactContainer = document.getElementById('contactContainer');
          contactContainer.innerHTML = content;
      })
      .catch(error => {
          console.error('Error fetching contact:', error);
      });
}
// Call the function to fetch the contact content when the page loads
document.addEventListener('DOMContentLoaded', fetchContactContent);

// Load project from project.json
fetch('data/project.json')
  .then(response => response.json())
  .then(project => {
    const projectItems = project.projects;
    const sectionCenter = document.getElementById("portfolioList");
    displayProjectItems(projectItems, sectionCenter);
  })
  .catch(error => console.error('Error fetching project:', error));

function displayProjectItems(projectItems, sectionCenter) {
  let displayProject = projectItems.map(function (item) {
    return `
      <div class="portfolio-item">
        <div class="image">
          <img src=${item.img} alt=${item.title}>
        </div>
        <div class="hover-items">
          <h3 id="title">
            <li>
              <ul>${item['sub-title']}</ul>
              <ul>${item.title}</ul>
            </li>
          </h3>
          <div class="icons">
            <a href=${item['url-source']} target="_blank" class="icon">
            <i class="fab fa-github"></i>
            </a>
            <a href=${item['url-page']} class="icon" target="_blank">
            <i class="fab fa-globe"></i>
            </a>
          </div>
        </div>
      </div>`;
  });
  displayProject = displayProject.join("");
  sectionCenter.innerHTML = displayProject;
}
