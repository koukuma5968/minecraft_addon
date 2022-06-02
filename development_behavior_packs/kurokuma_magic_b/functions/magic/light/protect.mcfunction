tag @e[type=player,r=6] add protect
execute @e[tag=protect] ~~~ effect @s resistance 30 50 false
execute @e[tag=protect] ~~~ effect @s fire_resistance 30 50 false
tag @e[tag=protect] remove protect
