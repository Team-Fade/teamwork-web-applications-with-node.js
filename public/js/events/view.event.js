/* globals $ */

$(() => {
    fetch('/api/user-events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data.errorMessage) {
                const joinedEvents = data.joinedEvents;
                const createdEvents = data.createdEvents;

                $('.modal').modal({
                    inDuration: 300,
                    outDuration: 200,
                    ready: (modal, trigger) => {
                        const eventName = modal.find('h4').text();

                        if (createdEvents) {
                            createdEvents.forEach((event) => {
                                if (event.eventName === eventName) {
                                    $(modal.find('#participate-btn'))
                                        .prop('disabled', true);

                                    return;
                                }
                            });
                        }

                        if (joinedEvents) {
                            joinedEvents.forEach((event) => {
                                if (event.eventName === eventName) {
                                    $(modal.find('#manage-btn'))
                                        .prop('disabled', true);
                                    $(modal.find('#participate-btn'))
                                        .text('Leave');

                                    return;
                                }
                            });
                        }

                        $(modal.find('.progress')).fadeOut(500, () => {
                            $(modal.find('.btn-container'))
                                .removeClass('hidden')
                                .fadeIn(600);
                        });
                    },
                });
            }
        });
});
