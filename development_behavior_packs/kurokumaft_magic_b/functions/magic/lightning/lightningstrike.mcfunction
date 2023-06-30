execute @e[tag=lightningstrike_self,r=10] ~~~ execute @e[tag=!lightningstrike_self,family=!inanimate,r=10] ~~~ particle kurokumaft:spark_particle ~~~
execute @e[tag=lightningstrike_self,r=10] ~~~ execute @e[tag=!lightningstrike_self,family=!inanimate,r=10] ~~~ effect @s slowness 1 3 true
execute @e[tag=lightningstrike_self,r=10] ~~~ damage @e[tag=!lightningstrike_self,family=!inanimate,r=10] 3 lightning
