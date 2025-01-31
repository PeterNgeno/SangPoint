let referredCount = 0;

function updateReferredCount() {
  document.getElementById('referred-count').textContent = referredCount;

  // Enable reward button if 1000 viewers are referred
  if (referredCount >= 1000) {
    document.getElementById('claim-reward-btn').disabled = false;
  }
}

function shareLink() {
  const referralUrl = document.getElementById('referral-link').value;
  const message = `Join me on SangPoint and earn Ksh 50! Click on this link: ${referralUrl}`;

  // Check if the viewer has already been referred
  const viewerId = getViewerId();
  if (hasAlreadyReferred(viewerId)) {
    alert("You have already referred this viewer. Please share with new viewers.");
    return;
  }

  // Open WhatsApp sharing
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  // Track this referral
  addReferral(viewerId);
}

function claimReward() {
  alert("Congratulations! You have earned Ksh 50!");
  referredCount = 0;
  updateReferredCount(); // Reset the count after claiming reward
}

function becomeUser() {
  referredCount++;
  updateReferredCount();

  // Store the user's referral status
  localStorage.setItem('isUser', true);
  document.getElementById('viewer-section').style.display = 'none';
  document.getElementById('share-section').style.display = 'block';
}

// Generate a unique viewer ID (could be a session-based ID or a unique identifier)
function getViewerId() {
  const viewerId = localStorage.getItem('viewerId');
  if (!viewerId) {
    const newViewerId = 'viewer-' + new Date().getTime();
    localStorage.setItem('viewerId', newViewerId);
    return newViewerId;
  }
  return viewerId;
}

// Check if the user has already referred the current viewer
function hasAlreadyReferred(viewerId) {
  const referredViewers = JSON.parse(localStorage.getItem('referredViewers')) || [];
  return referredViewers.includes(viewerId);
}

// Add the viewer to the referred list
function addReferral(viewerId) {
  const referredViewers = JSON.parse(localStorage.getItem('referredViewers')) || [];
  referredViewers.push(viewerId);
  localStorage.setItem('referredViewers', JSON.stringify(referredViewers));
}

// Check if the visitor is a viewer or a user (using localStorage for demo purposes)
if (!localStorage.getItem('isUser')) {
  document.getElementById('viewer-section').style.display = 'block';
} else {
  document.getElementById('share-section').style.display = 'block';
  referredCount = parseInt(localStorage.getItem('referredCount')) || 0;
  updateReferredCount();
}
