// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require_tree .

$(function() {
    var textInputs = $('input').not('[type=radio]');

    // var find_regex = {
    //     "name": /[A-Z][a-z]+ [A-Z][a-z]/,
    //     "email": "chance@gmail.com",
    //     "zip-code": "11111",
    //     "color": "red",
    //     "username": "moo",
    //     "website": "google.com",
    //     "cc": "123456789",
    //     "phone": "10",
    //     "birth-month": /[r|R]/,
    //     "birth-year": "88",
    //     "movie": "Apollo 13",
    //     "type": "BAMF"
    // }

    textInputs.focusout(function(e) {
        var value = $(this).val();
        var input_id = $(this).attr('id');

        var reString = $(this).data('regex');
        var re = new RegExp(reString);

        var match = re.test(value);

        if (match) {
            $(this).closest('.form-group').removeClass('has-error');
        }
        else {
            $(this).closest('.form-group').addClass('has-error');
        }
    }).keypress(function (e) {
        $(this).closest('.form-group').removeClass('has-error');
    });

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
                        $('wrap').prepend('<div class="alert alert-success">Success!</div>');
                        $('form')[0].reset();
                    }
                }
            );
        }
    });
});
