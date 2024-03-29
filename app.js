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

// Load tool from techtools.json
fetch('data/techtools.json')
  .then(response => response.json())
  .then(data => {
    const toolItems = data.tools;
    const section = document.getElementById("toolList");
    displayToolItems(toolItems, section);
  })
  .catch(error => console.error('Error fetching tool:', error));

function displayToolItems(toolItems, section) {
  let displayTool = toolItems.map(function (item) {
    return `<a href=${item.href} target="_blank" rel="noreferrer">
              <img src=${item.src} alt=${item.alt} width="40" height="40"/>
            </a>`;
  });
  displayTool = displayTool.join("");
  section.innerHTML = displayTool;
}

// Load timeline from timeline.json
fetch('data/timeline.json')
  .then(response => response.json())
  .then(data => {
    const timelineItems = data.timeline;
    const timelineSection = document.getElementById("timelineList");
    displayTimelineItems(timelineItems, timelineSection);
  }).catch(error => console.error('Error fetching timeline:', error));

function displayTimelineItems(timelineItems, timelineSection) {
  let displayTimeline = timelineItems.map(function (item) {
    return `<div class="timeline-item">
              <div class="tl-icon">
                <i class="${item.icon}"></i>
              </div>
              <p class="tl-duration">${item.duration}</p>
              <h5>${item.title}<span>${item.subtitle}</span></h5>
              <p>
              𐫰 ${item.description1}
              <br//>
              𐫰 ${item.description2}
              <br//>
              𐫰 ${item.description3}
              <br//>
              𐫰 ${item.description4}
              </p>
            </div>`;
  });
  displayTimeline = displayTimeline.join("");
  timelineSection.innerHTML = displayTimeline;
}

// Load project from project.json
fetch('data/project.json')
  .then(response => response.json())
  .then(project => {
    const projectItems = project.projects;
    const sectionCenter = document.getElementById("portfolioList");
    displayProjectItems(projectItems, sectionCenter);
    displayProjectButtons(projectItems);
  })
  .catch(error => console.error('Error fetching project:', error));

// Load section part
function displayProjectItems(projectItems, sectionCenter) {
  let displayProject = projectItems.map(function (item) {
    return `<div class="portfolio-item ${item.category}">
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
                  <i class="fas fa-globe"></i>
                  </a>
                </div>
              </div>
            </div>`;
  });
  displayProject = displayProject.join("");
  sectionCenter.innerHTML = displayProject;
}

// New bottom filter
function displayProjectButtons(projectItems) {
  const categories = projectItems.reduce(
    function (values, item) {
      if (!values.includes(item.category)){
        values.push(item.category);
      }
      return values;
    }, ["All"]
  );
    const container = document.querySelector(".portfolio-btn");
    const categoriesBtns = categories.map(function (category) {
      return `<div class="filter-btn btn-con">
                <a href="#" class="main-btn">
                  <span class="btn-text" data-id="${category}">${category}</span>
                </a>
              </div>`;
    }).join("");
    container.innerHTML = categoriesBtns;
    const filterBtns = container.querySelectorAll(".filter-btn");
    // filter items
    filterBtns.forEach(function(btn){
      btn.addEventListener("click", function(e){
        const category = e.currentTarget.querySelector(".btn-text").dataset.id;
        if (category === "all"){
          displayAllProjectItems(projectItems);
        } else {
          filterProjectItemsByCategory(projectItems, category);
        }
      });
    });
}

// Function to display all project items
function displayAllProjectItems(projectItems) {
  const sectionCenter = document.getElementById("portfolioList");
  displayProjectItems(projectItems, sectionCenter);
}

// Function to filter project items by category
function filterProjectItemsByCategory(projectItems, category) {
  const sectionCenter = document.getElementById("portfolioList");
  const filteredProjectItems = projectItems.filter(function(projectItem) {
    return projectItem.category === category;
  });
  displayProjectItems(filteredProjectItems, sectionCenter);
}
