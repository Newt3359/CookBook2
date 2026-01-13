insert into meal_types (meal_id, meal)
values (1, 'BREAKFAST'),
       (2, 'LUNCH'),
       (3, 'DINNER'),
       (4, 'DESSERT');

insert into recipe (recipe_title, recipe_ingredients, recipe_directions, recipe_rating, recipe_last_change, recipe_favorite)
values ('udon noodles', 'noodles', 'make udon', 4.9, now(), true);

insert into meal_type_mapping_table (meal_type_id, recipe_fk_id)
select m.meal_id, r.recipe_id from meal_types m JOIN recipe r ON 1=1
where m.meal = 'LUNCH' AND r.recipe_title = 'udon noodles'
UNION ALL
select m.meal_id, r.recipe_id from meal_types m JOIN recipe r ON 1=1
where m.meal = 'DINNER' AND r.recipe_title = 'udon noodles';

insert into image (img_url, recipe_fk)
select '/uploads/test.png', recipe_id from recipe where recipe_title = 'udon noodles';