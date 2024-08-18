tag @e[type=player,r=1.5,c=1] add recovery
execute as @e[tag=recovery] at @s run effect @s clear
tag @e[tag=recovery] remove recovery
