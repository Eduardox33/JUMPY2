class Character{constructor(t){this.width=30,this.height=60,this.top=t,this.left=10,this.Yspeed=0,this.Terminal_Velocity=10,this.jumps=0,this.normal_jump_active=!0}gravity(){for(var t in this.Yspeed<this.Terminal_Velocity&&this.Yspeed++,this.top+=this.Yspeed,character.style.top=this.top+"px",platform_array)this.isColission(this.top,this.left,platform_array[t].top,platform_array[t].left)&&(this.Yspeed=0,this.top=platform_array[t].top-this.height,character.style.top=this.top);this.top>800&&game_over()}isColission(t,a,r,e){return 5>=Math.sqrt((t+this.height-r)**2)&&a+this.width>=e-20&&a-35<=e+190&&(char.jumps=0,!0)}startGravity(){let t=setInterval(()=>{this.gravity()},20);intervals.push(t)}}class Platform{constructor(t,a,r){this.identity=r,this.height=25,this.width=190,this.top=t,this.left=a}}const game=document.getElementById("game"),platform1=document.getElementById("platform1"),platform2=document.getElementById("platform2"),Page_Score=document.getElementById("score"),beam1=document.getElementById("beam1");let intervals=[],started=!1,platform_interval,score=0,beam_active=!1,beamtop=100;const char=new Character(400),plat1=new Platform(460,0,platform1),plat2=new Platform(350,415,platform2),platform_array=[plat1,plat2];function start(){started=!0;let t=setInterval(()=>{for(var t in platform_array)platform_array[t].left==-1*platform_array[t].width-40?(platform_array[t].left=600,platform_array[t].identity.style.left=platform_array[t].left+"px",platform_array[t].top=Math.floor(200*Math.random()+330),platform_array[t].identity.style.top=platform_array[t].top+"px"):(platform_array[t].left+=-5,platform_array[t].identity.style.left=platform_array[t].left+"px")},10);intervals.push(t);let a=setInterval(()=>{score++,Page_Score.textContent=`Score: ${score}`,30==score&&(beam_active=!0)},1e3);intervals.push(a)}function jump(){for(var t in started||start(),platform_array){if(char.isColission(char.top,char.left,platform_array[t].top,platform_array[t].left)){char.normal_jump_active=!0;break}char.normal_jump_active=!1}char.normal_jump_active?(char.normal_jump_active=!1,char.Yspeed=-15,character.classList.add("jump_animation"),setTimeout(function(){character.classList.remove("jump_animation")},300)):char.jumps<2&&(char.Yspeed=-15,char.jumps++)}function game_over(){for(var t in platform_array)platform_array[t].identity.style.top="-100px";for(var t in intervals)clearInterval(intervals[t]);beam1.remove(),Page_Score.remove(),character.style.top="-100px";var a=parseInt(JSON.parse(localStorage.getItem("high_score")))||0;score>a&&(a=score);var r="<div class='TextBlock'>";r+=`<p>Score: ${score}</p>`,r+=`<p>High Score: ${a}</p>`,r+="<div class='Buttons' onclick='location.reload()'>Play Again</div>",r+="</div>",game.innerHTML+=r,localStorage.setItem("high_score",JSON.stringify(a))}char.startGravity(),beam1.addEventListener("animationiteration",()=>{beam_active&&(beamtop>char.top&&beamtop<char.top+char.height&&game_over(),beamtop=Math.floor(550*Math.random())+100,beam1.style.top=beamtop+"px")});