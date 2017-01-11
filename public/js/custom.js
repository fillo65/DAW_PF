$(document).ready(function () {
    $("#navbar li a").each(function () {
        if ($(this).attr("href") == window.location.pathname) {
            $(this).css({background: "#eee", color: "#676971"});
        }
    });
});