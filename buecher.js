$(document).ready(function() {
	$("#suchbutton").click(function() {
		$.mobile.loading("show", {
			text: "Suchergebnisse werden abgerufen...",
			textVisible: true
		});
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q="+$("#suchbegriff").val(),
			dataType: "json",
			success: function(data) {
			$("#buchvorschau").html("");
				$.each(data.items, function(index, book){
					$("#buchvorschau").append("<p>"+book.volumeInfo.title+"</p>");
					$.mobile.loading("hide");
				});
			},
			error: function(data) {
				$.mobile.loading("hide");
				$("#buchvorschau").html("Daten konnten nicht geladen werden.");
			}
		});
	});
f});