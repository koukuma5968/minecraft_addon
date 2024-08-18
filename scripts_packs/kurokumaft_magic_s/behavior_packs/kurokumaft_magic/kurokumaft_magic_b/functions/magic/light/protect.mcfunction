tag @e[type=player,r=6] add protect
execute as @e[tag=protect] at @s run effect @s resistance 30 50 false
execute as @e[tag=protect] at @s run effect @s fire_resistance 30 50 false
tag @e[tag=protect] remove protect
