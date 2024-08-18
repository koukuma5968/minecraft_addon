tag @e[type=player,r=10] add areaheel
execute as @e[tag=areaheel] at @s run particle kurokumaft:areaheel_particle ~~~
execute as @e[tag=areaheel] at @s run effect @s instant_health 30 5 false
tag @e[tag=areaheel] remove areaheel
