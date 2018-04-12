
$(function() {

    let anim_id

                               //SAVING HTML OBJECTS ONTO VARIABLES

    let container = $('#container')
    let car = $('#car')
    let car_1 = $('#car_1')
    let car_2 = $('#car_2')
    let car_3 = $('#car_3')
    let line_1 = $('#line_1')
    let line_2 = $('#line_2')
    let line_3 = $('#line_3')
    let restart_div = $('#restart_div')
    let restart_btn = $('#restart')
    let score = $('#score')
    let bonus = $('#bonus')
    let bonus_inv = $('#bonus_inv')

                       //SAVING WIDTH AND HEIGHT OF CONTAINER AND CAR ONTO VARIABLES

    let container_left = parseInt(container.css('left'))
    let container_width = parseInt(container.width())
    let container_height = parseInt(container.height())
    let car_width = parseInt(car.width())
    let car_height = parseInt(car.height())
    let bonus_width = parseInt(bonus.width())
    let bonus_height = parseInt(bonus.height())

                              // STOCK AND SCORE AND SPEED
    let score_counter = 1

                             // CHANGE THINGS HERE TO HAVE FUN


    let speed = 2
    let line_speed = 5
    let bonus_speed = 4
    let police_speed = 8


                               // SET THE MOVEMENT

   let move_right = false
   let move_left = false
   let move_up = false
   let move_down = false

                         // SET GAME OVER ON FALSE TO LET THE GAME KNOWS WHEN HE FINISH

    let invicible = false // WILL BE USEFUL FOR A BONUS
    let game_over = false





                // MOVE THE CAR WITH THE CORRECT KEYCODE


    $(document).keydown(function(e) { // KEYDOWN FOR WHEN THE UTILISATOR PRESS A KEY
        if (game_over === false) {
            let key = e.keyCode
            if (key === 81 && move_left === false) {
                move_left = requestAnimationFrame(left) // ASK THE NAVIGATOR TO EXECUTE AN ANIMATION
                move_left = true; // SET THE MOVEMENT ON TRUE 
            } else if (key === 68 && move_right === false) {
                move_right = requestAnimationFrame(right)
                move_right = true;
            } else if (key === 90 && move_up === false) {
                move_up = requestAnimationFrame(up)
                move_up = true;
            } else if (key === 83 && move_down === false) {
                move_down = requestAnimationFrame(down)
                move_down = true;
            }
        }
    });

    $(document).keyup(function(e) { // KEYUP FOR THE RELEASE OF A KEY
        if (game_over === false) {
            let key = e.keyCode
            if (key === 81) {
                cancelAnimationFrame(move_left); // ASK THE NAVIGATOR TO STOP AN ANIMATION
                move_left = false // SET THE MOVEMENT ON FALSE 
            } else if (key === 68) {
                cancelAnimationFrame(move_right);
                move_right = false
            } else if (key === 90) {
                cancelAnimationFrame(move_up);
                move_up = false
            } else if (key === 83) {
                cancelAnimationFrame(move_down);
                move_down = false
            }
        }
    });

                    //CREATE THE FUNCTIONS THAT WILL CONDUCT THE CAR

    function left() { // HOW THE CAR IS MOVING WHEN WE PRESS LEFT ARROW KEY
        if (game_over === false && parseInt(car.css('left')) > 0) { // AS LONG AS THE GAME IS NOT OVER AND THE CAR LEFT IS SUPERIOR AS 0
            car.css('left', parseInt(car.css('left')) - 5); // LEFT SPEED, DECREASE LEFT IN ORDER TO GO LEFT
            move_left = requestAnimationFrame(left)
        }
    }

    function right() { // HOW THE CAR IS MOVING WHEN WE PRESS RIGHT ARROW KEY
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) { // 
            car.css('left', parseInt(car.css('left')) + 5); // RIGHT SPEED
            move_right = requestAnimationFrame(right)
        }
    }

    function up() { // HOW THE CAR IS MOVING WHEN WE PRESS UP ARROW KEY
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3); // UP SPEED
            move_up = requestAnimationFrame(up)
        }
    }

    function down() { // HOW THE CAR IS MOVING WHEN WE PRESS DOWN ARROW KEY
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3); // DOWN SPEED
            move_down = requestAnimationFrame(down)
        }
    }



                       // REPEAT THE ANIMATION FROM THE CARS, BONUS, ANS LINES

    anim_id = requestAnimationFrame(repeat)

    function repeat() {

                                  // CREATE THE BONUS'S EFFECT

        if(collision(car, bonus)) {
          score.text(parseInt(score.text()) + 50) // BONUS + 50
          bonus.css('top', -100 + line_speed)
          let bonus_left = parseInt(Math.random() * (container_width - bonus_width));
          bonus.css('left', bonus_left)
        }


        if(collision(car, bonus_inv)) { // CREATE THE INVISIBILTY WHEN THE CAR TOUCH THE BONUS_INV
          invicible = true
          let car_opacity = parseInt(car.css('opacity'))
          car_opacity = 0.33
          car.css('opacity', car_opacity)
          car.css('opacity', car_opacity)
          setTimeout(function(){ car.css('opacity', 1); }, 3000)
          setTimeout(function(){ invicible = false;}, 3000)
          bonus.css('top', -100 + line_speed)
          let bonus_left = parseInt(Math.random() * (container_width - bonus_width))
          bonus.css('left', bonus_left)
        }


        if ((collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) && invicible == false) {
            stop_the_game()
            return;
        }

        score_counter++

        if (score_counter % 20 == 0) { // Score ++ every 0.2 seconds
            score.text(parseInt(score.text()) + 1)
        }
        if (score_counter % 500 == 0) { // speed ++ every 5 seconds
            speed++
            line_speed++
            bonus_speed++
        }

        car_down(car_1)
        car_down(car_2)

        police_car_down(car_3)

        bonus_down(bonus)
        bonus_inv_down(bonus_inv)

        line_down(line_1)
        line_down(line_2)
        line_down(line_3)

        anim_id = requestAnimationFrame(repeat)
    }


    // SPAWN THE BOT'S CARS IN THE CONTAINER

    function bonus_inv_down(bonus_inv){
      let bonus_inv_current_top = parseInt(bonus_inv.css('top')) // SET THE CURRENT TOP POSITION ON A VARIABLE
      if (bonus_inv_current_top > container_height) { // BRING DOWN THE OBJECT IN ORDER TO DISPLAY IT 
          bonus_inv_current_top = -200 
          let bonus_inv_left = parseInt(Math.random() * (container_width - bonus_width)); // SPAWN THE OBJECT RANDOMLY AND HORIZONTALY IN THE CONTAINER
          bonus_inv.css('left', bonus_inv_left)
      }
      bonus_inv.css('top', bonus_inv_current_top + bonus_speed) // SET THE SPEED AND THE SCROLLING FROM THE OBJECT 
    }

    function bonus_down(bonus){
      let bonus_current_top = parseInt(bonus.css('top'))
      if (bonus_current_top > container_height) {
          bonus_current_top = -200
          let bonus_left = parseInt(Math.random() * (container_width - bonus_width));
          bonus.css('left', bonus_left)
      }
      bonus.css('top', bonus_current_top + bonus_speed)
    }

    // SPAWN BOT'S CARS

    function car_down(car) {
        let car_current_top = parseInt(car.css('top'))
        if (car_current_top > container_height) {
            car_current_top = -200
            let car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left)
        }
        car.css('top', car_current_top + speed);
    }

    // SPAWN THE POLICE'S CAR

    function police_car_down(car_3) {
        let police_car_current_top = parseInt(car_3.css('top'))
        if (police_car_current_top > container_height) {
            police_car_current_top = -200
            let police_car_left = parseInt(Math.random() * (container_width - car_width));
            car_3.css('left', police_car_left)
        }
        car_3.css('top', police_car_current_top + police_speed)
    }

    // SPAWN THE LINE

    function line_down(line) {
        let line_current_top = parseInt(line.css('top'))
        if (line_current_top > container_height) {
            line_current_top = -300
        }
        line.css('top', line_current_top + line_speed)
    }


                            // SPAWN THE RESTART BUTTON

    restart_btn.click(function() {
        location.reload() // RELOAD GAME
    });


                                 // GAME OVER

    function stop_the_game() {
        game_over = true;
        //STOP REQUESTING THE NAVIGATOR TO REFRESH EVERY ANIMATION
        cancelAnimationFrame(anim_id)
        cancelAnimationFrame(move_right)
        cancelAnimationFrame(move_left)
        cancelAnimationFrame(move_up)
        cancelAnimationFrame(move_down)
        restart_div.slideDown(); // JQUERY SLIDE DOWN FUNCTION IN ORDER TO BRING THE RESTART DIV
        restart_btn.focus(); // TRIGGER THE FOCUS BUTTON
    }


                              //CREATE THE COLLISION BETWEEN CARS

    function collision($div1, $div2) {
        let left_1 = $div1.offset().left // OFFSET = GET THE COORDINATES OF THE ELEMENT, LEFT POSITION OF THE ELEMENT
        let top_1 = $div1.offset().top // TOP POSITION OF THE ELEMENT
        let height_1 = $div1.outerHeight(true) // GET THE CALCULATED HEIGHT OF THE ELEMENT, TRUE IN ORDER TO HAVE THE MARGIN
        let width_1 = $div1.outerWidth(true) // SAME WITH WIDTH
        
        let top_height = top_1 + height_1 // TOP AND LEFT POSITION 
        let left_width = left_1 + width_1 // HEIGHT AND WIDTH 
        
        let left_2 = $div2.offset().left 
        let top_2 = $div2.offset().top
        let height_2 = $div2.outerHeight(true)
        let width_2 = $div2.outerWidth(true)
        
        let top_height_2 = top_2 + height_2
        let left_width_2 = left_2 + width_2
        
        // IF TOP AND HEIGHT POSITION OF $DIV1 IS INFERIOR AS THE TOP OF THE $DIV2 RETURN FALSE
        // IF TOP OF $DIV1 IS SUPERIOR AS THE LEFT AND WIDTH OF $DIV2 RETURN FALSE 
        // IF LEFT AND WIDTH OF $DIV1 IS INFERIOR AS LEFT POSITION OF $DIV2 RETURN FALSE
        // IF LEFT POSITION OF $DIV1 IS SUPERIOR AS LEFT AND WIDTH OF $DIV2 RETURN FALSE 
        // OTHERWISE RETURN TRUE 
  
        if (top_height < top_2 || top_1 > top_height_2 || left_width < left_2 || left_1 > left_width_2) return false; 
        return true;
    }

                            // CLASSEMENT


                            //KONAMI CODE

let k = [80,65,82,73,71,79]
n = 0
$(document).keydown(function (e) {
if (e.keyCode === k[n++]) {
   if (n === k.length) {
       police_speed = 15
       speed = 5
       n = 0
       return false;
   }
}
else {
   n = 0;
}
})


})
