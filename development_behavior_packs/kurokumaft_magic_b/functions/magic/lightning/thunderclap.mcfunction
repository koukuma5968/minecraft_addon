tag @e[family=monster,c=3,r=20] add thunderclap
execute as @e[tag=thunderclap] at @s run particle kurokumaft:lightningbolt_particle ~~~
execute as @e[tag=thunderclap] at @s run summon Lightning_Bolt ~~~
damage @e[tag=thunderclap] 10 stalagmite
tag @e[tag=thunderclap] remove thunderclap
