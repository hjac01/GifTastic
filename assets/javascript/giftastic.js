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
    gifDiv.addClass("gif")
    var rating = results[i].rating
    var p = $("<p>")
    p.append("rating: " + rating)
    var gif = $("<img>")
    gif.attr("src", results[i].images.original.url)
    gifDiv.append(gif)
    gifDiv.append(p)
    $("#gifs-here").prepend(gifDiv)
    }
});
});