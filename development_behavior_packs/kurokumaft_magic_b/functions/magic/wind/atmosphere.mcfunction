execute @e[tag=atmosphere_self,r=10] ~~~ execute @e[tag=!atmosphere_self,family=!inanimate,r=10] ~~~ particle kurokumaft:storm1_particle ~~~
execute @e[tag=atmosphere_self,r=10] ~~~ execute @e[tag=!atmosphere_self,family=!inanimate,r=10] ~~~ particle kurokumaft:storm2_particle ~~1~
execute @e[tag=atmosphere_self,r=10] ~~~ execute @e[tag=!atmosphere_self,family=!inanimate,r=10] ~~~ particle kurokumaft:storm3_particle ~~2~
execute @e[tag=atmosphere_self,r=10] ~~~ execute @e[tag=!atmosphere_self,family=!inanimate,r=10] ~~~ particle kurokumaft:storm4_particle ~~3~
execute @e[tag=atmosphere_self,r=10] ~~~ execute @e[tag=!atmosphere_self,family=!inanimate,r=10] ~~~ effect @s levitation 1 15 true
execute @e[tag=atmosphere_self,r=10] ~~~ damage @e[tag=!atmosphere_self,family=!inanimate,r=10] 1 fall
