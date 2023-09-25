tag @e[type=player,r=6] add ability
execute as @e[tag=ability] at @s run effect @s health_boost 10 50 false
execute as @e[tag=ability] at @s run effect @s strength 10 50 false
execute as @e[tag=ability] at @s run effect @s jump_boost 10 10 false
execute as @e[tag=ability] at @s run effect @s speed 10 10 false
execute as @e[tag=ability] at @s run effect @s haste 10 10 false
tag @e[tag=ability] remove ability
