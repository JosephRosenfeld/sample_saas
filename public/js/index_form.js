var form = document.querySelector('form');
var inputEmail = document.getElementsByTagName('input')[0];
var inputPassword = document.getElementsByTagName('input')[1];

form.addEventListener("submit", function(event) {
    console.log("index test");
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log({email,password});
    fetch('/signup', {
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
        } else if (data.message == "Exists") {
            inputEmail.className = "mb-0 form-control is-invalid";
        }
    })
});
