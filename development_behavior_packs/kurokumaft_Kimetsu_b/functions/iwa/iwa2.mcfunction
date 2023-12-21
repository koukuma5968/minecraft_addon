tag @s add kokyu_iwa2
execute as @s positioned ^^^5 run damage @e[tag=!kokyu_iwa2,family=!inanimate,type=!item,r=5] 30 entity_attack
execute as @s positioned ^^^5 run particle kurokumaft:iwa2_particle ~~~
execute as @s positioned ^^^5 run summon kurokumaft:oto_bom ~~~ ~ ~ minecraft:explode
tag @s remove kokyu_iwa2
