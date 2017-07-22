/* globals $ */

$(() => {
    $('.participate-btn').click((ev) => {
        $.ajax({
            type: 'POST',
            url: '/api/join-event',
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
