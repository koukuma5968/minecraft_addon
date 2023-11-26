tag @e[tag=!thunderclap_self,family=!inanimate,type=!item,c=3,r=20] add thunderclap
execute at @e[tag=thunderclap] run particle kurokumaft:lightningbolt_particle ~~~
execute at @e[tag=thunderclap] run summon Lightning_Bolt ~~~
damage @e[tag=thunderclap] 10 stalagmite
tag @e[tag=thunderclap] remove thunderclap
