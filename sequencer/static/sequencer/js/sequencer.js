
var csrftoken;

$(document).ready(function()
{
	csrftoken = getCookie('csrftoken');
	//console.log("csrftoken: ", csrftoken);	
	
	$div_raw_form = $('#div_raw_form');
	
	var starter = new Starter();
	starter.start($div_raw_form, Bcl2FastqGUI, Bcl2Fastq);
});







