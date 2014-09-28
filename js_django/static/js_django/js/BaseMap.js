
function BaseMap(callback)
{
	this.callback = callback;
	this.map;
	this.map_url;
	this.submit_url;
	this.followup_url;
	this.interval;
	this.tries;
}

BaseMap.prototype.getMapURL = function()
{
	if(this.map_url == undefined)
	{
		throw new Error('The inheriting class must define this.map_url!!!');
	}
	else
	{
		return this.map_url;
	}
};


BaseMap.prototype.getSubmitURL = function()
{
	if(this.submit_url == undefined)
	{
		throw new Error('The inheriting class must define this.map_url!!!');
	}
	else
	{
		return this.submit_url;
	}
};


BaseMap.prototype.getFollowupUrl = function()
{
	if(this.followup_url == undefined)
	{
		throw new Error('The inheriting class must define followup_url!!!');
	}
	else
	{
		return this.followup_url;
	}
};


BaseMap.prototype.getFollowupInterval = function()
{
	if(this.interval == undefined)
	{
		throw new Error('The inheriting class must define followup_delay!!!');
	}
	else
	{
		return this.interval;
	}
};

BaseMap.prototype.getFollowupTries = function()
{
	if(this.tries == undefined)
	{
		throw new Error('The inheriting class must define followup_tries!!!');
	}
	else
	{
		return this.tries;
	}
};


BaseMap.prototype.getMap = function(json_query)
{
	//console.log('this.getMapURL(): ', this.getMapURL());
	if(json_query === undefined)
	{
		json_query = {'default_query':'why does a chicken?'};
	}
	
	var baseMap = this;
	
	$.ajax({
	    url: this.getMapURL(),
	    type: 'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(json_query),
	    dataType: 'json',
	    
	    beforeSend: function(xhr) {
			//console.log('xhr', xhr);
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		},
	    success: function(json) 
		{
			  //console.log('response rom ', url, ':');
			  //console.log(JSON.stringify(json));	 
			  baseMap.map = json;
			  baseMap.callback(baseMap);
		},
	});	
};


BaseMap.prototype.submitFormData = function (formData)
{
	//console.log('formData');
	//console.log(formData);
	
	//console.log(this.getSubmitURL());
	
	var baseMap = this;
	
	var xhr = new XMLHttpRequest();
	xhr.onload = function()
		{
			var j = JSON.parse(this.responseText);
			j['counter'] = 0;
			
			baseMap.followup(j);
		};
	xhr.open('POST', this.getSubmitURL(), true);
	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	//console.log(xhr);
	
	xhr.send(formData);
};


BaseMap.prototype.followup = function(j)
{	
	console.log('JSON.stringify(j): ', JSON.stringify(j));
	var message = j['message'];
	console.log("message: ", message);
	
	//console.log('getFollowupUrl(): ', this.getFollowupUrl());
	
	var baseMap = this;
	
	$.ajax({
	    url: this.getFollowupUrl(),
	    type: 'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(j),
	    dataType: 'json',
	    
	    beforeSend: function(xhr) 
	    {
			//console.log('xhr', xhr);
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		},
	    success: function(json) 
		{
		  	//console.log(JSON.stringify(json));
		  	
		  	var counter = json['counter'];
		  	
		  	console.log('counter: ', counter);
		  	
		  	
		  	if( counter > baseMap.getFollowupTries())
		  	{
		  		console.log('to many followups');
		  	}
		  	else
		  	{
		  		json['counter'] = counter + 1;
		  		baseMap.followup_delay(json);
		  	}
		},
	});	
};


BaseMap.prototype.followup_delay = function(query)
{
	var baseMap = this;
	
	console.log('settimeout: ', setTimeout
	(	
		function(){baseMap.followup(query);},
		baseMap.getFollowupInterval()
	));
};


