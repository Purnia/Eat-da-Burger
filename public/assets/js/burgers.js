$(function () {

    //function for when user adds a new burger
    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#inputBurger").val().trim(),

        };
        //send post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //function for when user devours a burger
    $(".devour-btn").on("click", function (event) {
        var id = $(this).data("id");
        var burgDevoured = { id: id };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgDevoured
        }).then(
            function () {
                location.reload();
            }
        );
    });

});