
function Bcl2Fastq(callback)
{
	this.base = BaseMap;
	this.base(callback);
	
	this.map_url = "/sequencer/raw_seq_data/";
	this.submit_url = "/sequencer/bcl2fastq/";
	this.followup_url = "/sequencer/bcl2fastq_followup/";
	this.interval = 1000;
	this.tries = 5;
}

Bcl2Fastq.prototype = new BaseMap(this.callback);


Bcl2Fastq.prototype.base_log = function()
{
	//console.log("callback: ", this.callback, " map: ", this.map);
	
	
};

