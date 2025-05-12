let pi = 3.141592654;
let radius = 100;

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent("sketch-container");
  draw_interface();
  
}

function draw() {
  update_interface();
  //just a small test
  if (40 < mouseY && mouseY < 360){
    ellipse(mouseX, mouseY,15,15);
  };
  side = SideEntry.value();
  point_around_circle(side);
}

function point_around_circle(n) {
  if (n <= 20) {
    for (i=0 ; i < n; i++){
      stroke(20);
      line(300 + radius*Math.cos((i-1)*(2*pi)/n), 200 + radius*Math.sin((i-1)*(2*pi)/n), 300 + radius*Math.cos(i*(2*pi)/n), 200 + radius*Math.sin(i*(2*pi)/n));
  }
    for (i=0 ; i < n; i++){
      fill("red")
      stroke("red")
      ellipse(300 + radius*Math.cos(i*(2*pi)/n), 200 + radius*Math.sin(i*(2*pi)/n), 8, 8);
  }
}
}

function draw_interface() {
  background(180);
  fill(220);
  rect(0, 0, 600, 30);
  fill(250);
  rect(0, 370, 600, 30);
  
  fill(20);
  textFont('Arial');
  textStyle(BOLD);
  text("Triangulation Software", 230, 20);
  textStyle(NORMAL);
  fill(280);
  stroke(200);
  
  ellipse(300, 200, radius*2, radius*2);
  stroke(220);
  fill(20);
  
  text("Sides: ", 10, 388)
  SideEntry = createInput("", "text");
  SideEntry.parent("sketch-container");
  //SideEntry.position(50, 375);
  SideEntry.position(50, -30, "relative");
  SideEntry.size(50,15);

  text("Add puncture: ", 130, 388)
  PunctureButton = createButton("+");
  PunctureButton.parent("sketch-container");
  //PunctureButton.position(213, 375);
  PunctureButton.position(170, -30, "relative");
  PunctureButton.size(25,20);

  text("Add component: ", 260, 388)
  ComponentButton = createButton("+");
  ComponentButton.parent("sketch-container");
  //ComponentButton.position(355, 375);
  ComponentButton.position(290, -30, "relative");
  ComponentButton.size(25,20);
  
  DoneButton = createButton("Done");
  DoneButton.parent("sketch-container");
  //DoneButton.position(500, 375);
  DoneButton.position(350, -30, "relative");
  DoneButton.size(50,20);
  
  OneButton = createButton("1");
  OneButton.parent("sketch-container");
  //OneButton.position(565, 375);
  OneButton.position(400, -30, "relative");
  OneButton.size(25,20);

}

function update_interface(){
  stroke(20);
  fill(280);
  rect(0, 30, 600, 340);
  fill(280);
  stroke(200);
  ellipse(300, 200, radius*2, radius*2);
}
