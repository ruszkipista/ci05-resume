window.addEventListener("load", function () {
    emailjs.init('user_5kw0NYoCq7r3XjakyaxMw');

    document.getElementById('form-contact')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = document.getElementById('button-send');
            const btnText = btn.textContent;
            btn.textContent = 'Sending...';

            const serviceID = 'default_service';
            const templateID = 'template_Rosie';
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.textContent = btnText;
                    alert('Sent message!');
                }, (err) => {
                    btn.textContent = btnText;
                    alert(JSON.stringify(err));
                });
        });
})