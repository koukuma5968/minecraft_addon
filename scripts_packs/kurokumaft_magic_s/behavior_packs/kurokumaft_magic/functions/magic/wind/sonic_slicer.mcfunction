tag @s add sonic_slicer
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^ ^1.0 ^0
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^ ^1.5 ^0
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^-2 ^1.5 ^0
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^2 ^1.5 ^0
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^-2 ^2.0 ^0
execute as @s positioned ^^^3 run particle kurokumaft:storm_bread_particle ^2 ^2.0 ^0
execute as @s positioned ^^^3 run damage @e[tag=!sonic_slicer,family=!inanimate,family=!familiar,type=!item,r=4] 10 fall
tag @s remove sonic_slicer
