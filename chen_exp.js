// I'm implementing the experiment using a data structure that I call a **sequence**. The insight behind sequences is that many experiments consist of a sequence of largely homogeneous trials that vary based on a parameter. For instance, in this example experiment, a lot stays the same from trial to trial - we always have to present some number, the subject always has to make a response, and we always want to record that response. Of course, the trials do differ - we're displaying a different number every time. The idea behind the sequence is to separate what stays the same from what differs - to **separate code from data**. This results in **parametric code**, which is much easier to maintain - it's simple to add, remove, or change conditions, do randomization, and do testing.

// ## High-level overview
// Things happen in this order:
// 
// 1. Compute randomization parameters (which keys to press for even/odd and trial order), fill in the template <code>{{}}</code> slots that indicate which keys to press for even/odd, and show the instructions slide.
// 2. Set up the experiment sequence object.
// 3. When the subject clicks the start button, it calls <code>experiment.next()</code>
// 4. <code>experiment.next()</code> checks if there are any trials left to do. If there aren't, it calls <code>experiment.end()</code>, which shows the finish slide, waits for 1.5 seconds, and then uses mmturkey to submit to Turk.
// 5. If there are more trials left, <code>experiment.next()</code> shows the next trial, records the current time for computing reaction time, and sets up a listener for a key press.
// 6. The key press listener, when it detects either a P or a Q, constructs a data object, which includes the presented stimulus number, RT (current time - start time), and whether or not the subject was correct. This entire object gets pushed into the <code>experiment.data</code> array. Then we show a blank screen and wait 500 milliseconds before calling <code>experiment.next()</code> again.

  // ASSIGN VARIABLES

// var order = shuffle(["CausalFirst","ChangeFirst"])

var order = ["ChangeFirst","ChangeFirst"];


//for identity task 
var feature_list = shuffle(["Aesthetic","Cherished Memories of Time Spent with Parents/Family","Degree of Shyness","Favorite Hobbies/Activities","Goals for Personal Life","Height","Important Childhood Memories","Intelligence Level","Knowledge of Math","Knowledge of Music","Level of Honesty","Level of Hunger","Level of Loyalty","Level of Wholesomeness","Memories of Important Life Milestones","Reliability"]);

//for causal connections task
var target_list = shuffle(feature_list)

// ## Helper functions

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get a random integer less than n.
function randomInteger(n) {
	return Math.floor(Math.random()*n);
}

function listFeatures() {
     for (i = 1; i < feature_list.length; i++) 
     	document.text(feature_list[i]);
 }

function identityDisruption() {
//experiment.data.push(cond)
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

function practice(pageNum) {
//  experiment.data.push(data);
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

function getPracticeAnswers(ID) {
var radio = document.getElementById(ID);
for (i = 0; i < radio.length; i++) {
  if (radio[i].checked) {
    experiment.practicedata.push(radio[i].value);
  }
}
}

function updateTextInput(val,ID) {
   document.getElementById(ID).value=val;
   rating = document.getElementById(ID).value;
   // experiment.identitydata.push(rating);
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

function connections(feature) {
showSlide("connections_page");

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
}

function getStrengths() {
var div = document.createElement("div");

function causalPara() {
//for each 

div.innerHTML =     
'<div class="slide" id="featureStrengths">\n' +
'<div style="width: 500px; margin: 0 auto; text-align: center; background-color: #8C1516; padding: 20px 15px 10px 10px"></div>\n' +
'<p class="block-text">You reported that your <code id="MainFeature">{{}}</code> causes your <code id = "CauseFeature">{{}}</code>. What is the strength of this causal relationship? </p>\n' +
'<form align = "left" id="strength_cold_fatigue2" action="" style="width: 500px; margin: 0 auto; text-align: left; padding: 20px 15px 10px 10px">' +
  '<input type="radio" name="strength_feat" id = "cold_fatigue" value="1">1-weak<br>' +
  '<input type="radio" name="strength_feat" id = "cold_fatigue" value="2">2-moderate<br>' +
  '<input type="radio" name="strength_feat" id = "cold_fatigue" value="3">3-strong<br>' +
'</form></div>'; 
document.body.appendChild(div);
}

causalPara()
showSlide('featureStrengths');

targetfeat = "hi";
$("#MainFeature").text(targetfeat);

}

// function getStrengths() {
// var div = document.createElement("div");

// div.innerHTML =     
// '<div class="slide" id="featureStrengths">\n' +
// '<div style="width: 500px; margin: 0 auto; text-align: center; background-color: #8C1516; padding: 20px 15px 10px 10px"></div>\n' +
// '<p class="block-text">You reported that your</div>'

// var feature = document.createTextNode("hi");
// div.appendChild(feature);


// // <code id="MainFeature">{{}}</code> causes your <code id = "CauseFeature">{{}}</code>. What is the strength of this causal relationship? </p>\n' +
// // '<form align = "left" id="strength_cold_fatigue2" action="" style="width: 500px; margin: 0 auto; text-align: left; padding: 20px 15px 10px 10px">' +
// //   '<input type="radio" name="strength_feat" id = "cold_fatigue" value="1">1-weak<br>' +
// //   '<input type="radio" name="strength_feat" id = "cold_fatigue" value="2">2-moderate<br>' +
// //   '<input type="radio" name="strength_feat" id = "cold_fatigue" value="3">3-strong<br>' +
// // '</form></div>'; 

// // var feat = document.createTextNode("hi");

// // targetfeat = "hi";
// // $("#MainFeature").text(targetfeat);

// document.body.appendChild(div);
// showSlide('featureStrengths');
// }

//function for saving checked features in causal connections task
function saveChecked(ID) {
var radio = document.getElementById(ID);
for (i = 0; i < radio.length; i++) {
  if (radio[i].checked) {
    checkedFeature = caused_list[i];
    experiment.causaldata.push(checkedFeature);
    radio[i].checked = false; //turn off checked checkboxes
  }
}
}

var response_logged = null;

function submitDemographics(){
	data = $('#demographicsForm').serializeArray();  
	experiment.data.push(data);
	experiment.end();
}

// Get a random element from an array (e.g., <code>random_element([4,8,7])</code> could return 4, 8, or 7). This is useful for condition randomization.
function randomElement(array) {
  return array[randomInteger(array.length)];
}

function startexp(phase) {

if (order[0] == "ChangeFirst" & phase == 1) {
  identityDisruption();
}

if (order[0] == "CausalFirst" & phase == 1) {
  practice("page1");
}

if (order[0] == "ChangeFirst" & phase == 2) {
  practice("page1");
}

if (order[0] == "CausalFirst" & phase == 2) {
  identityDisruption();
}

}

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


showSlide("instructions");

var experiment = {
  // Parameters for this sequence.
  exp_order: order,
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
  // The function that gets called when the sequence is finished.

  next: function() {
if (experiment.order_causaltask.length == 0) {
experiment.end();
return;
}

var n = experiment.order_causaltask.shift();
connections(n);
},

  end: function() {
    // Show the finish slide.
    showSlide("finished");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    setTimeout(function() { turk.submit(experiment) }, 1500);
  },
  // The work horse of the sequence - what to do on every trial.
}


// ## The main event
// I implement the sequence as an object with properties and methods. The benefit of encapsulating everything in an object is that it's conceptually coherent (i.e. the <code>data</code> variable belongs to this particular sequence and not any other) and allows you to **compose** sequences to build more complicated experiments. For instance, if you wanted an experiment with, say, a survey, a reaction time test, and a memory test presented in a number of different orders, you could easily do so by creating three separate sequences and dynamically setting the <code>end()</code> function for each sequence so that it points to the next. **More practically, you should stick everything in an object and submit that whole object so that you don't lose data (e.g. randomization parameters, what condition the subject is in, etc). Don't worry about the fact that some of the object properties are functions -- mmturkey (the Turk submission library) will strip these out.**
