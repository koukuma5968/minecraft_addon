tag @e[tag=!storm_self,family=!inanimate,type=!item,c=3,r=20] add storm
execute as @e[tag=storm] at @s run particle kurokumaft:storm1_particle ~~~
execute as @e[tag=storm] at @s run particle kurokumaft:storm2_particle ~~1~
execute as @e[tag=storm] at @s run particle kurokumaft:storm3_particle ~~2~
execute as @e[tag=storm] at @s run particle kurokumaft:storm4_particle ~~3~
damage @e[tag=storm,ry=-10,rym=10,r=4] 2 fall
effect @e[tag=storm] levitation 1 15 true
tag @e[tag=storm] remove storm
