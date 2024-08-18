tag @s add bread_slash
execute at @e[tag=bread_slash] run particle kurokumaft:sweep_particle ^ ^1.8 ^2.4
execute at @e[tag=bread_slash] positioned ^^^3 run damage @e[tag=!bread_slash,r=3,c=3] 3 entity_attack
tag @s remove bread_slash
