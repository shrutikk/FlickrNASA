function loadData(){
		
	
	var getInfoReq = new XMLHttpRequest();
	var infoUrl = "https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1";

	getInfoReq.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var total_photos = response.person.photos.count._content;
			var num_tabs = Math.ceil(total_photos/102);
			
			var ul = document.createElement('ul');
			ul.setAttribute("class","pagination pageUl");
			var div = document.createElement('div');

			for(var i=0;i<num_tabs;i++){
					
				var li = document.createElement('li');
				var link = document.createElement('a');
				link.href = '#';
				link.setAttribute("onclick","loadPage("+i+"+1)");
				link.appendChild(document.createTextNode(i+1));
				li.appendChild(link);
				ul.appendChild(li);
			}
			document.getElementById('pagination').appendChild(ul);
			
		}
	}
	getInfoReq.open('GET', infoUrl, true);
	getInfoReq.send();

	loadPage(1);
	
			
}
function loadPage(pg_no){

	console.log(pg_no);	
	var getPicsReq = new XMLHttpRequest();
	var url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&page="+pg_no+"&per_page=102&format=json&nojsoncallback=1";

	getPicsReq.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var imageData = JSON.parse(this.responseText);		
			var imgObjs = [];
			var photos = imageData.photos.photo;
			var div = document.createElement('div');
			div.setAttribute("class","imgDiv");
			var row_div;
			for(key in photos){
				if(key % 6 == 0){
					row_div = document.createElement('div');		
					row_div.setAttribute("class","row");
				}
				var photo = photos[key];
				var urlDefault = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
				var urlLarge = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
				var col = document.createElement('div');
				col.setAttribute("class","col-lg-2 col-md-4 col-sm-6");
				var img = document.createElement('img');
				img.src = urlDefault;
				img.setAttribute("class","myImg img-thumbnail");
				col.appendChild(img);
				var desc = document.createElement('p');
				desc.appendChild(document.createTextNode(photo.title))
				col.appendChild(desc);
				row_div.appendChild(col);
				div.appendChild(row_div);
			}	
			document.getElementById('images').innerHTML = ' ';
			document.getElementById('images').appendChild(div);

		}
	};

	getPicsReq.open("GET", url, true);
	getPicsReq.send();
	
}

