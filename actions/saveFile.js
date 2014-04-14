var fs = require("fs");
var FIELD_NAME = "solution";
var WRITE_STREAM = "ws";
var FILE_NAME = "originalFilename";
var PATH = "path";
var SIZE = "size";
var SIZE_LIMIT = 6291456;
var INDEX_FIELD = "index";
var destPath = __dirname + "\\uploads\\"
var task =  function(request, callback){	
	var field = request.files[FIELD_NAME];
	var size = field[SIZE];
	var fileName = field[FILE_NAME];
	if(size <= 0 || fileName === ""){
		callback("no file to save");
		return;
	}
	if(size > SIZE_LIMIT) {
		callback(" unacceptable filesize > " + SIZE_LIMIT);
		return;
	}
	var uploadPath = field[WRITE_STREAM][PATH];
	var fileName = field[FILE_NAME];
	var index = request.body[INDEX_FIELD] ? request.body[INDEX_FIELD] + "_" : "_";
	var destinationFileName = destPath + index + fileName;
	var overwritten = fs.existsSync(destinationFileName);

	fs.readFile(uploadPath, function (err, data) {
  
	  	fs.writeFile(destinationFileName, data, function (err) {
	    	if(err) {
				callback(err);
				return;
			}	
			callback(null, fileName + " saved succesfully." + (overwritten ?  " Previous version was overwritten" : ""));
	  	});
	});


	
	//callback(null,"save path: "+ uploadPath + "dest: " + destPath + fileName);
	
	
	
}

exports.action = task