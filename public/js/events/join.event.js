/* globals $ Materialize*/

$(() => {
    $('.participate-btn').click((ev) => {
        $.ajax({
            type: 'POST',
            url: '/event/join-event',
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

        Materialize.toast('You have joined successfully the event', 3000);
    });
});
