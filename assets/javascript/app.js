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

// Adding function to submit button

$('#addTrain').on('click', function () {
    var trainData = {
        name: $('.train-name').val().trim(),
        destination: $('.destination').val().trim(),
        time: $('.time').val().trim(),

        frequency: $('.frequency').val().trim(),
    }

    var formatTime = moment(trainData.time, "hh:mm a");
    console.log(trainData.name);
    console.log(trainData.destination);
    console.log(formatTime._i);
    console.log(trainData.frequency);



    // Push data to firebase
    var newTrain = $('<tr>').append(
        $("<td>").text(trainData.name),
        $("<td>").text(trainData.destination),
        $("<td>").text(formatTime._i),
        $("<td>").text(formatTime._i + trainData.frequency),
        $("<td>").text(trainData.frequency),
    );

    $('tbody').append(newTrain);






    // Clear input out of form
});