redirectIfLoggedIn();

$(() => {
    $('#signin_form').submit((event) => {
        event.preventDefault();

        const email =$('#email').val();
        const password =$('#password').val();
        const user = {
            email,
            password
        };

        login(user)
            .then(result => {
                console.log(result);
                setIdRedirect(result);
            }).catch(error => {
                showErrorMessage(error.responseJSON.message);
            });
    });
});

function login(user) {
    return $.post(`${AUTH_URL}/signin`, user);
}
