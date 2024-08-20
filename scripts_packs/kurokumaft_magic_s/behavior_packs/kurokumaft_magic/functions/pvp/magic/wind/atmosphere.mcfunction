tag @e[tag=!atmosphere_self,family=!inanimate,family=!familiar,type=!item,r=10] add atmosphere
execute at @e[tag=atmosphere_self] run particle kurokumaft:atmosphere_particle ~~~
execute at @e[tag=atmosphere] run particle kurokumaft:wind_particle ~~1~
execute at @e[tag=atmosphere] run particle kurokumaft:storm1_particle ~~1~
execute at @e[tag=atmosphere] run particle kurokumaft:storm2_particle ~~0~
execute at @e[tag=atmosphere] run particle kurokumaft:storm3_particle ~~1.5~
execute at @e[tag=atmosphere] run particle kurokumaft:storm4_particle ~~0.5~
damage @e[tag=atmosphere] 5 falling_block
tag @e[tag=atmosphere] remove atmosphere