tag @s add ice_bread
particle kurokumaft:ice_bread_particle ^ ^1.8 ^3.5
execute as @s positioned ^^^2 run damage @e[tag=ice_bread,r=4] 5 freezing
tag @s remove ice_bread
