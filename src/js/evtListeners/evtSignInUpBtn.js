// function to store the window location before going into login or sign up page
export function eventSignInUpBtn() {
  const eventSignInBtn = document.querySelectorAll('.eventSignInBtn');
  const eventSignUpBtn = document.querySelectorAll('.eventSignUpBtn');
  eventSignInBtn.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('lastVisitedPage', window.location.href);
      window.location.href = 'html/auth/login.html';
    });
  });
  eventSignUpBtn.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem('lastVisitedPage', window.location.href);
      window.location.href = 'html/auth/signup.html';
    });
  });
}
