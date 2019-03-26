redirectIfLoggedIn();

$(() => {
    $('#signup_form').submit((event) => {
        event.preventDefault();

        const email =$('#email').val();
        const password =$('#password').val();
        const confirm_password =$('#confirm_password').val();
        const user = {
            email,
            password,
            confirm_password
        };

        signup(user)
            .then(result => {
                console.log(result);
                setIdRedirect(result);
            }).catch(error => {
                showErrorMessage(error.responseJSON.message);
            });
    });
});

function signup(user) {
    return $.post(`${AUTH_URL}/signup`, user);
}
