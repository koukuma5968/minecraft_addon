execute as @p run particle kurokumaft:explosion_shell ~~~
execute as @p run particle kurokumaft:explosion_wave_particle ~~~
execute as @e[family=!inanimate,family=!familiar,type=!item,r=10] run summon kurokumaft:fire_sword_magic ~~0.75~
execute as @p run damage @e[family=!inanimate,family=!familiar,type=!item,r=10] 100 fire
