function House(dna_, position_) {
    
    this.rollover_on = false;

    this.dna = dna_;
    this.position = position_;
    this.fitness = 1;

    this.wh = 150;
    this.x = position_ * 160 + 150;
    this.y = 100;

    this.rectangle = new Rectangle(this.x-this.wh/2, this.y-this.wh/2, this.wh, this.wh);

    this.display = function() {

        var genes = this.dna.genes;

        var house_size = map(genes[0],0,1,50,90);
        var house_color = color(genes[1],genes[2],genes[3]);

        var window_x        = map(genes[4],0,1,-40,0);
        var window_y        = map(genes[5],0,1,-25,0);
        var window_size     = map(genes[6],0,1,0,25);
        var window_color     = color(genes[7],genes[8],genes[9]);

        var roof_x1        = map(genes[10],0,1,-50,-25);
        var roof_y1        = map(genes[11],0,1,-25,0);
        var roof_x2        = map(genes[12],0,1,-25,25);
        var roof_y2        = map(genes[13],0,1,-25,-50);
        var roof_x3        = map(genes[14],0,1,25,50);
        var roof_y3        = map(genes[15],0,1,-25,0);
        var roof_color     = color(genes[16],genes[17],genes[18]);

        var door_x        = map(genes[19],0,1,-25,25);
        var door_y        = map(genes[20],0,1,25,40);
        var door_w        = map(genes[21],0,1,10,25);
        var door_h        = map(genes[22],0,1,10,30);
        var door_color    = color(genes[23],genes[24],genes[25]);
        
        var chimney_x        = map(genes[26],0,1,-50,50);
        var chimney_y        = map(genes[27],0,1,-40,0);
        var chimney_w        = map(genes[28],0,1,5,15);
        var chimney_h        = map(genes[29],0,1,5,20);
        var chimney_color    = color(genes[30],genes[31],genes[32]);

        push();

        translate(this.x, this.y);
        noStroke();

        fill(house_color);
        rectMode(CENTER);
        rect(0, 10, house_size, house_size);

        fill(window_color);
        rectMode(CENTER);
        rect(-window_x, -window_y, window_size, window_size);
        rect( window_x, -window_y, window_size, window_size);

        fill(door_color);
        rectMode(CENTER);
        rect(door_x, door_y, door_w, door_h);

        fill(roof_color);
        triangle(roof_x1, roof_y1, roof_x2, roof_y2, roof_x3, roof_y3);
        
        fill(chimney_color);
        rectMode(CENTER);
        rect(chimney_x, chimney_y, chimney_w, chimney_h);

        // Draw the bounding box
        stroke(0.25);
        if (this.rolloverOn) fill(0, 0.25);
        else noFill();
        rectMode(CENTER);
        rect(0, 0, this.wh, this.wh);

        pop();

        textAlign(CENTER);
        if (this.rolloverOn) fill(0);
        else fill(0.25);
        text('' + floor(this.fitness), this.x, this.y+70);
    }

    this.rollover = function(mx, my) {
        if (this.rectangle.contains(mx, my)) {
            this.rollover_on = true;
            this.fitness += 0.25;
        } else {
            this.rollover_on = false;
        }
    }

    this.get_fitness = function() {
        return this.fitness;
    }

    this.get_dna = function() {
        return this.dna;
    }
}