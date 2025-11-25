$(document).ready(function(){
  $('.fa-bars').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });
  $(Window).on('scroll load',function(){
      $('.fa-bars').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      if($(Window).scrollTop()>30){
          $('header').addClass('header-active');
      }
      else{
          $('header').removeClass('header-active');
      }
  })
});
  // Select the form elements
  const formContainer = document.querySelector('.form-container');
  const nameInput = formContainer.querySelector('input[type="text"]');
  const emailInput = formContainer.querySelector('input[type="email"]');
  const phoneInput = formContainer.querySelector('input[type="number"]');
  const messageInput = formContainer.querySelector('textarea');
  const submitBtn = formContainer.querySelector('input[type="submit"]');

  // Handle form submission
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Simple validation
    if(nameInput.value.trim() === "" || emailInput.value.trim() === "" || phoneInput.value.trim() === "" || messageInput.value.trim() === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if(!emailInput.value.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    alert(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);

    // Clear the form
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";
  });
