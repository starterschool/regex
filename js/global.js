$(function() {
    var textInputs = $('input').not('[type=radio]');

    $('form').submit(function(e) {
        var formValid = true;
        e.preventDefault();
        textInputs.each(function (i) {
            var userInput = $(this).val();
            if (userInput === '') {
                $(this).closest('.form-group').addClass('has-error');
                formValid = false;
            }
        });

        if (formValid) {
            // Grab all the form data and turn it into a JSON object.
            var formData = $(this).serializeArray();
            $('.alert').remove();
            $.post(
                'http://tsljs.herokuapp.com/elvis',
                formData,
                function(response) {
                    // The response from the serve looks like JSON, but is a string. We need to use this function to turn it from a string into JSON.
                    responseAsJSON = $.parseJSON(response);
                    if (responseAsJSON['status'] == 1) {
                        $('h1').after('<div class="alert alert-success">Success!</div>');
                        $('form')[0].reset();
                    }
                }
            );
        }
    });

    textInputs.focusout(function(e) {
        var userInput = $(this).val();
        // var userMatch = new RegExp(_________);
        // var match = ___________;
        if (match) {
            $(this).closest('.form-group').addClass('has-error');
        } else {
            $(this).closest('.form-group').removeClass('has-error');
        }
    }).keypress(function (e) {
        $(this).closest('.form-group').removeClass('has-error');
    });
});
