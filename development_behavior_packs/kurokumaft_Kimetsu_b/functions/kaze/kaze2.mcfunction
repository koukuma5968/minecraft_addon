tag @s add kokyu_kaze2
execute as @s positioned ^^^1 run damage @e[tag=!kokyu_kaze2,family=!inanimate,type=!item,r=2.5] 20 entity_attack
execute as @s run particle kurokumaft:kaze2_particle ^^^2.5
tag @s remove kokyu_kaze2
