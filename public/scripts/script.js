const choices = document.querySelectorAll(".choice");
const components = document.querySelectorAll(".component-item");
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const selectedChoice = choice.id;
    components.forEach((component) => {
      if (component.classList.contains(selectedChoice)) {
        component.classList.remove("hide");
      } else {
        component.classList.add("hide");
      }
    });
  });
});
function toggleDropdown() {
  var dropdownContent = document
    .getElementById("profile-dropdown")
    .getElementsByClassName("profile-details")[0];
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", function () {
  var groups = document.querySelectorAll(".groups");
  var dropdowns = document.querySelectorAll(".dropdown-content");

  groups.forEach(function (group, index) {
    group.addEventListener("mouseenter", function () {
      dropdowns.forEach(function (dropdown, idx) {
        if (idx !== index) {
          dropdown.style.display = "none";
        }
      });

      dropdowns[index].style.display = "block";
    });
  });

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("mouseleave", function () {
      dropdown.style.display = "none";
    });
  });
  document.body.addEventListener("click", function () {
    dropdowns.forEach(function (dropdown) {
      dropdown.style.display = "none";
    });
  });
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
});

function toggleForm() {
  var form = document.getElementById("profileForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

setTimeout(() => {
  // Fetch data from server and render posts
  fetch("/posts")
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = "";
      posts.reverse().forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                    <h2><strong>Category:</strong> ${post.title}</h2>
                    <p><span class="name">${
                      post.name
                    }
                    <p>${post.description}</p>
                    <p>Pay rate: Ksh${post.amount}</p>
                   
                    <button class="message-btn" onclick="redirectToPage1('${
                      post.name
                    }')"><i class="far fa-envelope"></i> Message</button>
                   
                `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
}, 2000);

function redirectToPage1(name) {
  window.location.href = `page1.html?name=${encodeURIComponent(name)}`;
}

function fetchUserDetails() {
  fetch("/account")
    .then((response) => response.json())
    .then((data) => {
      displayUserDetails(data);
    })
    .catch((error) => console.error("Error fetching user details:", error));
}
function displayUserDetails(data) {
  const userDetailsContainer = document.getElementById("userDetailsContainer");
  userDetailsContainer.innerHTML = "";

  data.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("profile-section");

    userElement.innerHTML = `
      <h2>Profile Details</h2>
      <div class="details-list">
        <div class="details-item">
          <i class="fas fa-user"></i>
          <p><strong>Full Name:</strong> ${user.fullname}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-envelope"></i>
          <p><strong>Email:</strong> ${user.email}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-phone"></i>
          <p><strong>Telephone:</strong> ${user.telephone}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-calendar-alt"></i>
          <p><strong>Age:</strong> ${user.years}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-location"></i>
          <p><strong>Country:</strong> ${user.country}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-tag"></i>
          <p><strong>Specialization:</strong> ${user.interest}</p>
        </div>
        <div class="details-item">
          <i class="fas fa-info-circle"></i>
          <p><strong>Details:</strong> ${user.details}</p>
        </div>
      </div>
    `;
    userDetailsContainer.appendChild(userElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchUserDetails);
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function () {
  window.location.href = "login_page.html";
});
const myAccountBtn = document.getElementById("myAccountBtn");
myAccountBtn.addEventListener("click", function () {
  window.location.href = "form.html";
});

const messageBtn = document.querySelector(".message-btn");
messageBtn.addEventListener("click", () => {
  window.location.href = "page1.html";
});


// SEARCH
const searchForm = document.querySelector(".search-form");
const searchInput = document.getElementById("searchInput");
const suggestionsContainer = document.createElement("div");
suggestionsContainer.classList.add("suggestions-container");
searchInput.parentNode.appendChild(suggestionsContainer);
const categories = [
  {
    name: "Graphics and Design",
    subcategories: [
      "Graphic Design",
      "Logo Design",
      "Illustration",
      "UI/UX Design",
    ],
  },
  {
    name: "Programming and Tech",
    subcategories: [
      "Web Development",
      "Mobile App Development",
      "Software Engineering",
      "Data Science",
    ],
  },
  {
    name: "Software development",
    subcategories: [
      "Agile Development",
      "DevOps",
      "Quality Assurance",
      "Project Management",
    ],
  },
  {
    name: "Manual labour services",
    subcategories: ["Carpentry", "Plumbing", "Electrical", "Painting"],
  },
  {
    name: "Business",
    subcategories: ["Entrepreneurship", "Finance", "Marketing", "Management"],
  },
  {
    name: "Digital marketing",
    subcategories: [
      "SEO",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
    ],
  },
  {
    name: "Academic writing",
    subcategories: [
      "Essay Writing",
      "Research Papers",
      "Thesis Writing",
      "Editing & Proofreading",
    ],
  },
  {
    name: "Consulting",
    subcategories: [
      "Management Consulting",
      "IT Consulting",
      "Financial Consulting",
      "Legal Consulting",
    ],
  },
];


// Function to display suggestions based on user input
function displaySuggestions(searchTerm) {
  suggestionsContainer.innerHTML = "";
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredCategories.forEach((category) => {
    const suggestionGroup = document.createElement("div");
    suggestionGroup.classList.add("suggestion-group");
    const categoryName = document.createElement("div");
    categoryName.classList.add("category-name");
    categoryName.textContent = category.name;
    suggestionGroup.appendChild(categoryName);

    const subcategoryList = document.createElement("ul");
    category.subcategories.forEach((subcategory) => {
      const subcategoryItem = document.createElement("li");
      subcategoryItem.textContent = subcategory;
      subcategoryItem.addEventListener("click", function () {
        searchInput.value = subcategory;
        suggestionsContainer.innerHTML = ""; 
      });
      subcategoryList.appendChild(subcategoryItem);
    });
    suggestionGroup.appendChild(subcategoryList);

    suggestionsContainer.appendChild(suggestionGroup);
  });
  suggestionsContainer.style.display = filteredCategories.length
    ? "block"
    : "none";
}
searchInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    displaySuggestions(this.value);
  } else {
    suggestionsContainer.style.display = "none";
  }
});
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    const courseListElement = document.getElementById("courseList");
    if (courseListElement) {
      courseListElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest", duration: 10000 });
    }
  }
});
