execute @e[tag=gravity_field_self,r=10] ~~~ execute @e[tag=!gravity_field_self,family=!inanimate,r=10] ~~~ particle kurokumaft:gravity_particle ~~~
execute @e[tag=gravity_field_self,r=10] ~~~ execute @e[tag=!gravity_field_self,family=!inanimate,r=10] ~~~ effect @s slowness 1 10 true
execute @e[tag=gravity_field_self,r=10] ~~~ damage @e[tag=!gravity_field_self,family=!inanimate,r=10] 1 falling_block
