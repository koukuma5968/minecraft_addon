tag @s add houganomai
tag @e[r=10,c=1,family=!player,family=!inanimate,type=!item] add houganomai_target
gamerule sendcommandfeedback false
execute @s ~~~ tp @s ~~~ facing @e[tag=houganomai_target]
execute @e[tag=houganomai_target] ^^^1.5 tp @e[tag=houganomai] ~~~
execute @s ~~~ damage @e[tag=houganomai_target] 5 wither
execute @s ~~~ effect @e[tag=houganomai_target] poison 10 15 true
tag @e[tag=houganomai] remove houganomai
tag @e[tag=houganomai_target] remove houganomai_target
