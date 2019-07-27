var animals =["dog", "cat", "bird"]
function createbuttons() {
    for(var i = 0; i <animals.length; i++) {
        var button = $("<button>")
        button.attr("data-animal", animals[i])
        button.text(animals[i])
        $("#buttons-here").append(button)
    }
}
createbuttons()
$("#submitanimal").on("click", function (){
    console.log("clicked")
    var query = $("#animalrequest").val()
    console.log(query)
    animals.push(query)
    console.log(animals)
    $("#buttons-here").empty()
    createbuttons()
}) 
$(document).on("click", "button", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=WHv6n3SpE9o5X6Ccv5Xx7KN2yp1ubIOz&limit=10";

$.ajax({
    url: queryURL,
    method:"GET"
})

.then(function(response) {
    var results = response.data;
    console.log(results)
    for(var i = 0; i <results.length; i++) {
    var gifDiv = $("<div>")
    var rating = results[i].rating
    var p = $("<p>")
    p.append("rating: " + rating)
    var gif = $("<img>")
    gif.attr("data-animate", results[i].images.original.url)
    .attr("data-still", results[i].images.original_still.url)
    .attr("src", results[i].images.original_still.url)
    .attr("data-state", "still")
    .addClass("gif")
    gifDiv.append(gif)
    gifDiv.append(p)
    $("#gifs-here").prepend(gifDiv)

    }
});

});

// click event here
$("#gifs-here").on("click", ".gif",function() {
    console.log("click works")
    var state = $(this).attr("data-state");
    console.log (state)
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

})