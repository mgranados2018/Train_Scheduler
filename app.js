console.log("this is connected")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARt9PA2GW9whO1TlcvXOT7WxtJnYWOrG4",
    authDomain: "trainscheduler-hw7-5a92f.firebaseapp.com",
    databaseURL: "https://trainscheduler-hw7-5a92f.firebaseio.com",
    projectId: "trainscheduler-hw7-5a92f",
    storageBucket: "trainscheduler-hw7-5a92f.appspot.com",
    messagingSenderId: "748953562071"
};


firebase.initializeApp(config);

console.log("config loads");

var database = firebase.database();

// capture button click

$("#add-train").on("click", function (event) {
    event.preventDefault();


    // initial values

    // setting values for database

    console.log("button loads");
    var trainname = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var traintime = moment($("#traintime").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency").val().trim();
    // var tMinutesaway = 

    // Creates local "temporary" object for holding train data
    var newtrain = {

        name: trainname,
        trdestination: destination,
        trtime: traintime,
        freq: frequency
    };

    console.log("newtrain object" + newtrain);
    // Uploads employee data to the database
    database.ref().push(newtrain);

    // make sure everything works

    console.log("train name" + newtrain.name);
    console.log("train destination" + newtrain.trdestination);
    console.log("train time" + newtrain.trtime);
    console.log("train frequency" + newtrain.freq);

    alert("Train added successfully");

    //   clear all text boxes

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#traintime").val("");
    $("#frequency").val("");
});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // var sv = childSnapshot.val();

    var TRname = childSnapshot.val().name;
    var TRdestination = childSnapshot.val().trdestination;
    var TRtime = childSnapshot.val().trtime;
    var TRfreq = childSnapshot.val().freq;


    console.log(TRname);
    console.log(TRdestination);
    console.log(TRtime);
    console.log(TRfreq);

    // change the format of the time 


    // Need next arrival time. This is minutes added from frequency to 


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(TRtime, "HH:mm").subtract(1, "years");
    console.log("train input time converted"+firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % TRfreq;
    console.log("tremainder"+tRemainder);

    // Minute Until Train
    var tMinutesaway = TRfreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesaway);
    var tMinutesawaypretty = tMinutesaway;

    // Next Train
    var nextarrival = moment().add(tMinutesaway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextarrival).format("hh:mm"));
    var nextarrivalpretty = moment(nextarrival).format("hh:mm A");



    // add new rows: 

    var newrow = $("<tr>").append(
        $("<td>").text(TRname),
        $("<td>").text(TRdestination),
        $("<td>").text(TRfreq),
        $("<td>").text(nextarrivalpretty),
        $("<td>").text(tMinutesawaypretty),
    );


    $("#train-table > tbody").append(newrow);


    // }, function (errorObject) {
    //     console.log("Errors handled:" + errorObject.code)
});


