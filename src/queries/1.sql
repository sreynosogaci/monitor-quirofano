--select t1.TurID, t1.TurSala, t1.TurEstado, t2.EstTQDsc, t3.HCNumIng
select *
	from TURNOS as t1
		left join ESTADOSTURNOQX as t2 on t1.TurEstado = t2.EstTQCod
		left join HISTORIAS as t3 on t1.TurDNIPte = t3.HCNumIng
	where t1.TurFecha = '2024-01-30';

--select * from ESTADOSTURNOQX where EstTQCod = 'M';
--select * from HISTORIAS where 