 /* globals $ */

$(function() {
    $('#join-link').on('click', (ev) => {
        ev.preventDefault();

        const eventName = $('h4').text();
        const eventData = {};
        eventData.name = eventName;

        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        $.ajax({
            type: 'POST',
            data: JSON.stringify(eventData),
            contentType: 'application/json',
            url: `/browse-events/${id}`,
            success: (data) => {
                return JSON.stringify(data);
            },
        });
    });
});
