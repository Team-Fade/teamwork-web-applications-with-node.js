/* globals $ Materialize*/

$(() => {
    $('.leave-btn').click((ev) => {
        $.ajax({
            type: 'POST',
            url: '/event/leave-event',
            data: {
                eventName: $(ev.target)
                    .parent()
                    .parent()
                    .prev()
                    .find('h4')
                    .text(),
            },
            success: (data) => {
            },
        });
    });
});
