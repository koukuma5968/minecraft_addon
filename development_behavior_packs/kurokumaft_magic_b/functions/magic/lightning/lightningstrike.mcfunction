execute as @e[tag=lightningstrike_self,r=10] at @e[tag=!lightningstrike_self,family=!inanimate,r=10] run particle kurokumaft:spark_particle ~~~
execute as @e[tag=lightningstrike_self,r=10] at @e[tag=!lightningstrike_self,family=!inanimate,r=10] run effect @s slowness 1 3 true
execute as @e[tag=lightningstrike_self,r=10] at @s run damage @e[tag=!lightningstrike_self,family=!inanimate,r=10] 3 lightning
