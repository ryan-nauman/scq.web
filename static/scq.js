var tid = window.location.search.match(/\?([\w\d]*)/);
tid = (tid != null && tid.length) ? tid[1] : '';
var loadedOnce = false,
	art_uri = 'https://embed.spotify.com/oembed/?url=spotify:track:' + tid + '&callback=?',
	info_uri = 'http://ws.spotify.com/lookup/1/.json?uri=spotify:track:' + tid,
	q_uri = 'spotify:app:q:track:' + tid,
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	fade = isMobile ? 0 : 600;
//var art_uri = '/oembed/' + tid;

$(function(){
  $('#q').attr('href', q_uri);

  if (tid.length) {
	  $.getJSON(info_uri, function(data){
	  	if (data && data.track.name) {
	  		var text = (data.track.artists.length) ? data.track.artists[0].name + ' - ' + data.track.name : data.track.name;
	  		$('#track-info').text(text);
	  	}
	  }).fail(function(){
	  	$('#track-info').text('Unable to load track info');
	  });
	  $.getJSON(art_uri, function(data) {
	  	if (data && data.thumbnail_url) {
  			if (!isMobile) {
  				var img = $('<img src="' + data.thumbnail_url + '" style="display:none" />');
  				img.appendTo('#site-bg').fadeIn(fade);
  			}
  			$('#track-art').attr('src', data.thumbnail_url).addClass('img-thumbnail');
	  	}
	  }).always(doneLoading).fail(function(){
	  	$('#track-art-wrapper').remove();
	  	$('<img src="skull.png" style="display:none" />').appendTo('#site-bg').fadeIn(fade);
	  });
  } else {
  	$('#loading-wrapper .indicator').animate({opacity:0});
  }

});

function doneLoading() {
	if (!loadedOnce) {
		loadedOnce = true;
		$('#loading-wrapper').fadeOut(fade, function(){
			$('#loaded-content').fadeIn(fade);
		});
	}
}