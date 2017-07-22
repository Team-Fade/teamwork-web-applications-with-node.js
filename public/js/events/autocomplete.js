/* globals $ */

$(() => {
    fetch('/api/browse-events', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((events) => {
            $('#eventName').autocomplete({
                data: events.eventNames.reduce((obj, v) => {
                    obj[v] = null;
                    return obj;
                }, {}),
                limit: 20,
                onAutocomplete: (val) => {
                    // Callback function when value is autcompleted.
                },
                minLength: 1,
            });

            $('#eventLocation').autocomplete({
                data: events.eventLocations.reduce((obj, v) => {
                    obj[v] = null;
                    return obj;
                }, {}),
                limit: 20,
                onAutocomplete: (val) => {
                    // Callback function when value is autcompleted.
                },
                minLength: 1,
            });

            $('#eventType').autocomplete({
                data: events.eventTypes.reduce((obj, v) => {
                    obj[v] = null;
                    return obj;
                }, {}),
                limit: 20,
                onAutocomplete: (val) => {
                    // Callback function when value is autcompleted.
                },
                minLength: 1,
            });
        });
});
