// CLASSES

class Character{
    constructor(top){
        this.width = 30;
        this.height = 60;
        this.top = top;
        this.left = 10;
        this.Yspeed = 0;
        this.Terminal_Velocity = 10; // Default = 10
        this.jumps=0;
        this.normal_jump_active = true;
    }
    gravity(){
        if(this.Yspeed<this.Terminal_Velocity){
            this.Yspeed++;
        };
        this.top+=this.Yspeed;
        character.style.top = this.top+"px";

        for(var plat in platform_array){
            if(this.isColission(this.top,this.left,
                platform_array[plat].top,platform_array[plat].left)){
                    this.Yspeed=0;
                    this.top = platform_array[plat].top-this.height;
                    character.style.top = this.top;
            }
        };

        if(this.top>800){
            game_over();
        }
    }
    isColission(selfTop,selfLeft,otherTop,otherLeft){
        if(Math.sqrt(((selfTop+this.height)-otherTop)**2)<=5 
        && selfLeft+this.width>=otherLeft-20
        && selfLeft-35<=otherLeft+190){
            char.jumps = 0;
            return true
        }else{
            return false
        }
    }
    startGravity(){
       const gravity_interval = setInterval(()=>{this.gravity()},20);
       intervals.push(gravity_interval)
    }
};

class Platform{
    constructor(top,left,identity){
        this.identity = identity;
        this.height = 25;
        this.width = 190;
        this.top = top;
        this.left = left;
    }
};

// VARIABLES

const game = document.getElementById("game");
const platform1 = document.getElementById("platform1");
const platform2 = document.getElementById("platform2");
const Page_Score = document.getElementById("score");
const beam1 = document.getElementById("beam1"); 
let intervals = [];
let started = false; 
let platform_interval;
let score = 0;
let beam_active = false;
let beamtop = 100;

// CLASS INSTANCES

const char = new Character(400);
const plat1 = new Platform(460,0,platform1); //0
const plat2 = new Platform(350,415,platform2); //415
const platform_array = [plat1,plat2];

char.startGravity();

// FUNCTIONS
function start(){
    started = true;

    const platform_movement = setInterval(()=>{
        for(var platform in platform_array){
            if(platform_array[platform].left==(platform_array[platform].width*(-1)-40)){
                platform_array[platform].left = 600;
                platform_array[platform].identity.style.left = platform_array[platform].left+"px";
                platform_array[platform].top = Math.floor((Math.random()*200)+330);
                platform_array[platform].identity.style.top = platform_array[platform].top+"px";
            }else{
                platform_array[platform].left += -5;
                platform_array[platform].identity.style.left = platform_array[platform].left+"px"
            }
        }
    },10);
    intervals.push(platform_movement);

    const scoring_interval = setInterval(()=>{
        score++;
        Page_Score.textContent = `Score: ${score}`;

        if(score==30){
            beam_active = true;
        }
    },1000);
    intervals.push(scoring_interval);
};

function jump(){
    if(!started){
        start()
    };
    for(var plat in platform_array){
        if(char.isColission(char.top,char.left,
            platform_array[plat].top,platform_array[plat].left)){
            char.normal_jump_active = true;
            break;
        }else{
            char.normal_jump_active = false
        };
    };

    if(char.normal_jump_active){
        char.normal_jump_active=false;
        char.Yspeed = -15;
        character.classList.add("jump_animation");
        setTimeout(function(){character.classList.remove("jump_animation");},300)
    }else{
        if(char.jumps<2){
            char.Yspeed = -15;
            char.jumps++;
        }
    }
};

// Animation-Iterations

beam1.addEventListener("animationiteration",()=>{
    if(beam_active){
        if(beamtop>char.top && beamtop<char.top+char.height){
            game_over()
        };
        beamtop = Math.floor(Math.random()*550)+100;
        beam1.style.top = beamtop+"px"; 
    }
});

function game_over(){
    for(var i in platform_array){
        platform_array[i].identity.style.top=-100+"px"
    };
    for(var i in intervals){
        clearInterval(intervals[i])
    };
    beam1.remove();
    Page_Score.remove();
    character.style.top = -100+"px";

    var high_score = parseInt(JSON.parse(localStorage.getItem("high_score"))) || 0;
    if(score>high_score){
        high_score = score;
    };
    var agg = "<div class='TextBlock'>";
    agg += `<p>Score: ${score}</p>`;
    agg += `<p>High Score: ${high_score}</p>`;
    agg += "<div class='Buttons' onclick='location.reload()'>Play Again</div>";
    agg += "</div>";
    game.innerHTML += agg;
    localStorage.setItem("high_score",JSON.stringify(high_score));
};