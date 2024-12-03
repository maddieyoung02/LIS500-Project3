// Teachable Machine
// Maddie Young

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = "https://teachablemachine.withgoogle.com/models/32_WXU-yT/";

// Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  const canvas = createCanvas(640, 480); // Match video dimensions
  canvas.parent("sketch-holder"); // Attach canvas to placeholder
  // Create the video capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start classifying
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);
  // Display the label
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(label, width / 2, height - 10);

  // Display emoji
  let emoji = "👀";
  if (label === "elephant") emoji = "🐘";
  else if (label === "duck") emoji = "🐥";
  else if (label === "butterfly") emoji = "🦋";

  textSize(64);
  text(emoji, width / 2, height / 2);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
