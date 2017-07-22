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
                                    $(modal.find('#manage-btn'))
                                        .removeClass('hidden');
                                    $(modal.find('#participate-btn'))
                                        .addClass('hidden');
                                    $(modal.find('#leave-btn'))
                                        .addClass('hidden');
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
                                        .addClass('hidden');
                                    $(modal.find('#leave-btn'))
                                        .removeClass('hidden');
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
