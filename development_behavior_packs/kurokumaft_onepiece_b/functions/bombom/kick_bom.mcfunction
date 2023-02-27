tag @s add bombom_kick_bom
execute positioned ^^^2 as @s run damage @e[tag=!bombom_kick_bom,r=1.5] 2 entity_explosion
execute positioned ^^^2 as @s run particle minecraft:large_explosion ~~~
tag @s remove bombom_kick_bom
