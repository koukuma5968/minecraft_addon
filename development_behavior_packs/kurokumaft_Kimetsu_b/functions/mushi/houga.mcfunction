tag @s add houganomai
tag @e[tag=!houganomai,family=!inanimate,type=!item,r=10,c=1] add houganomai_target
gamerule sendcommandfeedback false
execute as @s run tp @s ~~~ facing @e[tag=houganomai_target]
execute as @e[tag=houganomai_target] positioned ^^^1.5 run tp @e[tag=houganomai] ~~~
execute as @s run damage @e[tag=houganomai_target] 5 wither
execute as @s run effect @e[tag=houganomai_target] poison 10 15 true
tag @s remove houganomai
tag @e[tag=houganomai_target] remove houganomai_target
