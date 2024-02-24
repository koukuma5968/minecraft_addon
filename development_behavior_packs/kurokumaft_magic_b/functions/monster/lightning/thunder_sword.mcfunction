execute as @s run particle kurokumaft:thunder_sword_slash_particle ~~~
execute at @e[family=!inanimate,family=!familiar,type=!item,r=5.5] run summon kurokumaft:thunder_sword_magic ~~0.75~
execute at @s run damage @e[family=!inanimate,family=!familiar,type=!item,r=5.5] 2 lightning
