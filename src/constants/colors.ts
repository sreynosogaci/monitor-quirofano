enum ColorsEnum {
    GRAY   = 'rgb(128, 128, 128)',
    WHITE  = 'rgb(255, 255, 255)',
    YELLOW = 'rgb(255, 255, 0)',
    VIOLET = 'rgb(255, 0, 255)',
    BLUE   = 'rgb(0, 0, 255)',
    GREEN  = 'rgb(0, 255, 0)',
    RED    = 'rgb(255, 0, 0)',
}

export const Colors = {
    reservado:             ColorsEnum.GRAY,
    presente:              ColorsEnum.WHITE,
    admitido:              ColorsEnum.YELLOW,
    preparado:             ColorsEnum.VIOLET,
    solicitado:            ColorsEnum.BLUE,
    enAreaQuirurgica:      ColorsEnum.GREEN,
    ingresoAQuirofano:     ColorsEnum.GREEN,
    inicioDeAnestesia:     ColorsEnum.GREEN,
    inicioDeProcedimiento: ColorsEnum.GREEN,
    finDelProcedimiento:   ColorsEnum.GREEN,
    finDeLaAnestesia:      ColorsEnum.GREEN,
    fueraDeAreaQuirurgica: ColorsEnum.RED,
}