
var compare = 'sand fire';
var eventType = 'Fire';

compare = compare.toLowerCase();
eventType = eventType.toLowerCase();

$.getJSON("https://spreadsheets.google.com/feeds/list/1Omn9eF5upJ48fO8yhcatGBGHCqtNwvEw-bdaSMplsiI/od6/public/values?alt=json", function(jsonObj){
	populateTab(jsonObj);
	populateUpdate(jsonObj);
});
/*
class Incident{
	constructor(eventName, update, type){
		this.eventName = eventName;
		this.update =[];
		this.type = type;
	}
}
*/

var section = document.querySelector('section');
/*
var arr = new Incident();
var arrCounter = 0;
*/
function populateUpdate(jsonObj){
		var updateField = document.createElement('article');
		
	/*
		for (var n = jsonObj['feed']['entry'].length -1; n >= 0; n--){
			var current = titleCase(jsonObj.feed.entry[n].gsx$incident.$t);
			var previous;
			if(previous != current){
				//todo: check if an incident exsists
				//for 
				arr[arrCounter] = new Incident()
				arr[arrCounter].eventName = current;
				var count = arr[arrCounter].update.length;
				arr[arrCounter].update[count] = jsonObj.feed.entry[n].gsx$update.$t;
				console.log(arr[arrCounter]);
				arrCounter++;
			}
			else{
				var count = arr[arrCounter].update.length;
				arr[arrCounter].update[count] = jsonObj.feed.entry[n].gsx$update.$t;
				console.log(arr[arrCounter]);
				arrCounter++;
			}
			arr[arrCounter]=current;
			previous = current;
			*/
			/*
			$("div#tabs").append("<div id='tab" + jsonObj.feed.entry[n].gsx$update.$t + "'>#" + jsonObj['feed']['entry'][n]['gsx$update']['$t'] + "</div>");
			$("div#tabs").tabs("refresh");
			*/
			
	for (var n = jsonObj['feed']['entry'].length -1; n >= 0; n--){
	
			
			
			var tempCompare = jsonObj['feed']['entry']['0']['gsx$incident']['$t'].toLowerCase();
			var tempEvent = jsonObj['feed']['entry']['0']['gsx$typeofevent']['$t'].toLowerCase();
			if (compare != tempCompare || eventType != tempEvent){}
			else{
			
				var updateName = document.createElement('p');
				
				var updateText = jsonObj['feed']['entry'][n]['gsx$update']['$t'];
				var updateDate = jsonObj['feed']['entry'][n]['gsx$date']['$t'];
				var updateTime = jsonObj['feed']['entry'][n]['gsx$timestamp']['$t'];
				
				updateName.textContent = updateDate + "    " + updateTime + "    " + updateText;
				updateField.appendChild(updateName);
			}
	  }
	 
	  pushUpdate(updateField);
}

function pushUpdate(update){
	$('#tabs-1').html(update);
}

var tabTitle=document.getElementById("tab_1Title");

function populateTab(jsonObj){
	tabTitle.textContent = jsonObj['feed']['entry']['0']['gsx$incident']['$t'];		
}

var previous = null;
var current = null;

setInterval(function() {
$.getJSON("https://spreadsheets.google.com/feeds/list/1Omn9eF5upJ48fO8yhcatGBGHCqtNwvEw-bdaSMplsiI/od6/public/values?alt=json", function(json) {
current = JSON.stringify(json);            
if (previous && current && previous !== current) {
	populateUpdate(json);
 }
  previous = current;
        });                       
    }, 10000);      
	
$( function() {
    $( "#tabs" ).tabs();
  } );


function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}