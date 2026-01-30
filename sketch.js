//const geometry = require('geometry');

//console.log((geometry.getRandomColor()).name);

let pi = 3.141592654;
let radius = 100;

let WIDTH = 600;
let HEIGHT = 400;

//we define a dictionnary with all the info in it
let self_curves = {
  sides: {
    points: [],
    lines: [],
    index: [],
    calculation_lines: {
      lines: [],
      index: [],
    },
  },
  punctures: {
    points: [],
    index: [],
    overlap_one: null,
    pressed_two: null,
  },
  components: {
    center: [],
    points: [],
    number_points: [],
    index: [],
    calculation_lines: {
      lines: [],
      index: [],
    },
    overlap_one: null,
    pressed_two: null,
  },
  diagonals: {
    points: [],
    index: [],
    midpoints: [],
    calculation_lines: {
      lines: [],
      index: [],
    },
    overlap_one: null,
    pressed_two: null,
  },
};

//list to store the circle's centers
//we will need a list for the points, lines, and components
//we will need the bezier curve algorithm
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
  puncture_list = self_curves["punctures"]["points"]
  //just a small test
  if ((40 < mouseY && mouseY < 360) && (mouseIsPressed == true)){
    ellipse(mouseX, mouseY,15,15);
  };
  
  //we draw the points
  for (i = 0; i < self_curves["punctures"]["points"].length ; i++){
    fill("red")
    stroke("red")
    ellipse(WIDTH/2+self_curves["punctures"]["points"][i][0]*HEIGHT, HEIGHT/2+self_curves["punctures"]["points"][i][1]*HEIGHT, 8, 8)
    if (self_curves["punctures"]["overlap_one"] == i){
      fill("#B31F1E")
      stroke("#B31F1E")
      ellipse(WIDTH/2+self_curves["punctures"]["points"][i][0]*HEIGHT, HEIGHT/2+self_curves["punctures"]["points"][i][1]*HEIGHT, 8, 8)
    }
    if (self_curves["punctures"]["pressed_two"] == i){
      fill("#B31F1E")
      stroke("#B31F1E")
      ellipse(WIDTH/2+self_curves["punctures"]["points"][i][0]*HEIGHT, HEIGHT/2+self_curves["punctures"]["points"][i][1]*HEIGHT, 10, 10)
    }
  }
  
  //we draw the components
  for (i = 0; i < self_curves["components"]["center"].length; i++){
    fill(220)
    stroke("black")
    ellipse(WIDTH/2+self_curves["components"]["center"][i][0]*HEIGHT,
           HEIGHT/2+self_curves["components"]["center"][i][1]*HEIGHT,
           40, 40)
    if (self_curves["components"]["overlap_one"] == i){
      fill(220)
      stroke("blue")
      ellipse(WIDTH/2+self_curves["components"]["center"][i][0]*HEIGHT, HEIGHT/2+self_curves["components"]["center"][i][1]*HEIGHT, 40, 40)
    }
    if (self_curves["components"]["pressed_two"] == i){
      fill(220)
      stroke("blue")
      ellipse(WIDTH/2+self_curves["components"]["center"][i][0]*HEIGHT, HEIGHT/2+self_curves["components"]["center"][i][1]*HEIGHT, 41, 41)
    }
    //we add points around the components
    point_around_circle(self_curves["components"]["number_points"][i], WIDTH/2 + self_curves["components"]["center"][i][0]*HEIGHT, HEIGHT/2 + self_curves["components"]["center"][i][1]*HEIGHT, 20, false)
  }
  
  side = SideEntry.value();
  point_around_circle(side, WIDTH/2, HEIGHT/2, radius, true);
}

function point_around_circle(n, center_x, center_y, radius_circle, is_main_circle) {
  if (n <= 20) {
    if (is_main_circle == true){
      for (j=0 ; j < n; j++){
        stroke(20);
        line(center_x + radius_circle*Math.cos((j-1)*(2*pi)/n), center_y + radius_circle*Math.sin((j-1)*(2*pi)/n), center_x + radius_circle*Math.cos(j*(2*pi)/n), center_y + radius_circle*Math.sin(j*(2*pi)/n));
    }
  }
    for (j=0 ; j < n; j++){
      fill("red")
      stroke("red")
      ellipse(center_x + radius_circle*Math.cos(j*(2*pi)/n), center_y + radius_circle*Math.sin(j*(2*pi)/n), 8, 8);    
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
  ComponentButton.mousePressed(addComponent)
  
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
  //we verify if a puncture has been overlapped
  counter = 0; 
  is_clicked = false;
  for (i = 0; i < self_curves["punctures"]["points"].length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+self_curves["punctures"]["points"][i][0]*HEIGHT, HEIGHT/2+self_curves["punctures"]["points"][i][1]*HEIGHT) < 0.009*HEIGHT){
      //overlapped = i;
      self_curves["punctures"]["overlap_one"] = i;
      if (mouseIsPressed == true){
        clicked = i;
        self_curves["punctures"]["pressed_two"] = i
        is_clicked = true;
      }
    }
    else{
      counter += 1
    }  
  if (counter == self_curves["punctures"]["points"].length){
      //overlapped = null;
      self_curves["punctures"]["overlap_one"] = null
  }
  if (is_clicked == false){
      clicked = null;
      self_curves["punctures"]["pressed_two"] = null
  }
  }
  
  //we verify if a component has been overlapped
  counter = 0; 
  is_clicked = false;
  for (i = 0; i < self_curves["components"]["center"].length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+self_curves["components"]["center"][i][0]*HEIGHT, HEIGHT/2+self_curves["components"]["center"][i][1]*HEIGHT) < 0.050*HEIGHT){
      //overlapped = i;
      self_curves["components"]["overlap_one"] = i;
      if (mouseIsPressed == true){
        clicked = i;
        self_curves["components"]["pressed_two"] = i
        is_clicked = true;
      }
    }
    else{
      counter += 1
    }  
  if (counter == self_curves["components"]["center"].length){
      //overlapped = null;
      self_curves["components"]["overlap_one"] = null
  }
  if (is_clicked == false){
      clicked = null;
      self_curves["components"]["pressed_two"] = null
  }
  }
  
  
}

function mousePressed(){
  //we verify if a puncture have been pressed
  is_clicked = false;
  for (i = 0; i < self_curves["punctures"]["points"].length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+self_curves["punctures"]["points"][i][0]*HEIGHT, HEIGHT/2+self_curves["punctures"]["points"][i][1]*HEIGHT) < 0.009*HEIGHT){
      //clicked = i;
      self_curves["punctures"]["pressed_two"] = i;
      is_clicked = true;
    }
  if (is_clicked == false){
      //clicked = null;
      self_curves["punctures"]["pressed_two"] = null
    }
  }
  
  //we verify if a component have been pressed
  is_clicked = false;
  for (i = 0; i < self_curves["components"]["center"].length; i++){
    if (dist(mouseX, mouseY, WIDTH/2+self_curves["components"]["center"][i][0]*HEIGHT, HEIGHT/2+self_curves["components"]["center"][i][1]*HEIGHT) < 0.050*HEIGHT){
      //clicked = i;
      self_curves["components"]["pressed_two"] = i;
      is_clicked = true;
    }
  if (is_clicked == false){
      //clicked = null;
      self_curves["components"]["pressed_two"] = null
    }
  }
}

function mouseReleased(){
  //clicked = null;
  self_curves["punctures"]["pressed_two"] = null
  self_curves["components"]["pressed_two"] = null
}

function mouseDragged(){
  //we verify if we are moving a puncture around
  if (self_curves["punctures"]["pressed_two"] != null){
    if (40 < mouseY && mouseY < 360){
      clicked = self_curves["punctures"]["pressed_two"]
      //puncture_list[clicked][0] = (mouseX - WIDTH/2)/(HEIGHT)
      //puncture_list[clicked][1] = (mouseY - HEIGHT/2)/(HEIGHT)
      self_curves["punctures"]["points"][clicked][0] = (mouseX - WIDTH/2)/(HEIGHT)
      self_curves["punctures"]["points"][clicked][1] = (mouseY - HEIGHT/2)/(HEIGHT)
    }
  }
  
  //we verify if we are moving a puncture around
  if (self_curves["components"]["pressed_two"] != null){
    if (40 < mouseY && mouseY < 360){
      clicked = self_curves["components"]["pressed_two"]
      //puncture_list[clicked][0] = (mouseX - WIDTH/2)/(HEIGHT)
      //puncture_list[clicked][1] = (mouseY - HEIGHT/2)/(HEIGHT)
      self_curves["components"]["center"][clicked][0] = (mouseX - WIDTH/2)/(HEIGHT)
      self_curves["components"]["center"][clicked][1] = (mouseY - HEIGHT/2)/(HEIGHT)
    }
  }
}

function addPuncture(){
  //puncture_list.push([0, 0])
  self_curves["punctures"]["points"].push([0, 0])
}

function addComponent(){
  //puncture_list.push([0, 0])
  print("hello")
  self_curves["components"]["center"].push([0, 0])
  self_curves["components"]["number_points"].push(0)
}

function keyPressed(){
  //add points to a component
  if ((key == "p") && (self_curves["components"]["overlap_one"] != null)){
    clicked = self_curves["components"]["overlap_one"] 
    if (self_curves["components"]["number_points"][clicked]<10){
      self_curves["components"]["number_points"][clicked] += 1
    }
  }
  if ((key == "o") && (self_curves["components"]["overlap_one"] != null)){
    clicked = self_curves["components"]["overlap_one"]
    if (self_curves["components"]["number_points"][clicked]>0){
      self_curves["components"]["number_points"][clicked] -= 1
    }
  }
  print(self_curves["components"])
}