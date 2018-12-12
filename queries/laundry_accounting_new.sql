SELECT l.room, n.nr, COUNT(l.room) AS count, n.name
FROM laundry AS l
INNER JOIN (
    SELECT a.room AS room, a.nr AS nr, u.name AS name
	FROM alumni_fields AS a
	INNER JOIN (
		SELECT room, MAX(date) AS date
		FROM alumni_fields
		GROUP BY room
	) AS g
	ON (
		a.room=g.room
		AND a.date=g.date
	)
	INNER JOIN (
		SELECT uid, name
		FROM users
	) AS u
	ON a.uid=u.uid
	GROUP BY a.room
) AS n
ON l.room=n.room
WHERE week BETWEEN '2018-05-07' AND '2018-05-13 23:59:59'
GROUP BY l.room
ORDER BY l.room ASC