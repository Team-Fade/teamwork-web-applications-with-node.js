/* globals $ */

$(() => {
    $('.disband-btn').click((ev) => {
        const eventId = $(ev.target)
            .parent()
            .parent()
            .parent()
            .attr('id');

            console.log(eventId);

        $.ajax({
            type: 'DELETE',
            url: `/events/${eventId}/delete`,
            data: {
                eventId: eventId,
            },
            success: (data) => {

            },
        });
    });
});
