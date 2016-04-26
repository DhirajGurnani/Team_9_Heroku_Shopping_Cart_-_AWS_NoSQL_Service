var http = require ('http');
var nano = require('nano')('http://localhost:5984/');

var books=nano.db.use('books');
books.insert(
		  { "views": 
		    { "by_category": 
		      { 
		    	"map": function(doc) {
		    		if(doc.book_category)
		    	  {
		    			emit(doc.book_category, doc);
		    	  }
		    	  } 
		      } 
		    }
		  },'_design/getByCategory');




/*


books.list(function(err, body) {
	  if (!err) {
	    body.rows.forEach(function(doc) {
	    	  books.get(doc.key, function(err,body)
	    	    		{
	    	    			if(err)
	    	    				{
	    	    				console.log('[test.get] ', err.message);
	    	    		        return;
	    	    				}
	    	    			console.log("Record returned");
	    	    			console.log(body);
	    	    		});
	    });
	  }
	  else{
		  console.log("Not found");
	  }
	});*/
exports.select_category = function(req,res)
{
	
	var bookCategory=req.param('bookCategory');
	var books=nano.db.use('books');
	books.view('getByCategory', 'by_category',{'key': bookCategory, 'include_docs': true}, function(err, body){
		  console.log("inside");  
		  if(!err){
		    	console.log("inside1");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		for(var i=0;i<rows.length;i++){
		    			console.log(rows[i].doc);
		    		}
		    		res.send({"rows":rows,"status_code":200});
		        }
		    	
		    }
		    else
		    	{
		    	console.log("Error "+err);
		    	}
		});
	
};

exports.search_book = function(req,res)
{
	console.log("inside search book");
	
};