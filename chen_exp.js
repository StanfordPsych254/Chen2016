// ## High-level overview
// Things happen in this order:
// 

// ASSIGN VARIABLES

var feature_list = shuffle(["Aesthetic","Cherished Memories of Time Spent with Parents/Family","Degree of Shyness","Favorite Hobbies/Activities","Goals for Personal Life","Height","Important Childhood Memories","Intelligence Level","Knowledge of Math","Knowledge of Music","Level of Honesty","Level of Hunger","Level of Loyalty","Level of Wholesomeness","Memories of Important Life Milestones","Reliability"]); //for identity task 
var target_list = shuffle(["attncheck1","attncheck2","Aesthetic","Cherished Memories of Time Spent with Parents/Family","Degree of Shyness","Favorite Hobbies/Activities","Goals for Personal Life","Height","Important Childhood Memories","Intelligence Level","Knowledge of Math","Knowledge of Music","Level of Honesty","Level of Hunger","Level of Loyalty","Level of Wholesomeness","Memories of Important Life Milestones","Reliability"]); //for causal connections task
target_list.unshift("intro")

// HELPER FUNCTIONS

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Checks whether all ratings have a value (e.g., participants has provided ratings for all features)
function checkCompleted(phase) {
if (phase == "identity") {
    getRatings(); 

  for (i = 0; i < experiment.identitydata.length; i++) {

  if (experiment.identitydata[i] == null) {
    experiment.identitydata = [];
$("#noresponse_att").html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
break;
    }
   else {
    }
  }
}
}

// Save ratings in the identity disruption task
function getRatings() {

elementlist = ['feature1_rating', 'feature2_rating','feature3_rating','feature4_rating',
              'feature5_rating', 'feature6_rating', 'feature7_rating', 'feature8_rating',
              'feature9_rating', 'feature10_rating','feature11_rating','feature12_rating',
              'feature13_rating', 'feature14_rating', 'feature15_rating', 'feature16_rating']

for (e = 0; e < elementlist.length; e++) {
element = elementlist[e];
featrating = document.getElementById(element).value

experiment.identitydata.push(featrating);
}
}

//Save responses in the practice task
function getPracticeAnswers(ID) {
var radio = document.getElementById(ID);
for (i = 0; i < radio.length; i++) {
  if (radio[i].checked) {
    experiment.practicedata.push(radio[i].value);
  }
}
}

//Save responses in causal connections task
function getStrengthsAnswers(ID) {
ids_list = experiment.ids_causaldata;
answered=0;

for (i = 0; i < ids_list.length; i++) {
  var radio = document.getElementById(ids_list[i]);

  for (k = 0; k < radio.length; k++) {
  if (radio[k].checked) {
    experiment.causaldata_strengths.push(radio[k].value);
    answered = 1+answered;
  }
}
}

if (answered < ids_list.length) {
     $("#errorStrengths_att").html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
}
else {
experiment.next();

}

}

function updateTextInput(val,ID) {
   document.getElementById(ID).value=val;
   rating = document.getElementById(ID).value;
}

function remove(array, element) {
    return array.filter(e => e !== element);
}

function getCheckbox(ID1,ID2) {
  data = {};
  data[ID1] = document.getElementById(ID1).checked;
  experiment.practicedata.push(document.getElementById(ID1).checked);

  data[ID2] = document.getElementById(ID2).checked;
  experiment.practicedata.push(document.getElementById(ID2).checked);
}

// Shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Submitting Demographics Page
function submitDemographics(){
  data = $('#demographicsForm').serializeArray();  
  experiment.demographics.push(data);
  experiment.end();
}

// FUNCTIONS FOR INDIVIDUAL PAGES

// IDENTIDY DISRUPTION PAGE
function identityDisruption() {
showSlide("ID_self");
    $("#feature1").text(feature_list[0]);
    $("#feature2").text(feature_list[1]);
    $("#feature3").text(feature_list[2]);
    $("#feature4").text(feature_list[3]);
    $("#feature5").text(feature_list[4]);
    $("#feature6").text(feature_list[5]);
    $("#feature7").text(feature_list[6]);
    $("#feature8").text(feature_list[7]);
    $("#feature9").text(feature_list[8]);
    $("#feature10").text(feature_list[9]);
    $("#feature11").text(feature_list[10]);
    $("#feature12").text(feature_list[11]);
    $("#feature13").text(feature_list[12]);
    $("#feature14").text(feature_list[13]);
    $("#feature15").text(feature_list[14]);
    $("#feature16").text(feature_list[15]);
}

// IDENTIDY DISRUPTION PAGE 2
function identityDisruption_2() {
showSlide("ID_self_2");
    $("#feature1_2").text(feature_list[0]);
    $("#feature2_2").text(feature_list[1]);
    $("#feature3_2").text(feature_list[2]);
    $("#feature4_2").text(feature_list[3]);
    $("#feature5_2").text(feature_list[4]);
    $("#feature6_2").text(feature_list[5]);
    $("#feature7_2").text(feature_list[6]);
    $("#feature8_2").text(feature_list[7]);
    $("#feature9_2").text(feature_list[8]);
    $("#feature10_2").text(feature_list[9]);
    $("#feature11_2").text(feature_list[10]);
    $("#feature12_2").text(feature_list[11]);
    $("#feature13_2").text(feature_list[12]);
    $("#feature14_2").text(feature_list[13]);
    $("#feature15_2").text(feature_list[14]);
    $("#feature16_2").text(feature_list[15]);
}

// PRACTICE PAGES
function practice(pageNum) {
if (pageNum == "page1"){
  showSlide("causal_practice1");
}
if (pageNum == "page2"){
  showSlide("causal_practice2");
}
if (pageNum == "page3"){
  if ((data["Fatigue_feat"] == true) & (data["Fever_feat"] == true)) {
  showSlide("fatigue_yes_fever_yes")
  }
  if ((data["Fatigue_feat"] == false) | (data["Fever_feat"] == false)) {
  showSlide("fatigue_no_fever_no")
}
}
if (pageNum == "page4") {
  showSlide("causal_practice4")
}
if (pageNum == "page5") {
  if ((data["Fatigue_feat"] == true) & (data["Cold_feat"] == false)) {
  showSlide("fatigue_yes_cold_no")
  }
  if ((data["Fatigue_feat"] == false) | (data["Cold_feat"] == true)) {
  showSlide("fatigue_no_cold_yes")
}
}
}




function connections(feature) {
showSlide("connections_page");
$("#error_att").html('<font color="red">' + 
           '' + 
           '</font>');
caused_list = shuffle(["Aesthetic","Cherished Memories of Time Spent with Parents/Family","Degree of Shyness","Favorite Hobbies/Activities","Goals for Personal Life","Height","Important Childhood Memories","Intelligence Level","Knowledge of Math","Knowledge of Music","Level of Honesty","Level of Hunger","Level of Loyalty","Level of Wholesomeness","Memories of Important Life Milestones","Reliability"]);

targetfeat = feature;

for (k = 0; k < caused_list.length; k++) {
  if (caused_list[k] == targetfeat) {
    caused_list.splice(k,1)
  }
}

caused_list = shuffle(caused_list);

    $("#TargetFeature").text(targetfeat);
    $("#TargetFeature1").text(targetfeat);

    $("#feature2_c").text(caused_list[0]);
    $("#feature3_c").text(caused_list[1]);
    $("#feature4_c").text(caused_list[2]);
    $("#feature5_c").text(caused_list[3]);
    $("#feature6_c").text(caused_list[4]);
    $("#feature7_c").text(caused_list[5]);
    $("#feature8_c").text(caused_list[6]);
    $("#feature9_c").text(caused_list[7]);
    $("#feature10_c").text(caused_list[8]);
    $("#feature11_c").text(caused_list[9]);
    $("#feature12_c").text(caused_list[10]);
    $("#feature13_c").text(caused_list[11]);
    $("#feature14_c").text(caused_list[12]);
    $("#feature15_c").text(caused_list[13]);
    $("#feature16_c").text(caused_list[14]);
    $("#none").text("None of these features are caused by my " + targetfeat);
}

function attncheck() {
showSlide("attncheck_page");
} 


function getStrengths(feature) {
  if (experiment.tempcausaldata == 0) {
    experiment.next()
  } 

  else {
  var trialID = "causalRelations";
  var trialNum = 15 - experiment.order_causaltask.length;
  trialNumID = trialID.concat(trialNum);
  experiment.ids_causaldata = [];


  var newSlide = $('<div/>', {
      id: trialNumID,
      class: "slide",
  });

  function causalPara() {
  tempFeatures = experiment.tempcausaldata;

  var redHeaderDiv = $('<div/>', {
        id: 'redHeader',
        class: 'redHeader',
    });

  redHeaderDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; background-color: #8C1516; padding: 20px 15px 10px 10px"></div>');
  newSlide.append(redHeaderDiv);

  for (i = 0; i < tempFeatures.length; i++) {

    var featureStrengthsDiv = $('<div/>', {
        id: 'featureStrengths' + i,
        class: "featureStrengths",
    });

    a = i + trialNumID

    featureStrengthsDiv.html('<div style="width: 500px; margin: 0 auto; text-align: center; padding: 20px 15px 10px 10px"></div>\n' +
      '<p class="block-text">You reported that your <b><span id="TargetFeature'+a+
      '">{{}}</span></b> causes your <b><span id = "CauseFeature'+a+'">{{}}</span></b>. What is the strength of this causal relationship? </p>\n' +
      '<form align = "left" id="strengths'+a+'" action="" style="width: 500px; margin: 0 auto; text-align: left; padding: 20px 15px 10px 10px">' +
        '<input type="radio" name="strength_feat" id = "cold_fatigue'+i+'" value="1">1-weak<br>' +
        '<input type="radio" name="strength_feat" id = "cold_fatigue'+i+'" value="2">2-moderate<br>' +
        '<input type="radio" name="strength_feat" id = "cold_fatigue'+i+'" value="3">3-strong<br>' +
      '</form>');

      newSlide.append(featureStrengthsDiv);
      experiment.ids_causaldata.push("strengths"+a)
  } 

  var featureButtonDiv = $('<div/>', {
        id: 'button',
        class: 'button',
    });

  featureButtonDiv.html('<button type="button" onclick="this.blur(); getStrengthsAnswers(experiment.ids_causaldata);">Continue</button>');
  
  var errorMessDiv = $('<div/>', {
        id: 'errorMessage',
        class: 'errorMessage',
    });

  errorMessDiv.html('<div <tr><td align="center">\n' +
      '<div id="errorStrengths_att"> </div>\n' +
      '</td></tr>\n' +
      '<br><br>');

  newSlide.append(featureButtonDiv);
  newSlide.append(errorMessDiv);

  $("body").append(newSlide);
}

causalPara();
showSlide(trialNumID);

targetfeat = feature;
$("#TargetFeature0"+trialNumID).text(targetfeat);
$("#TargetFeature1"+trialNumID).text(targetfeat);
$("#TargetFeature2"+trialNumID).text(targetfeat);
$("#TargetFeature3"+trialNumID).text(targetfeat);
$("#TargetFeature4"+trialNumID).text(targetfeat);
$("#TargetFeature5"+trialNumID).text(targetfeat);
$("#TargetFeature6"+trialNumID).text(targetfeat);
$("#TargetFeature7"+trialNumID).text(targetfeat);
$("#TargetFeature8"+trialNumID).text(targetfeat);
$("#TargetFeature9"+trialNumID).text(targetfeat);
$("#TargetFeature10"+trialNumID).text(targetfeat);
$("#TargetFeature11"+trialNumID).text(targetfeat);
$("#TargetFeature12"+trialNumID).text(targetfeat);
$("#TargetFeature13"+trialNumID).text(targetfeat);
$("#TargetFeature14"+trialNumID).text(targetfeat);
$("#TargetFeature15"+trialNumID).text(targetfeat);

targetfeat0 = experiment.tempcausaldata[0];
targetfeat1 = experiment.tempcausaldata[1];
targetfeat2 = experiment.tempcausaldata[2];
targetfeat3 = experiment.tempcausaldata[3];
targetfeat4 = experiment.tempcausaldata[4];
targetfeat5 = experiment.tempcausaldata[5];
targetfeat6 = experiment.tempcausaldata[6];
targetfeat7 = experiment.tempcausaldata[7];
targetfeat8 = experiment.tempcausaldata[8];
targetfeat9 = experiment.tempcausaldata[9];
targetfeat10 = experiment.tempcausaldata[10];
targetfeat11 = experiment.tempcausaldata[11];
targetfeat12 = experiment.tempcausaldata[12];
targetfeat13 = experiment.tempcausaldata[13];
targetfeat14 = experiment.tempcausaldata[14];
targetfeat15 = experiment.tempcausaldata[15];

$("#CauseFeature0"+trialNumID).text(targetfeat0);
$("#CauseFeature1"+trialNumID).text(targetfeat1);
$("#CauseFeature2"+trialNumID).text(targetfeat2);
$("#CauseFeature3"+trialNumID).text(targetfeat3);
$("#CauseFeature4"+trialNumID).text(targetfeat4);
$("#CauseFeature5"+trialNumID).text(targetfeat5);
$("#CauseFeature6"+trialNumID).text(targetfeat6);
$("#CauseFeature7"+trialNumID).text(targetfeat7);
$("#CauseFeature8"+trialNumID).text(targetfeat8);
$("#CauseFeature9"+trialNumID).text(targetfeat9);
$("#CauseFeature10"+trialNumID).text(targetfeat10);
$("#CauseFeature11"+trialNumID).text(targetfeat11);
$("#CauseFeature12"+trialNumID).text(targetfeat12);
$("#CauseFeature13"+trialNumID).text(targetfeat13);
$("#CauseFeature14"+trialNumID).text(targetfeat14);
$("#CauseFeature15"+trialNumID).text(targetfeat15);
  }
}


//function for saving checked features in causal connections task
function saveChecked(ID) {
experiment.tempcausaldata = [];

var radio = document.getElementById(ID);
var none = 0;

if (ID == "caused_boxes") {
for (i = 0; i < radio.length; i++) {
  if (radio[i].checked) {
    if (i == 15) {
      experiment.causaldata.push("none");
      experiment.causaldata_strengths.push("0");
      experiment.causaltargets.push(experiment.temptarget[0])
      radio[i].checked = false; //turn off checked checkboxes
      none = 1;
      experiment.next();
    } 

    else {
    checkedFeature = caused_list[i];
    experiment.causaldata.push(checkedFeature);
    experiment.tempcausaldata.push(checkedFeature);
    experiment.causaltargets.push(experiment.temptarget[0])
    radio[i].checked = false; //turn off checked checkboxes
  }
}
}

if (experiment.tempcausaldata.length == 0 & experiment.temptarget != "attncheck1" & experiment.temptarget != "attncheck2" & none != 1) {
$("#error_att").html('<font color="red">' + 
           'Please make a response!' + 
           '</font>');
}

none = 0;

if (experiment.tempcausaldata.length > 0 & ID != "caused_boxes_attn") {
getStrengths(targetfeat);
}
}

if (ID == "caused_boxes_attn") {
  var fail = 0;
for (i = 0; i < radio.length; i++) {
  if (radio[i].checked) {
    experiment.causaldata.push("fail");
    experiment.causaldata_strengths.push("NA");
    experiment.causaltargets.push("attention_check")
    fail = 1;
    radio[i].checked = false;
  }
}

if (fail == 0) {
    experiment.causaldata.push("pass");
    experiment.causaldata_strengths.push("NA");
    experiment.causaltargets.push("attention_check")
}

experiment.next();
}
}

function startexp() {
order = experiment.phase_order[0];
phase = experiment.phase_order_temp.length;

if (order == "ChangeFirst" & phase == 2) {
  identityDisruption()
}

else if (order == "ChangeFirst" & phase == 1) {
  practice("page1");
}

else if (order == "MapFirst" & phase == 2) {
  practice("page1")
}

else if (order == "MapFirst" & phase == 1) {
  identityDisruption_2();
}

else if (phase == 0) {
showSlide("demographics");
}

experiment.phase_order_temp.shift();
}

showSlide("instructions");

var experiment = {
  // Parameters for this sequence.
  order_identitytask: feature_list,
  order_causaltask: target_list,
  //trials: myTrialOrder,
 // mySlideList:slideList,
  // Experiment-specific parameters - which keys map to odd/even
 // keyBindings: myKeyBindings,
  // An array to store the data that we're collecting.
  identitydata: [],
  practicedata: [],
  causaldata: [], 
  causaltargets: [],
  tempcausaldata: [],
  temptarget: [],
  causaldata_strengths: [],
  ids_causaldata: [],
  demographics: [],
  // The function that gets called when the sequence is finished.
  phase_order: shuffle(["ChangeFirst","MapFirst"]), //order of phases, remember to add shuffle
  phase_order_temp: ["phase1","phase2"],
  //ChangeFirst = Identity Disruption task, Causal Connections task
  //MapFirst = Causal Connections task, Identity Disruption task 

next: function() {
if (experiment.order_causaltask.length == 0) {
  startexp();
return;
}

showSlide("demographics");


if (experiment.order_causaltask.length == 19) {
showSlide("connections_intro");
experiment.order_causaltask.shift();
return;
}

var n = experiment.order_causaltask.shift();

if (n == "attncheck1" | n == "attncheck2") {
experiment.temptarget.push(n)
attncheck();
}

else {
experiment.temptarget = [],
experiment.temptarget.push(n)
connections(n);
}
},

  end: function() {
    // Show the finish slide.
    showSlide("finished");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    // setTimeout(function() { turk.submit(experiment) }, 1500);
    turk.submit(experiment)
  },
}
