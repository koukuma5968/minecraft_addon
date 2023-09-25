execute as @e[tag=gravity_field_self,r=10] at @e[tag=!gravity_field_self,family=!inanimate,r=10] run particle kurokumaft:gravity_particle ~~~
execute as @e[tag=gravity_field_self,r=10] at @e[tag=!gravity_field_self,family=!inanimate,r=10] run effect @s slowness 1 10 true
execute as @e[tag=gravity_field_self,r=10] at @s run damage @e[tag=!gravity_field_self,family=!inanimate,r=10] 1 falling_block
