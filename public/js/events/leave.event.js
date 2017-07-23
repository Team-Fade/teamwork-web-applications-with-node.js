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
                localStorage
                    .setItem('leave-event', data);
            },
        });

        Materialize.toast('You have left successfully the event', 3000);
    });
});
