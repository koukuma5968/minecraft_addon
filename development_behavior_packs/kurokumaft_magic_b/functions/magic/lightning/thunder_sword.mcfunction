execute @s ~~~ particle kurokumaft:thunder_sword_slash_particle ~~~
execute @e[family=!player,family=!inanimate,r=5.5] ~~~ summon kurokumaft:thunder_sword_magic ~~0.75~
execute @s ~~~ damage @e[family=!player,family=!inanimate,r=5.5] 10 stalagmite
