tag @e[tag=!waterjail_self,family=!inanimate,family=!familiar,type=!item,c=2,r=20] add waterjail
effect @e[tag=waterjail] slowness 10 50 false
execute at @e[tag=waterjail] run particle kurokumaft:waterjail_particle ~~~
tag @e[tag=waterjail] remove waterjail
