tag @e[type=player,r=1.5,c=1] add healing
execute @e[tag=healing] ~~~ effect @s instant_health 1 1 false
tag @e[tag=healing] remove healing
