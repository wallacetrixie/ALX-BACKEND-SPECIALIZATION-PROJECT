document.addEventListener("DOMContentLoaded", function () {
            const tabs = document.querySelectorAll('.nav-link');
            tabs.forEach(tab => {
                tab.addEventListener('click', function (event) {
                    event.preventDefault();
                    const target = this.getAttribute('href').substring(1);
                    const tabContent = document.getElementById(target);
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    tabContent.classList.add('active');
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
});
        



// FETCHING DATA FROM THE PROFILES TABLE

window.onload = function() {
    fetch('/profiles')
        .then(response => response.json())
        .then(data => {
            const generalInfoDiv = document.getElementById('general-info');
            const infoDiv = document.getElementById('info');
            const socialLinksDiv = document.getElementById('social-links');

            data.forEach(profile => {
                // Populate General Information section
                generalInfoDiv.innerHTML = `
                    <h2>General Information</h2>
                    <div class="profile-field"><strong>Name:</strong> ${profile.name}</div>
                    <div class="profile-field"><strong>Email:</strong> ${profile.email}</div>
                    <div class="profile-field"><strong>Phone:</strong> ${profile.phone}</div>
                    <div class="profile-field"><strong>Age:</strong> ${profile.age}</div>
                    <div class="profile-field"><strong>Country:</strong> ${profile.country}</div>
                    <div class="profile-field"><strong>City:</strong> ${profile.city}</div>
                `;

                // Populate Info section
                infoDiv.innerHTML = `
                    <h2>Info</h2>
                    <div class="profile-field"><strong>Specialization:</strong> ${profile.specialization}</div>
                    <div class="profile-field"><strong>Highest Education Level:</strong> ${profile.education}</div>
                    <div class="profile-field"><strong>Recent Achievements:</strong> ${profile.achievements}</div>
                    <div class="profile-field"><strong>Bio:</strong> ${profile.bio}</div>
                `;

                // Populate Social Links section
                socialLinksDiv.innerHTML = `
                    <h2>Social Links</h2>
                    <div class="profile-field"><strong>LinkedIn:</strong> ${profile.linkedin}</div>
                    <div class="profile-field"><strong>Twitter:</strong> ${profile.twitter}</div>
                    <div class="profile-field"><strong>Facebook:</strong> ${profile.facebook}</div>
                    <div class="profile-field"><strong>Instagram:</strong> ${profile.instagram}</div>
                `;
            });
        })
        .catch(error => console.error('Error fetching profiles:', error));
};
