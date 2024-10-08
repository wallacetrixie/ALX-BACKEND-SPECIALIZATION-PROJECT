const createPostBtn = document.getElementById("createPostBtn");
const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const popupSuccess = document.getElementById("popup-success");
const popupWarning = document.getElementById("popup-warning");
createPostBtn.addEventListener("click", function () {
  if (
    nameInput.value.trim() === "" ||
    titleInput.value.trim() === "" ||
    descriptionInput.value.trim() === "" ||
    amountInput.value.trim() === ""
  ) {
    alert("Please fill in all fields before creating a post.");
  } else {
    popupSuccess.style.display = "block";
    setTimeout(function () {
      popupSuccess.style.display = "none";
      setTimeout(function () {
        popupWarning.style.display = "block";
        setTimeout(function () {
          popupWarning.style.display = "none";
        }, 7000);
      }, 7000);
    }, 7000);
  }
});
document.getElementById("About").style.display = "none";

document.getElementById("toggleAbout").addEventListener("click", function () {
  var aboutSection = document.getElementById("About");
  aboutSection.style.display =
    aboutSection.style.display === "none" ? "block" : "none";
});
document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".Btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const likeCountElement = button.querySelector(".likeCount");
      let currentCount = parseInt(
        likeCountElement.textContent.replace(/,/g, ""),
        10
      );
      currentCount++;
      likeCountElement.textContent = currentCount.toLocaleString();
    });
  });
});
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
function toggleDropdown() {
  var dropdownContent = document
    .getElementById("profile-dropdown")
    .getElementsByClassName("profile-details")[0];
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function () {
  window.location.href = "login_page.html";
});
const myAccountBtn = document.getElementById("myAccountBtn");
myAccountBtn.addEventListener("click", function () {
  window.location.href = "info.html";
});


window.onload = function () {
  fetch("/profiles")
    .then((response) => response.json())
    .then((data) => {
      const profileSectionsDiv = document.querySelector(".profile-sections");

      data.forEach((profile) => {
        const generalInfoDiv = document.createElement("div");
        generalInfoDiv.classList.add("profile-section");
        generalInfoDiv.id = `profile-${profile.id}`;

        generalInfoDiv.innerHTML = `
            <div class="heading">
                <img class="image" src="images/user.jpeg" />
                <h2>${profile.name}</h2>
            </div>
            <div class="profile-field"><strong>Email:</strong> ${profile.email}</div>
            <div class="profile-field"><strong>Specialization:</strong> ${profile.specialization}</div>
            <div class="profile-field"><strong>Achievements:</strong> ${profile.achievements}</div>
            <div class="profile-field"><strong>Bio:</strong> ${profile.bio}</div>
            <div class="profile-field"><strong>Location:</strong> ${profile.city}</div>
            <button class="hire-button">Hire <i class="fas fa-user-plus"></i></button>
        `;

        profileSectionsDiv.appendChild(generalInfoDiv);

        const hireButton = generalInfoDiv.querySelector(".hire-button");
        hireButton.addEventListener("click", function () {
          window.location.href = "page2.html";
        });
      });
    })
    .catch((error) => console.error("Error fetching profiles:", error));
};

document.addEventListener("DOMContentLoaded", function () {
  function animateNumbers(element, finalValue) {
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 100);
    const interval = setInterval(function () {
      currentValue += increment;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(interval);
      }
      element.textContent = currentValue;
    }, 10); 
  }
  animateNumbers(document.getElementById("services"), 50);
  animateNumbers(document.getElementById("clients"), 100);
  animateNumbers(document.getElementById("experts"), 200);
  animateNumbers(document.getElementById("ratings"), 5);
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

      document.addEventListener("DOMContentLoaded", function () {
        const groups = document.querySelectorAll(".group-container");
        const selectElement = document.getElementById("titleInput");
        groups.forEach((group) => {
          const groupName = group.querySelector(".groups").textContent;
          const subgroups = group.querySelectorAll(".dropdown-content a");
          const optgroup = document.createElement("optgroup");
          optgroup.label = groupName;
          subgroups.forEach((subgroup) => {
            const option = document.createElement("option");
            option.value = subgroup.textContent.trim();
            option.textContent = subgroup.textContent.trim();
            optgroup.appendChild(option);
          });
          selectElement.appendChild(optgroup);
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        const amountInput = document.getElementById("amountInput");
        amountInput.addEventListener("blur", function () {
          const enteredValue = parseFloat(amountInput.value);
          if (isNaN(enteredValue)) {
            alert("Please enter a valid number.");
            amountInput.value = "";
            return;
          }
          if (enteredValue < 1000) {
            alert("Amount should be greater than 1000.");
            amountInput.value = ""; 
          } else if (enteredValue > 100000) {
            alert("Amount should not be above 100000.");
            amountInput.value = ""; 
          }
        });
      });
      fetch("/reviews")
        .then((response) => response.json())
        .then((reviews) => {
          const reviewsContainer = document.getElementById("reviews-container");

          reviews.forEach((review) => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");

            const nameElement = document.createElement("p");
            nameElement.textContent = "Name: " + review.name;

            const reviewDescriptionElement = document.createElement("p");
            reviewDescriptionElement.textContent = "Review: " + review.review;

            reviewElement.appendChild(nameElement);
            reviewElement.appendChild(reviewDescriptionElement);

            reviewsContainer.appendChild(reviewElement);
          });
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
  const makeReviewButton = document.getElementById("make-review-button");
  const reviewContainer = document.querySelector(".review-container");
  makeReviewButton.addEventListener("click", () => {
    // Toggle the visibility of the review container
    reviewContainer.style.display =
      reviewContainer.style.display === "none" ? "block" : "none";
  });
    function redirectToPage1() {
      window.location.href = "page2.html";
    }