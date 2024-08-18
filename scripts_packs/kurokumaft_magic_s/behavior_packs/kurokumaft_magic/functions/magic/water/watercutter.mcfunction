tag @s add watercutter
particle kurokumaft:watercutter_particle ^ ^1.8 ^3.5
execute as @s positioned ^^^2 run damage @e[tag=!watercutter,family=!inanimate,family=!familiar,type=!item,r=4] 3 drowning
tag @s remove watercutter
