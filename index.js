document.querySelector('.button-container').addEventListener('mousedown', function (event) {
    // Check if the clicked element is a button
    if (event.target.tagName === 'BUTTON') {
        // Check if the clicked button has the 'operation-dot' class
        if (event.target.classList.contains('operation-dot')) {
            // Add a class to change the background color to white immediately on mousedown
            event.target.classList.add('clicked-operation-instant');
            // Add a class to change the text color to orange immediately on mousedown
            event.target.classList.add('clicked-text-instant');
        } else {
            // Add the 'clicked' class to other buttons on mousedown
            event.target.classList.add('clicked');
        }
    }
});

document.querySelector('.button-container').addEventListener('mouseup', function (event) {
    // Check if the released element is a button
    if (event.target.tagName === 'BUTTON') {
        // Remove the 'clicked' and 'clicked-operation' classes from all buttons on mouseup
        event.target.classList.remove('clicked', 'clicked-operation-instant', 'clicked-text-instant');
    }
});
