

prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZLkREGZjf/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model is loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is"+ prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();

        if(results[0].label == "thumbs up")
        {
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "Thumbs up for your exam";
        }
        if(results[0].label == "thumbs down")
        {
            document.getElementById("result_emoji").innerHTML = "&#128078";
            document.getElementById("quote").innerHTML = "We applied for a loan , but the bank gave us the thumbs down ";
        }
        if(results[0].label == "amazing")
        {
            document.getElementById("result_emoji").innerHTML = "&#128076";
            document.getElementById("quote").innerHTML = "This is looking Amazing";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("result_emoji").innerHTML = "&#9996";
            document.getElementById("quote").innerHTML = "That was a Marvelous victory";
        }

    }
}