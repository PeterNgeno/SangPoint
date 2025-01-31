const referralLink = "https://quiz-perontips.vercel.app/";

// Load previously shared numbers from localStorage
let sharedViewers = JSON.parse(localStorage.getItem("sharedViewers")) || [];
updateProgressBar(); // Update on page load

// Function to send WhatsApp message
function shareOnWhatsApp() {
    let phoneNumber = prompt("Enter the WhatsApp number of the viewer (e.g., +2547xxxxxxxx):");

    if (!phoneNumber) {
        alert("No phone number entered!");
        return;
    }

    // Check if the number is already in the shared list
    if (sharedViewers.includes(phoneNumber)) {
        alert("You have already sent the link to this viewer. Please enter a different number.");
        return; // Stop if it's a duplicate number
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

    // Open WhatsApp with prefilled message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

// Function to update the progress bar
function updateProgressBar() {
    let count = sharedViewers.length;
    let progressPercent = (count / 1000) * 100;

    document.getElementById("viewersCount").innerText = count;
    document.getElementById("progress").style.width = progressPercent + "%";
}
