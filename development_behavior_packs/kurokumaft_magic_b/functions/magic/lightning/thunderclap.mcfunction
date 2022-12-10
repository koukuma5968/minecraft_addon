tag @e[family=monster,c=3,r=20] add thunderclap
execute @e[tag=thunderclap] ~~~ particle kurokumaft:lightningbolt_particle ~~~
execute @e[tag=thunderclap] ~~~ summon Lightning_Bolt ~~~
damage @e[tag=thunderclap] 10 stalagmite
tag @e[tag=thunderclap] remove thunderclap
