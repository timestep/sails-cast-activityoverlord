var request = require('request');

describe("Test Swuite", function(){
	it("should respond with hello world", function(done) {
	  request("http://localhost:1337/hello", function(error, response, body){
	    expect(body).toContain("hello world");
	    done();
	  });
	});
});

