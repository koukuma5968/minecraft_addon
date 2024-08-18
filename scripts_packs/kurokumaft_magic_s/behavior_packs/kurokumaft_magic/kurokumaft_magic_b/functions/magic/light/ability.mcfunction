tag @e[type=player,r=6] add ability
execute as @e[tag=ability] at @s run effect @s strength 30 5 false
execute as @e[tag=ability] at @s run effect @s jump_boost 30 5 false
execute as @e[tag=ability] at @s run effect @s speed 30 3 false
execute as @e[tag=ability] at @s run effect @s haste 30 3 false
tag @e[tag=ability] remove ability
