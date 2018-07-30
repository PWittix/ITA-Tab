
var compare = 'sand fire';
var eventType = 'Fire';

compare = compare.toLowerCase();
eventType = eventType.toLowerCase();

$.getJSON("https://spreadsheets.google.com/feeds/list/1Omn9eF5upJ48fO8yhcatGBGHCqtNwvEw-bdaSMplsiI/od6/public/values?alt=json", function(jsonObj){
	populateTab(jsonObj);
	populateUpdate(jsonObj);
});


var section = document.querySelector('section');

function populateUpdate(jsonObj){
		var updateField = document.createElement('article');
		
	
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
