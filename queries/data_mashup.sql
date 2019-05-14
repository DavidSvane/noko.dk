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


/* INFO: GETTING ONLY THE MOST RECENT DATA FROM STILL RELEVANT ALUMNI */
