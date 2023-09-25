tag @e[type=player,r=1.5,c=1] add healing
execute as @e[tag=healing] at @s run effect @s instant_health 1 1 false
tag @e[tag=healing] remove healing
