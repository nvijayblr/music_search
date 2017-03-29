'use strict';
medVision.controller('searchCtrl', ['$scope', 'BaseServices', '$timeout', function(_scope, _services, _timeout){
	
	_scope.searchText = '';
	_scope.tempSearchText = '';
	_scope.offset = 0;
	_scope.limit = 4;
	_scope.artists = [];
	_scope.albums = [];
	_scope.showArtistLoadMore = true;
	_scope.showAlbumModel = false;
	_scope.showModel = 'albums';
	_scope.type = "artist,album";
	_scope.init = function(_searchText) {
		_scope.tempSearchText = _searchText;
		_services.http.serve({
			method: 'GET',
			url: 'https://api.spotify.com/v1/search?q='+_searchText+'&type='+_scope.type+'&offset='+_scope.offset+'&limit='+_scope.limit
		}, function(data){
			_scope.ladedResult = true;
			_scope.artists = _scope.artists.concat(data.artists.items);
			_scope.albums = _scope.albums.concat(data.albums.items);
			_scope.searchText = '';
			if((data.artists.next == 'null' || data.artists.next == null) && (data.albums.next == 'null' || data.albums.next == null)) {
				_scope.showArtistLoadMore = false;
			}
		});
	}
	//_scope.init('Vijay');
	
	_scope.doSearch = function(_searchText) {
		_scope.offset = 0;
		_scope.showArtistLoadMore = true;
		_scope.ladedResult = false;
		_scope.artists = [];
		_scope.albums = [];
		_scope.init(_searchText);
	}
	
	_scope.artist = {};
	_scope.viewArtistAlbums = function(_artist) {
		_scope.artistAlbums = {};
		_scope.showModel = 'albums';
		_scope.showAlbumModel = true;
		_scope.artist = _artist;
		_services.http.serve({
			method: 'GET',
			url: 'https://api.spotify.com/v1/artists/'+_artist.id+'/albums?limit=4'
		}, function(data){
			_scope.artistAlbums = data.items;
		});
	}
	
	_scope.track = {};
	_scope.viewAlbumsTracks = function(_track) {
		_scope.showModel = 'tracks';
		_scope.track = _track;
		_scope.albumTracks = {};
		_scope.showAlbumModel = true;
		_services.http.serve({
			method: 'GET',
			url: 'https://api.spotify.com/v1/albums/'+_track.id+'/tracks?limit=4'
		}, function(data){
			_scope.albumTracks = data.items;
		});
	}
	
	_scope.loadMore = function() {
		_scope.offset = _scope.offset + _scope.limit;
		_scope.init(_scope.tempSearchText);
	}
	
	_scope.closeAlbumModel = function() {
		_scope.showAlbumModel = false;
	}
	
}]);

