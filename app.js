const referralLink = "https://quiz-perontips.vercel.app/";

// Load previously shared numbers from localStorage
let sharedViewers = JSON.parse(localStorage.getItem("sharedViewers")) || [];
updateProgressBar(); // Update progress on page load

// Function to send WhatsApp message
function shareOnWhatsApp() {
    let phoneNumber = prompt("Enter the phone number of the viewer (e.g., +2547xxxxxxxx):");

    if (!phoneNumber) {
        alert("No phone number entered!");
        return;
    }

    // Remove spaces and ensure consistent format
    phoneNumber = phoneNumber.replace(/\s+/g, "").trim();

    // Check if the number is already in the shared list
    if (sharedViewers.includes(phoneNumber)) {
        alert("You have already referred this viewer. Please enter a different number.");
        return; // Prevent duplicate referral
    }

    // Add the number to the list of shared viewers
    sharedViewers.push(phoneNumber);
    localStorage.setItem("sharedViewers", JSON.stringify(sharedViewers));

    // Update progress bar
    updateProgressBar();

    // Generate WhatsApp message
    let message = encodeURIComponent(
        `Hey! Earn Ksh 50 by sharing this link with 1000 viewers: ${referralLink}`
    );

    // Open WhatsApp with the message but without blocking new referrals
    window.open(`https://wa.me/?text=${message}`, "_blank");
}

// Function to update the progress bar
function updateProgressBar() {
    let count = sharedViewers.length;
    let progressPercent = (count / 1000) * 100;

    document.getElementById("viewersCount").innerText = count;
    document.getElementById("progress").style.width = progressPercent + "%";
}

// Optional: Reset progress for testing
function resetProgress() {
    localStorage.removeItem("sharedViewers");
    sharedViewers = [];
    updateProgressBar();
}
