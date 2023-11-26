tag @e[tag=!waterjail_self,family=!inanimate,type=!item,c=2,r=20] add waterjail
execute at @e[tag=waterjail] run effect @s slowness 10 50 false
execute at @e[tag=waterjail] run particle kurokumaft:waterjail_particle ~~~
tag @e[tag=waterjail] remove waterjail
