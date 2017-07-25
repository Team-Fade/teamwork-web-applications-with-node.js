/* globals $ */

$(() => {
    fetch('/api/events', {
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
            if (data.errorMessage === 'Not authenticated user') {
                $('.modal').modal({
                    inDuration: 300,
                    outDuration: 200,
                    ready: (modal, trigger) => {
                        $(modal.find('.progress')).fadeOut(500, () => {
                            $(modal.find('.btn-container'))
                                .removeClass('hidden')
                                .fadeIn(600);
                        });
                    },
                });
            }

            data.events.forEach((event) => {
                $(`#${event._id}`).modal({
                    inDuration: 300,
                    outDuration: 200,
                    ready: (modal, trigger) => {
                        if (event.author === data.user.username) {
                            $(modal.find('#manage-btn'))
                                .removeClass('hidden');
                            $(modal.find('#participate-btn'))
                                .addClass('hidden');
                            $(modal.find('#leave-btn'))
                                .addClass('hidden');
                        }
                        if (event.participants && event.participants
                            .indexOf(data.user.username) > -1) {
                            $(modal.find('#participate-btn'))
                                .addClass('hidden');
                            $(modal.find('#leave-btn'))
                                .removeClass('hidden');
                        }

                        $(modal.find('.progress')).fadeOut(500, () => {
                            $(modal.find('.btn-container'))
                                .removeClass('hidden')
                                .fadeIn(600);
                        });
                    },
                });
            });
        });
});
