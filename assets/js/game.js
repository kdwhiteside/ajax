$(document).ready(function(){
	var animalCount = 1


		animalArray = ["dog", "cat", "bird", "wolf", "tiger", "eagle"];
		
		for (var i = 0; i < animalArray.length; i++) {
			animal = animalArray[i];
			createButton();
		}
	

	function createButton(){
		var button = $("<button/>").addClass("btn btn-primary animalbuttons").attr("id", "animal" + animalCount).val(animal).html(animal);
		$("#animalbuttons").append(button);
		animalCount++;
	}
		
	$("#AddAnimal").click(function(){
		animal = $("#animal-input").val();
		console.log(animal);
		animalArray.push(animal);
		$("#animal-input").val("");
		createButton();
		return false;
	});

	$(document.body).on('click', '.animalbuttons', function(){

		$("#animals").empty();
		animal = $(this).val();
		maxGifs = 10
		for (var i = 0; i < maxGifs; i++) {
			

			var queryURL = "https://api.giphy.com/v1/gifs/translate?s=" + animal + "&api_key=dc6zaTOxFJmzC";
				$.ajax({url: queryURL, method: 'GET'})
					.done(function(response) {
					    var animalDiv = $("<div/>").addClass("animalDiv");
						var span = $("<p>").html("Rating: " + response.data.rating);
						span.appendTo(animalDiv);
						var animalGif = $("<img/>").addClass("gifs").attr("src", response.data.images.fixed_height_still.url).attr("data-still", response.data.images.fixed_height_still.url).attr("data-animate", response.data.images.fixed_height.url).attr("data-state", "still");
						animalGif.appendTo(animalDiv);
						animalDiv.appendTo(animals);

				}); 
		}
	});

	$(document.body).on("click", ".gifs", function(){
		if ( $(this).attr("data-state") == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	});

});