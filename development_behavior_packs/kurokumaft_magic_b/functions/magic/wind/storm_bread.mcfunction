tag @s add storm_bread
particle kurokumaft:storm_bread_particle ^ ^1.8 ^3.5
execute as @s positioned ^^^2 run damage @e[tag=!storm_bread,family=!inanimate,family=!familiar,type=!item,r=4] 4 fall
tag @s remove storm_bread
