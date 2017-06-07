/**
 * Created by SRUJAN on 5/23/2017.
 */

$('form').on('submit', function (e) {
    e.preventDefault();
    var emailBox=$("#email");
    var passBox=$("#password");
    if (!emailBox.val() || !passBox.val()) {
        $(".validationText").text("Please Enter Value").show();
    }
    else if(!IsEmail(emailBox.val()))
    {
        emailBox.prev().text("Invalid E-mail").show();
    }
    $("input#email, input#password").focus(function(){
        $(this).prev(".validationText").hide();
    });});

