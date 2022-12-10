tag @e[type=player,r=10] add areaheel
execute @e[tag=areaheel] ~~~ particle kurokumaft:areaheel_particle ~~~
execute @e[tag=areaheel] ~~~ effect @s instant_health 30 5 false
tag @e[tag=areaheel] remove areaheel
