document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    const addMemberBtn = document.getElementById("addMemberBtn");
    const memberContainer = document.querySelector(".team-members");
    let memberCount = 3; // Default members

    // Handle multi-step form navigation
    nextButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (currentStep < formSteps.length) {
                formSteps[currentStep - 1].classList.remove("active");
                formSteps[currentStep].classList.add("active");
                currentStep++;
            }
        });
    });

    backButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (currentStep > 1) {
                formSteps[currentStep - 1].classList.remove("active");
                formSteps[currentStep - 2].classList.add("active");
                currentStep--;
            }
        });
    });

    // Add additional team members dynamically
    addMemberBtn.addEventListener("click", function () {
        memberCount++;
        const memberHTML = `
            <div class="member-inputs">
                <div class="form-group">
                    <input type="text" id="memberName${memberCount}" name="memberName${memberCount}">
                    <label for="memberName${memberCount}">Member ${memberCount} Name (Optional)</label>
                    <div class="form-icon circle"></div>
                </div>
                <div class="form-group">
                    <input type="email" id="memberEmail${memberCount}" name="memberEmail${memberCount}">
                    <label for="memberEmail${memberCount}">Member ${memberCount} Email</label>
                    <div class="form-icon circle"></div>
                </div>
            </div>
        `;
        memberContainer.insertAdjacentHTML("beforeend", memberHTML);
    });

    // Handle form submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(this);
        let data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Collect dynamically added team members
        let additionalMembers = [];
        for (let i = 4; i <= memberCount; i++) {
            let memberName = document.getElementById(`memberName${i}`)?.value || "";
            let memberEmail = document.getElementById(`memberEmail${i}`)?.value || "";
            if (memberName && memberEmail) {
                additionalMembers.push({ name: memberName, email: memberEmail });
            }
        }

        // Add additional members array to data
        data["additionalMembers"] = JSON.stringify(additionalMembers);

        // Send data to Google Sheets via Apps Script
        fetch("https://script.google.com/macros/s/AKfycbz8XlFVtsaSLb8pV1LpwMvBw90f1aTT7AOmKl9RZvVSxn8KkBHeQwoTXRsPm9qIkKvdRw/exec", {
            method: "POST",
            mode: "no-cors", // Ensures request is sent but does not wait for response
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(() => {
            // Show success message (optional)
            alert("Registration Successful!");

            // Redirect to index page
            window.location.href = "index.html";
        })
        .catch(error => console.error("Error:", error));
    });
});
