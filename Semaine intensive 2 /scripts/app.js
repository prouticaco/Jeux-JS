
$(function() {

    let anim_id;

                               //SAVING HTML OBJECTS ONTO VARIABLES

    let container = $('#container');
    let car = $('#car');
    let car_1 = $('#car_1');
    let car_2 = $('#car_2');
    let car_3 = $('#car_3');
    let line_1 = $('#line_1');
    let line_2 = $('#line_2');
    let line_3 = $('#line_3');
    let restart_div = $('#restart_div');
    let restart_btn = $('#restart');
    let score = $('#score');

                       //SAVING WIDTH AND HEIGHT OF CONTAINER AND CAR ONTO VARIABLES

    let container_left = parseInt(container.css('left'));
    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());
    let car_width = parseInt(car.width());
    let car_height = parseInt(car.height());

                              // STOCK AND SCORE AND SPEED
    let score_counter = 1;
    let speed = 2;
    let line_speed = 5;


                               // SET THE MOVEMENT

   let move_right = false;
   let move_left = false;
   let move_up = false;
   let move_down = false;

                         // SET GAME OVER ON FALSE TO LET THE GAME KNOWS WHEN HE FINISH

    let game_over = false;





                // MOVE THE CAR WITH THE CORRECT KEYCODE


    $(document).on('keydown', function(e) {
        if (game_over === false) {
            let key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            let key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

                    //CREATE THE FUNCTIONS THAT WILL CONDUCT THE CAR

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

                       // CREER LES BONUS

    function createBonus(){
    bonusPosX = Math.floor(Math.random()*container.innerWidth/10)*10
    bonusPosY = Math.floor(Math.random()*container.innerHeight/10)*10
    bonus = document.createElement('div')
    diamond.setAttribute('id','bonus')
    document.querySelector('body').appendChild(bonus)
    posDiamond()
  }

    function posBonus(){
      bonus.style.top = bonusPosY + 'px'
      bonus.style.left = bonusPosX + 'px'
    }


                      // REPEAT THE ANIMATION FROM THE CARS

    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) { // Score ++ every 0.2 seconds
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) { // speed ++ every 5 seconds
            speed++;
            line_speed++;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
    }


                           // REPEAT THE CAR'S PATTERN

    function car_down(car) {
        let car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            let car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

                        //REPEAT THE LINE'S PATTERNS

    function line_down(line) {
        let line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }


                            // SPAWN THE RESTART BUTTON

    restart_btn.click(function() {
        location.reload(); // RELOAD GAME
    });


                                 // GAME OVER

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }


                              //CREATE THE COLLISION BETWEEN CARS

    function collision($div1, $div2) {
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});
