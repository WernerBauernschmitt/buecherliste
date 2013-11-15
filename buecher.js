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
					$("#buchvorschau").append("<li>"+buchZuHtml(book)+"</li>");
				});
				$("#buchvorschau").listview("refresh");
				$.mobile.loading("hide");
			},
			error: function(data) {
				$.mobile.loading("hide");
				$("#buchvorschau").html("<li>Daten konnten nicht geladen werden.</li>");
			}
		});
	});
	
	function buchZuHtml(buch){
		$("#buchvorlage .titel").html(buch.volumeInfo.title);
		
		if (buch.volumeInfo.authors != undefined) {
			$("#buchvorlage .autoren").html(buch.volumeInfo.authors.join(", "));
		} else {
			$("#buchvorlage .autoren").html("Autor unbekannt");
		}
		
		$("#buchvorlage .beschreibung").html(buch.volumeInfo.description);
		$("#buchvorlage .bild").attr("src", buch.volumeInfo.imageLinks.smallThumbnail);
		return $("#buchvorlage").html();
	}
});