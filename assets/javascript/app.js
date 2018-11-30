/* *************************************************************************************
Initialize firebase
************************************************************************************** */
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
var currentTime = moment();

/* *************************************************************************************
Add a click handler to add a new train schedule for firebase
************************************************************************************** */

$('#addTrain').on('click', function () {

    // Attach new input handlers to local variables
    var trainName = $('.train-name').val().trim();
    var trainDestination = $('.destination').val().trim();
    var firstTrain = $('.first-train').val().trim();
    var trainFrequency = $('.frequency').val().trim();

    // format time using moment
    var formattedTime = moment(firstTrain, "hh:mm").subtract("1, years");
    var timeDifference = currentTime.diff(moment(formattedTime), "minutes");
    var remainder = timeDifference % trainFrequency;
    var minsUntilNextTrain = trainFrequency - remainder;
    var nextTrainArrival = moment().add(minsUntilNextTrain, "minutes").format("hh:mm a");




    var trainData = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrain,
        frequency: trainFrequency,
        minutesAway: minsUntilNextTrain,
        nextTrain: nextTrainArrival
    };

    // Push train data to firebase
    dataRef.ref().push(trainData);

    // Clear input out of form using jquery multiple class selectors with empty string for val function
    $('.train-name, .destination, .first-train, .frequency').val("");

    // If we return true, the click function will complete
    return false;
});

/* *************************************************************************************
On page load, 'child_added' will run ONE time first to get data, then listen for any push updates
-- dataRef.ref().on('child_added', function (dataFromFirebase) {})
-- dataFromFirebase.val() is the data from firebase, you can use whatever word you want,
just make they word matches to use val()
************************************************************************************** */


dataRef.ref().on('child_added', function (snapshot) {

    // Grab snapshot and store it into object
    var newTrainData = snapshot.val();

    // Push data to firebase
    var newTrain = $('<tr>').append(
        // Train name
        $("<td>").text(newTrainData.name),
        // Destination
        $("<td>").text(newTrainData.destination),
        // How often train runs
        $("<td>").text(newTrainData.frequency),
        // Next train arrival
        $("<td>").text(newTrainData.nextTrain),
        // Mins awasy
        $("<td>").text(newTrainData.minutesAway)

        // How many minutes away
    );

    $('tbody').append(newTrain);
});
