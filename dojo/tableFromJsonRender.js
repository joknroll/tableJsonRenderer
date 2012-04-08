/*
 * TableFromJsonRender , with dojo 1.4.1
 * 
 * Generate table HTML with date from json.
 * 
 * >>Example:
 * >>>>>>>>> Input format:
 *  
 *  {
 *  	"htmlHeader": 	
 *  					[
 *  						{"general":{
 *  									"value":"Global Datas",
 *  									"colspan":"3",
 *  									"rowspan":"1",
 *  									"id":"",
 *  									"className":""
 *  									}
 *  						}
 *  				  	],
 *  	
 *  	"items" : 		[
 *  						{	
 *  							"col1":{
 *  									"value":"value11",
 *  									"colspan":"1",
 *  									"rowspan":"2",
 *  									"id":"",
 *  									"className":""
 *  									},
 *  							"col2":"value12",
 *  							"col3":"value13" 
 *  						},
 *  						{	
 *  							"col1":"value21",
 *  							"col2":"value22",
 *  							"col3":"value23" 
 *  						}
 *  					]
 *  }
 * 
 * >>>>>>>>> Result:
 * 
 *  ------------------------
 * |     Global Datas      |
 * -------------------------
 * |value11|value12|value13|
 * -        ----------------
 * |       |value22|value23|
 * -------------------------
 * 
 * ---------------------------------------
 * >>>>>>>>> Usage in html page <<<<<<<<<<
 * 
 * <table id="fromJson"></table>
 * <script>
 * 			var get = dojo.xhrGet({ 
				handleAs: "json", 
				url: "path/file.json", // Input format of the example
				content: {
					param: "myParamForFile.json",					
				}
			});
			var xhrGetResponse = get.addCallback(function(data){
				var tableO = new tableObj(data, "fromJson");
				tableO.init();
			    return data;
			});
 * <script>
 * 
 * 
 * 
 * 
 */



function tableObj(jsondata, tableId) {
	this.tableId = tableId;
	this.items = jsondata.items;
	this.header = jsondata.htmlHeader;

	this.showHeader = function(){
		var tableElt = dojo.byId(this.tableId);
		var idThead = "idThead"+this.tableId;
		dojo.create("thead" , {id:idThead}, tableElt);
		dojo.forEach(this.header, function (entry, i){	
			var idRow = "throw"+i;
			dojo.create("tr" , {id:idRow}, idThead);
			for (var keyHeader in entry) {
				var thisRow = dojo.byId(idRow);
				var thisTh = dojo.create("th",{ 
						innerHTML : entry[keyHeader].value,
						id : entry[keyHeader].id,
						className : entry[keyHeader].className,
						colSpan : entry[keyHeader].colspan,
						rowSpan : entry[keyHeader].rowspan},
					thisRow);
				console.log(entry[keyHeader].colspan);
			}
		});		
	};
	
	this.showItems = function () { 
		var tableElt = dojo.byId(this.tableId);
		var idTbody = "idTbody"+this.tableId;
		dojo.create("tbody" , {id:idTbody}, tableElt);
		dojo.forEach(this.items, function (entry, i){
	        var idRow = "row"+i;
	        dojo.create("tr" , {id:idRow}, idTbody);
	        for (var key in entry) {
	            var thisRow = dojo.byId(idRow);
	            var caption = entry[key];
	            if(typeof caption == "object"){
	            	caption = entry[key].value;
	            	dojo.create("td",{innerHTML : caption,
	            		id : entry[key].id,
	            		className : entry[key].className,
	            		colSpan : entry[key].colspan,
	            		rowSpan : entry[key].rowspan}, 
	            	thisRow);
	            }else{
	            	dojo.create("td",{innerHTML : caption}, 
	            	thisRow);	            	
	            }
	        }
	    });
  	};
  	
  	this.clearHtml = function(){
  		var tableElt = dojo.byId(this.tableId);
  		dojo.html.set(tableElt, "");
  		console.log("TABLE Inner HTML: "+tableElt.innerHTML);
  	};
  	
  	this.init = function(){
  		this.clearHtml();
  		this.showHeader();
  		this.showItems();
  	};
}