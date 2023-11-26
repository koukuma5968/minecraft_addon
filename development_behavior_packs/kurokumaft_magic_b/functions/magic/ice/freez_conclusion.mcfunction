tag @e[tag=!freez_conclusion_self,family=!inanimate,type=!item,c=1,r=15] add freez_conclusion
execute at @e[tag=freez_conclusion] run particle kurokumaft:freezingconclusion_particle ~~~
execute at @e[tag=freez_conclusion] run fill ~-1 ~ ~-1 ~1 ~1 ~1 packed_ice
effect @e[tag=freez_conclusion] weakness 20 3 true
tag @e[tag=freez_conclusion] remove freez_conclusion
