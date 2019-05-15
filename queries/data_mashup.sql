/* INFO: GETTING ALL RELEVANT USER DATA FROM THE OLD DRUPAL INTRANET */
SELECT users_roles.uid AS uid,
  users.name AS name,
  users.pass AS pass,
  users.mail AS mail,
  alumni_profile.first AS first,
  alumni_profile.last AS last,
  alumni_profile.sex AS sex,
  alumni_profile.study AS study,
  alumni_profile.phone AS phone,
  users_roles.rid AS rid,
  role.name AS role
FROM users
LEFT JOIN users_roles
  ON users.uid=users_roles.uid
INNER JOIN role
  ON users_roles.rid=role.rid
LEFT JOIN alumni_profile
  ON users.uid=alumni_profile.uid
ORDER BY users.uid ASC


/* INFO: MERGING A HISTORY OF ALL ROOM RESIDENTS */
SELECT users.uid AS uid,
  alumni_fields.room AS room,
  alumni_fields.nr AS nr,
  alumni_fields.status AS status,
  users.name AS name,
  alumni_fields.date AS date,
  alumni_status.title AS title
FROM users
LEFT JOIN alumni_fields
  ON users.uid=alumni_fields.uid
INNER JOIN alumni_status
  ON alumni_fields.status=alumni_status.status
ORDER BY uid ASC, date ASC


/* INFO: MERGE OF THE TWO FOR A ONE TABLE SYSTEM */
SELECT users_roles.uid AS uid,
  users.name AS name,
  users.pass AS pass,
  alumni_fields.nr AS nr,
  alumni_fields.room AS room,
  alumni_fields.status AS status,
  alumni_status.title AS title,
  alumni_profile.sex AS sex,
  users_roles.rid AS rid,
  role.name AS role,
  alumni_profile.study AS study,
  users.mail AS mail,
  alumni_profile.phone AS phone,
  alumni_fields.date AS date,
  alumni_profile.first AS first,
  alumni_profile.last AS last
FROM users
LEFT JOIN users_roles
  ON users.uid=users_roles.uid
INNER JOIN role
  ON users_roles.rid=role.rid
LEFT JOIN alumni_profile
  ON users.uid=alumni_profile.uid
LEFT JOIN alumni_fields
  ON users.uid=alumni_fields.uid
LEFT JOIN alumni_status
  ON alumni_fields.status=alumni_status.status
ORDER BY users.uid ASC, date ASC


/* INFO: GET ONLY THE MOST RECENT INFORMATION FOR RELEVANT USERS */
SELECT r.uid AS uid,
  u.name AS name,
  u.pass AS pass,
  f.nr AS nr,
  f.room AS room,
  f.status AS status,
  sl.title AS title,
  p.sex AS sex,
  r.rid AS rid,
  rl.name AS role,
  p.study AS study,
  u.mail AS mail,
  p.phone AS phone,
  f.date AS date,
  p.first AS first,
  p.last AS last
FROM users AS u
LEFT JOIN users_roles AS r
  ON u.uid=r.uid
INNER JOIN role AS rl
  ON r.rid=rl.rid
LEFT JOIN alumni_profile AS p
  ON u.uid=p.uid
LEFT JOIN alumni_fields AS f
  ON u.uid=f.uid
LEFT JOIN alumni_status AS sl
  ON f.status=sl.status
INNER JOIN (
  SELECT CONCAT(uid, MAX(date)) AS tag
  FROM alumni_fields
  GROUP BY uid
) AS t
ON CONCAT(f.uid, f.date)=t.tag
WHERE f.status IN (0,1,2,3,6)
ORDER BY u.uid DESC
