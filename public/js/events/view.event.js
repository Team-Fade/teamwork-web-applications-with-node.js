/* globals $ */

$(() => {
    fetch('/api/user-events', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const user = data.username;
            const joinedEvents = data.joinedEvents;
            const createdEvents = data.createdEvents;

            console.log(data);
            console.log(user);
            console.log(joinedEvents);
            console.log(createdEvents);

            $('.modal').modal({
                ready: (modal, trigger) => {
                    const eventName = modal.find('h4').text();
                },
            });
        });
});
