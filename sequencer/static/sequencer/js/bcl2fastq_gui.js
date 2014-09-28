
var Bcl2FastqGUI = Object.extend(Object, 
	{		
		createGUI : function (parent_element, baseMap)
		{
			parent_element.append('<h2>Point to Raw Sequencer Data</h2>');
			
			$s_raw_data = $('<select multiple>',
				{ 
					id: "s_raw_data", 
				}
			);
				
			parent_element.append($s_raw_data);
			
			
			parent_element.append('<br>');
			
			parent_element.append('<h2>Choose CSV</h2>');
				
			
			$i_sample_sheet_csv = $('<input>',
				{ 
					type:"file",
					id: "i_sample_sheet_csv", 
				}
			);
				
			parent_element.append($i_sample_sheet_csv);
			
			parent_element.append('<br>');


			var bcl2FastqGUI = this;
			
			$b_submit = $('<input>',
				{ 
					type:"button",
					id: "b_to_bcl",
					value: "Transform to BCL",
					click: function(){bcl2FastqGUI.sendFormData(baseMap);},
				}
			);
			
			parent_element.append($b_submit);
		},
		
		populateGUI : function (bcl2Fastq)
		{
			//console.log('JSON.stringify(bcl2Fastq.map): ');
			//console.log(JSON.stringify(bcl2Fastq.map));
			
			//console.log(bcl2Fastq);
			
			//console.log(Object.keys(bcl2Fastq.map));
			
			var d = Object.keys(bcl2Fastq.map);
			
			for (var i=0; i<d.length; i++)
			{
				$s_raw_data.append($('<option>', 
					{
						value: d[i],
						text: d[i],
						click: function()
						{	
							$('#right').empty();
												
							for(var processed in bcl2Fastq.map[this.value])
							{
								$('#right').append(processed + '<br>');
							}
						},
					}
				)
				);
			}	
		},
		
		sendFormData : function(baseMap)
		{
			//console.log('postForm()');
	
			// $progress_msg.empty();
			// $progress_msg.append('<p>' + 'Uploading' + '</p>');
			
			var filename;
			var ext;
			
			try
			{
				$input_file = $("#i_sample_sheet_csv");
				filename = $input_file.val();
				console.log('filename: ', filename);		
				ext = filename.substr(filename.lastIndexOf('.') + 1);
			}
			catch(err) 
			{
				console.log(err);
			    alert('Please choose a .csv file');
		    	return;
			}
		    
		    console.log(ext);
		    
		    if(ext == 'csv')
		    {
		    	
		    }
		    else
		    {
		    	alert('this form only accepts files of the type .csv');
		    	return;
		    }	
			
			var files = $input_file[0].files;
			var formData = new FormData();
			
			for (var i = 0; i < files.length; i++) 
			{
			  var file = files[i];
			  //console.log('file.type: ', file.type);
			  // Check the file type.
			  // if (!file.type.match('image.*')) {
			    // continue;
			  // }
			
			  // Add the file to the request.
			  formData.append('input_file', file, file.name);
			}
			
			
		// 		
			// is_liquid = $cb_is_liquid.is(":checked");
			var personal_name = $('#t_name').val();
		// 	
			//console.log('is_liquid: ', is_liquid);
			console.log('personal_name: ', personal_name);
		// 	
			// formData.append('is_liquid', is_liquid);
			formData.append('personal_name', personal_name);
			
			var raw_dir_name = $('#s_raw_data option:selected').val();
			
			
			// console.log("formData");
			// console.log(formData);
			
			baseMap.submitFormData(formData);
		},
		
	}
).implement(BaseGUI);

