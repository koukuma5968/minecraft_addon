tag @e[family=monster,c=2,r=20] add rockbreak
execute as @e[tag=rockbreak] at @s run summon kurokumaft:rockbreakmagic rockbreak ~~10~
effect @e[tag=rockbreak] slowness 10 10 false
effect @e[tag=rockbreak] nausea 5 10 false
tag @e[tag=rockbreak] remove rockbreak
