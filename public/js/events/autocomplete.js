/* globals $ */

$(() => {
    fetch('/api/filter-events', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data.errorMessage) {
                $('#eventName').autocomplete({
                    data: data.eventNames.reduce((obj, v) => {
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
                    data: data.eventLocations.reduce((obj, v) => {
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
                    data: data.eventTypes.reduce((obj, v) => {
                        obj[v] = null;
                        return obj;
                    }, {}),
                    limit: 20,
                    onAutocomplete: (val) => {
                        // Callback function when value is autcompleted.
                    },
                    minLength: 1,
                });
            }
        });
});
