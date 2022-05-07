let myForm = document.getElementById('login-form');
let username = document.getElementById('email');
let password = document.getElementById('password');
let errorDiv = document.getElementById('error');

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (username.value.trim() || password.value.trim()) {
            error.hidden = true;
            try {
                // checkUsername(username.value);
                // checkPassword(password.value);
                $.post('/user/page-user-login', { username: username.value, password: password.value }).then((res) => {
                    if (res.code == 400) {
                        errorDiv.innerHTML = res.error;
                        errorDiv.hidden = false;
                        //alert(res.error);
                    } else {
                        location.replace('/user/private');
                    }
                });
            } catch (e) {
                errorDiv.hidden = false;
                errorDiv.innerHTML = e;
            }
        } else {
            username.value = '';
            password.value = '';
            errorDiv.hidden = false;
            errorDiv.innerHTML;
        }
    });
}
