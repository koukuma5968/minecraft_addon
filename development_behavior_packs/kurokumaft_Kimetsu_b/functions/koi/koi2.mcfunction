execute as @s positioned ^^^4 run tag @e[family=monster,r=5.5] add kokyu_koi2
damage @e[tag=kokyu_koi2] 10 entity_attack
execute as @s run particle kurokumaft:koi2_particle ^^^1
execute as @s run particle kurokumaft:koi2_particle ^^^4
execute sa @s run particle kurokumaft:koi2_particle ^^^7
tag @e[tag=kokyu_koi2] remove kokyu_koi2
