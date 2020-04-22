var form = document.querySelector('form');
var inputEmail = document.querySelector('#inputEmail');
var inputPassword = document.querySelector('#inputPassword');

form.addEventListener("submit", function(event) {
    console.log("test");
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log({email,password});
    fetch('/login', {
        method: 'post',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if (data.message == "Redirect") {
            window.location.href = "/main";
        } else {
            form.reset();
            inputEmail.className += " is-invalid";
            inputPassword.className += " is-invalid";
        }
    })
});