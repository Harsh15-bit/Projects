// focus the cursor on the email-address input
const emailField = document.getElementById("email-address-input");
emailField.focus({
  preventScroll: true,
});
// Function to show alert message
  function workingInProgress(event) {
    event.preventDefault(); // stop the default link action
    alert("🛠️ This feature is currently under development. Please check back soon!");
  }

  // Apply to all buttons and links except Home
  document.addEventListener("DOMContentLoaded", () => {
    // Select all anchor and button elements
    const links = document.querySelectorAll("a, button");

    links.forEach(link => {
      // Skip Home link
      if (
        link.textContent.trim() !== "Home" &&
        !link.classList.contains("active")
      ) {
        // Add event listener
        link.addEventListener("click", workingInProgress);
      }
    });
  });

