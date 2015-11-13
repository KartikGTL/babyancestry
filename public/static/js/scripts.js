'use strict';

// Action Plan
$(document).ready(function () {
    $("#boy-names").click(function () {
        console.log("CLICKED!");
        $('.filter .btn#boy-names').addClass('active');
        $('.filter .btn#girl-names').removeClass('active');
        $('.filter .btn#all-names').removeClass('active');
        $('#ancestors .Male').show();
        $('#ancestors .Female').hide();

        $('.footer_btn .U').show();
        $('.footer_btn .A').hide();
    });

    $("#girl-names").click(function () {
        $('.filter .btn#girl-names').addClass('active');
        $('.filter .btn#boy-names').removeClass('active');
        $('.filter .btn#all-names').removeClass('active');
        $('#ancestors .Male').hide();
        $('#ancestors .Female').show();

        $('.footer_btn .U').hide();
        $('.footer_btn .A').show();
    });

    $("#all-names").click(function () {
        $('.filter .btn#all-names').addClass('active');
        $('.filter .btn#boy-names').removeClass('active');
        $('.filter .btn#girl-names').removeClass('active');
        $('#ancestors .Male').show();
        $('#ancestors .Female').show();

        $('.footer_btn .U').show();
        $('.footer_btn .A').show();
    });
});
