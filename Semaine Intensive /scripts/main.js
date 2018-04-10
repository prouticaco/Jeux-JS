
$(function() {

    let anim_id;

    //saving dom objects to variables
    let container = $('#container');
    let car = $('#car');
    let car1 = $('#car_1');
    let car2 = $('#car_2');
    let car3 = $('#car_3');
    let line1 = $('#line_1');
    let line2 = $('#line_2');
    let line3 = $('#line_3');
    let restart_div = $('#restart_div');
    let restart_btn = $('#restart');
    let score = $('#score');

    //saving some initial setup
    let container_left = parseInt(container.css('left'));
    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());
    let car_width = parseInt(car.width());
    let car_height = parseInt(car.height());

    // Start with the game over variable on false
    let game_over = false;

    // Count the score of the player

    let score_counter = 1;

    //
    let speed = 2;
    let line_speed = 5;

    let move_right = false;
    let move_left = false;
    let move_up = false;
    let move_down = false;



                           // SETTLE THE VEHICLE'S MOVEMENTS WITH THE RIGHT KEYCODE //

    $(document).on('keydown', function(e) {
        if (game_over === false) {
            let key = e.keyCode;
            if (key === 37  && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39  && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38   && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40  && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

  
