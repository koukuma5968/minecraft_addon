tag @e[tag=!gravity_field_self,family=!inanimate,family=!familiar,type=!item,r=15] add gravity_field
execute at @e[tag=gravity_field] run particle kurokumaft:gravity_particle ~~~
effect @e[tag=gravity_field] slowness 1 10 true
damage @e[tag=gravity_field] 3 falling_block
tag @e[tag=gravity_field] remove gravity_field
