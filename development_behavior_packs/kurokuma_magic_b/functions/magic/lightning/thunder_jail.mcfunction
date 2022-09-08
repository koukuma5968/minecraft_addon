tag @e[family=monster,r=6] add thunder_jail
execute @e[tag=thunder_jail] ~~~ particle kurokumaft:thunder_jail_particle ~~~
damage @e[tag=thunder_jail] 4 lightning
effect @e[tag=thunder_jail] slowness 10 50 false
tag @e[tag=thunder_jail] remove thunder_jail
