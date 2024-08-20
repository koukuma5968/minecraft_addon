tag @e[tag=!thunder_jail_self,family=!inanimate,family=!familiar,type=!item,r=8] add thunder_jail
execute at @e[tag=thunder_jail] run particle kurokumaft:thunder_jail_particle ~~~
damage @e[tag=thunder_jail] 4 lightning
effect @e[tag=thunder_jail] slowness 10 50 false
tag @e[tag=thunder_jail] remove thunder_jail
