tag @e[tag=!rock_break_self,family=!inanimate,family=!familiar,type=!item,c=2,r=20] add rockbreak
execute at @e[tag=rockbreak] run summon kurokumaft:rockbreakmagic rockbreak ~~10~
effect @e[tag=rockbreak] slowness 10 10 false
effect @e[tag=rockbreak] nausea 5 10 false
tag @e[tag=rockbreak] remove rockbreak
