SELECT l.room, COUNT(l.room) AS count
FROM laundry AS l
INNER JOIN (
    SELECT a.room AS room, a.nr AS nr
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
	GROUP BY a.room
) AS n
ON l.room=n.room
WHERE week BETWEEN '2019-03-04' AND '2019-03-10 23:59:59'
GROUP BY l.room
ORDER BY l.room ASC