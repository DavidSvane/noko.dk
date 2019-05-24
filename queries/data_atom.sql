# "INFO: GET DATA FROM A TABLE"
SELECT * FROM kitchen_plans ORDER BY week DESC

# "INFO: REMOVE DATA FROM A TABLE"
DELETE FROM kitchen_plans WHERE id=96

# "INFO: CHANGE THE AUTO_INCREMENT VARIABLE OF A TABLE"
ALTER TABLE kitchen_plans AUTO_INCREMENT = 97

# "INFO: GET TABLE INFO (CHECK SUCCESSFUL AUTO_INCREMENT CHANGE)"
SHOW TABLE STATUS FROM noko_web WHERE name LIKE "kitchen_plans"
