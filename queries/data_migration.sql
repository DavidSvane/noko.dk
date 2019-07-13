/* INFO: NOKO INTRANET USER DATABASE MIGRATION */
SELECT r.uid AS uid,
  f.date AS date,
  u.pass AS pass,
  p.first AS first,
  p.last AS last,
  f.nr AS nr,
  f.room AS room,
  u.mail AS mail,
  p.phone AS phone,
  f.status AS status,
  p.sex AS sex,
  p.study AS study,
  u.status as active
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
GROUP BY r.uid
ORDER BY u.uid ASC


/* INFO: USER STATUS, NR AND ROOM MIGRATION */
