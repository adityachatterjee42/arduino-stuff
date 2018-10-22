var five = require("johnny-five");
var board, potentiometer, brightness;

board = new five.Board();

//this function maps potentiometer input to an appropriate range for LED PWM output
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

board.on("ready", function() {
  this.pinMode(9, five.Pin.PWM);
  potentiometer = new five.Sensor({ // Create a new `potentiometer` hardware instance
    pin: "A3",
    freq: 250
  });
  // Inject the `sensor` hardware into the Repl instance's context; allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });
  // "data" get the current reading from the potentiometer and perform an analogWrite to pin 9 with appropriate brightness
  potentiometer.on("data", function() {
    brightness = scale(this.value, 0, 1023, 0, 255);
    console.log(this.value, brightness);
    board.analogWrite(9, brightness);
  });
});
