let pi = 3.141592654;
let radius = 100;

let WIDTH = 600;
let HEIGHT = 400;

//list to store the circle's centers
puncture_list = []
//variable to store the overlapped value
overlapped = null
clicked = null

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent("sketch-container");
  draw_interface();
  
}

function draw() {
  update_interface();
  //just a small test
  if ((40 < mouseY && mouseY < 360) && (mouseIsPressed == true)){
    ellipse(mouseX, mouseY,15,15);
  };
  for (i = 0; i < puncture_list.length ; i++){
    fill("red")
    stroke("red")
    ellipse(WIDTH/2+puncture_list[i][0]*HEIGHT, HEIGHT/2+puncture_list[i][1]*HEIGHT, 8, 8)
    if (overlapped == i){
      fill("#B31F1E")
      stroke("#B31F1E")
      ellipse(WIDTH/2+puncture_list[i][0]*HEIGHT, HEIGHT/2+puncture_list[i][1]*HEIGHT, 8, 8)
    }
    if (clicked == i){
      fill("#B31F1E")
      stroke("#B31F1E")
      ellipse(WIDTH/2+puncture_list[i][0]*HEIGHT, HEIGHT/2+puncture_list[i][1]*HEIGHT, 12, 12)
    }
  }
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
  PunctureButton.mousePressed(addPuncture)

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

function mouseMoved(){
  counter = 0; 
  is_clicked = false;
  for (i = 0; i < puncture_list.length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+puncture_list[i][0]*HEIGHT, HEIGHT/2+puncture_list[i][1]*HEIGHT) < 0.009*HEIGHT){
      overlapped = i;
      if (mouseIsPressed == true){
        clicked = i;
        is_clicked = true;
      }
    }
    else{
      counter += 1
    }  
  if (counter == puncture_list.length){
      overlapped = null;
  }
  if (is_clicked == false){
      clicked = null;
  }
  }
  //if (clicked != null){
    //puncture_list[clicked][0] = (movedX - WIDTH/2)/(HEIGHT);
    //puncture_list[clicked][1] = (movedY - HEIGHT/2)/(HEIGHT);
  //}
}

function mousePressed(){
  is_clicked = false;
  for (i = 0; i < puncture_list.length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+puncture_list[i][0]*HEIGHT, HEIGHT/2+puncture_list[i][1]*HEIGHT) < 0.009*HEIGHT){
      clicked = i;
      is_clicked = true;
    }
  if (is_clicked == false){
      clicked = null;
    }
  }
}

function mouseReleased(){
  clicked = null;
}

function addPuncture(){
  puncture_list.push([0, 0])
}

function mouseDragged(){
  if (clicked != null){
    print(WIDTH/2)
    print(HEIGHT)
    print((mouseX - WIDTH/2)/(HEIGHT))
    if (40 < mouseY && mouseY < 360){
      puncture_list[clicked][0] = (mouseX - WIDTH/2)/(HEIGHT)
      puncture_list[clicked][1] = (mouseY - HEIGHT/2)/(HEIGHT)
    }
  }
}