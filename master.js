document.addEventListener('DOMContentLoaded', function() {
    function includeHTML() {
        const includeElements = document.querySelectorAll('[include-html]');
        includeElements.forEach(element => {
            const file = element.getAttribute('include-html');
            if (file) {
                fetch(file)
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        element.innerHTML = data;
                        element.removeAttribute('include-html');
                        includeHTML(); // Recursive call to handle nested includes
                    })
                    .catch(error => {
                        element.innerHTML = "Page not found.";
                        console.error('There was a problem with the fetch operation:', error);
                    });
            }
        });
    }

    includeHTML();
});



