execute as @e[tag=atmosphere_self,r=10] at @e[tag=!atmosphere_self,family=!inanimate,r=10] run particle kurokumaft:storm1_particle ~~~
execute as @e[tag=atmosphere_self,r=10] at @e[tag=!atmosphere_self,family=!inanimate,r=10] run particle kurokumaft:storm2_particle ~~1~
execute as @e[tag=atmosphere_self,r=10] at @e[tag=!atmosphere_self,family=!inanimate,r=10] run particle kurokumaft:storm3_particle ~~2~
execute as @e[tag=atmosphere_self,r=10] at @e[tag=!atmosphere_self,family=!inanimate,r=10] run particle kurokumaft:storm4_particle ~~3~
execute as @e[tag=atmosphere_self,r=10] at @e[tag=!atmosphere_self,family=!inanimate,r=10] run effect @s levitation 1 15 true
execute as @e[tag=atmosphere_self,r=10] at @s run damage @e[tag=!atmosphere_self,family=!inanimate,r=10] 1 fall