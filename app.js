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







// Function to fetch and interpolate data from data.json
function fetchAndInterpolateData() {
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          const portfolioList = document.getElementById('portfolioList');
          data.projects.forEach(project => {
              const portfolioItem = document.createElement('div');
              portfolioItem.classList.add('portfolio-item');

              const image = document.createElement('div');
              image.classList.add('image');
              const img = document.createElement('img');
              img.setAttribute('src', project.img);
              img.setAttribute('alt', project.title);
              image.appendChild(img);

              const hoverItems = document.createElement('div');
              hoverItems.classList.add('hover-items');

              const h3 = document.createElement('h3');
              h3.setAttribute('id', 'title');

              const listItem1 = document.createElement('ul');
              listItem1.textContent = project['sub-title'];

              const listItem2 = document.createElement('ul');
              listItem2.textContent = project.title;

              h3.appendChild(listItem1);
              h3.appendChild(listItem2);

              const icons = document.createElement('div');
              icons.classList.add('icons');

              const link1 = document.createElement('a');
              link1.setAttribute('href', project['url-source']);
              link1.setAttribute('target', '_blank');
              link1.classList.add('icon');
              const icon1 = document.createElement('i');
              icon1.classList.add('fab', 'fa-github');
              link1.appendChild(icon1);

              const link2 = document.createElement('a');
              link2.setAttribute('href', project['url-page']);
              link2.setAttribute('target', '_blank');
              link2.classList.add('icon');
              const icon2 = document.createElement('i');
              icon2.classList.add('fas', 'fa-globe-africa');
              link2.appendChild(icon2);

              icons.appendChild(link1);
              icons.appendChild(link2);

              hoverItems.appendChild(h3);
              hoverItems.appendChild(icons);

              portfolioItem.appendChild(image);
              portfolioItem.appendChild(hoverItems);

              portfolioList.appendChild(portfolioItem);
          });
      })
      .catch(error => {
          console.error('Error fetching and interpolating data:', error);
      });
}

// Call the function to fetch and interpolate data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndInterpolateData);
