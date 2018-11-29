// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcp_3ZmKvVM59PVRB5TEgGFO_LkeupGFQ",
    authDomain: "train-scheduler-47385.firebaseapp.com",
    databaseURL: "https://train-scheduler-47385.firebaseio.com",
    projectId: "train-scheduler-47385",
    storageBucket: "train-scheduler-47385.appspot.com",
    messagingSenderId: "1054192817395"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

var trainData = {
    name: "",
    destination: "",
    time: "",
    frequency: 0
};
var formatTime;

// Adding function to submit button

$('#addTrain').on('click', function () {

    trainData.name = $('.train-name').val().trim();
    trainData.destination = $('.destination').val().trim();
    trainData.time = $('.time').val().trim();
    trainData.frequency = $('.frequency').val().trim();


    formatTime = moment(trainData.time, "hh:mm a");

    dataRef.ref().push(trainData);

    // Clear input out of form
    $('.train-name, .destination, .time, .frequency').val("");

});

dataRef.ref().on('child_added', function (snapshot) {

    // Grab snapshot and store it into object
    var newTrainData = snapshot.val();

    // Minutes away
    var minsAway = (newTrainData.frequency - (formatTime % newTrainData.frequency));

    // Push data to firebase
    var newTrain = $('<tr>').append(
        // Train name
        $("<td>").text(newTrainData.name),
        // Destination
        $("<td>").text(newTrainData.destination),
        //Frequency
        $("<td>").text(newTrainData.frequency),
        // Next arrival (current time + minutes away
        $("<td>").text(moment().add(minsAway, "minutes").format("HH:mm")),
        // Minutes Away
        $("<td>").text(minsAway, "minutes")
    );

    $('tbody').append(newTrain);
});