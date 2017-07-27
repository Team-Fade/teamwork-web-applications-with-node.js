/* globals $ */

$(() => {
    $('.leave-btn').click((ev) => {
        const eventId = $(ev.target)
            .parent()
            .parent()
            .parent()
            .attr('id');

        $.ajax({
            type: 'PUT',
            url: `/events/${eventId}/leave`,
            data: {
                eventId: eventId,
            },
            success: (data) => {

            },
        });
    });
});
