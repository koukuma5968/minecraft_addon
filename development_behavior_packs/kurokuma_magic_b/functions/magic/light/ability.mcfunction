tag @e[type=player,r=6] add ability
execute @e[tag=ability] ~~~ effect @s health_boost 10 50 false
execute @e[tag=ability] ~~~ effect @s strength 10 50 false
execute @e[tag=ability] ~~~ effect @s jump_boost 10 10 false
execute @e[tag=ability] ~~~ effect @s speed 10 10 false
execute @e[tag=ability] ~~~ effect @s haste 10 10 false
tag @e[tag=ability] remove ability
