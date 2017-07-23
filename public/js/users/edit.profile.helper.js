/* globals $ Materialize*/

$(() => {
    $('.material-icons').click((ev) => {
        ev.preventDefault();
        $(ev.target)
            .parent()
            .find('input')
            .removeAttr('disabled');
    });
});
