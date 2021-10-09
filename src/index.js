const request = require('request');
const fs = require('fs');
const options = {
	method: 'POST',
	url:
		'https://api.file.glass/upload?access_key=b03e82017f9d7eb32305eff063d0354bfe8e69df92d461d5c536e8add18fc60d',
	headers: {
		sender: 'fileglass wrapper',
	},
	formData: {
		file: {
			value: fs.createReadStream('/C:/Users/camyw/Pictures/Png.png'),
			options: {
				filename: '/C:/Users/camyw/Pictures/Png.png',
				contentType: null,
			},
		},
	},
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});
