/* globals $ Materialize*/

$(() => {
    $('.participate-btn').click((ev) => {
        const eventId = $(ev.target)
            .parent()
            .parent()
            .parent()
            .attr('id');

        $.ajax({
            type: 'PUT',
            url: `/events/${eventId}/join`,
            data: {
                eventId: eventId,
            },
            success: (data) => {

            },
        });
    });
});
