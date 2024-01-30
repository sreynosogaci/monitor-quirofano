export interface Estado {
    EstTQCod:     EstadoEnum;
    EstTQDsc:     string;
    EstTQAltaFch: Date;
    EstTQAltaUsr: string;
    EstTQModFch:  Date;
    EstTQModUsr:  string;
    EstTQBajFch:  Date;
    EstTQBajUsr:  string;
    EstTQInicial: string;
}

export enum EstadoEnum {
    'RESERVADO'                = 'A',   
    'PREADMITIDO'              = 'B',   
    'PRESENTE'                 = 'C',   
    'ADMITIDO'                 = 'D',   
    'PREPARADO'                = 'E',   
    'SOLICITADO'               = 'F',   
    'EN AREA QUIRÚRGICA'       = 'G',   
    'INGRESO A QUIRÓFANO'      = 'H',   
    'INICIO DE ANESTESIA'      = 'I',   
    'INICIO DE PROCEDIMIENTO'  = 'J',   
    'FIN DE PROCEDIMIENTO'     = 'K',   
    'FIN DE ANESTESIA'         = 'L',   
    'FUERA DE AREA QUIRÚRGICA' = 'M',   
}