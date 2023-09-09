tag @s add bread_slash
execute @e[tag=bread_slash] ~ ~ ~ particle kurokumaft:sweep_particle ^ ^1.8 ^2.4
execute @e[tag=bread_slash] ^^^3 damage @e[tag=!bread_slash,r=3,c=3] 2 entity_attack
tag @s remove bread_slash
