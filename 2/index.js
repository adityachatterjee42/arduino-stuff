var five = require("johnny-five");
var board, button, piezo;

board = new five.Board();

board.on("ready", function() {
  button = new five.Button(2);
  piezo = new five.Piezo(3);

  button.on("hold", function() {
    console.log('button held...');
    piezo.play({
      song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
      beats: 1 / 4,
      tempo: 100
    });
  })
});
