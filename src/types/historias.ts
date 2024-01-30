// import prismadb from '@/lib/prismadb'

// export type HistoriaClinica = ReturnType<typeof prismadb.hISTORIAS.findUnique>
export interface HistoriaClinica {
    HCNumIng:             number;
    HCTipoPaciente?:      string;
    HCNumero?:            number;
    HCApeSol?:            string;
    HCApeCas?:            string;
    HCNombre?:            string;
    HCTipoDoc?:           number;
    HCNumDocumento?:      number;
    HCSexo?:              string;
    HCNacionalidad?:      number;
    HCEstCivil?:          string;
    HCFechaNacim?:        Date;
    HCDomicilio?:         string;
    HCNumCalle?:          number;
    HCPiso?:              string;
    HCDepto?:             string;
    HCLocalidad?:         number;
    HCCodPostal?:         string;
    HCProvincia?:         number;
    HCPais?:              number;
    HCCodArea?:           string;
    HCTelefono?:          string;
    HCTelCelular?:        string;
    HCOcupacion?:         number;
    HCEmpresa?:           string;
    HCDomicEmpresa?:      string;
    HCTelEmpresa?:        string;
    HCObraSocial?:        number;
    HCNumAfiliado?:       string;
    HCPlan?:              string;
    HCOSPlan?:            string;
    HCOSOblig?:           string;
    HCTipoIva?:           number;
    HCCUIT?:              string;
    HCRApeNom?:           string;
    HCRPaCodigo?:         string;
    HCRDomicilio?:        string;
    HCRLocalidad?:        number;
    HCRProvincia?:        number;
    HCRCodPost?:          string;
    HCRCodArea?:          string;
    HCRTelefono?:         string;
    HCR2CodArea?:         string;
    HCR2Telefono?:        string;
    HCRUcrgCodArea?:      string;
    HCRTelUrgencia?:      string;
    HCRCelular?:          string;
    HCRCorreo?:           string;
    HCRTipoDoc?:          number;
    HCRNumDoc?:           number;
    HCMedico?:            number;
    HCFechaIng?:          Date;
    HCUsuario?:           string;
    HCLoteTransferencia?: number;
    HCFechaMod?:          Date;
    HCUsMod?:             string;
    HCMedCarCabe?:        number;
    HCEMail?:             string;
    HCUlOperac?:          Date;
    HCUlATC?:             Date;
    HCUltInter?:          Date;
    HCUlLugInter?:        string;
    HCUlDiagInter?:       string;
    HCUltPedHisto?:       number;
    HCHistAnte?:          string;
    HCNumNextLab?:        number;
    HCAltura?:            number;
    HCPeso?:              number;
    HCContextura?:        string;
    HCAnticoagulado?:     string;
    HCTermAlta?:          string;
    HCTermModif?:         string;
    HCNumAUnificar?:      number;
    HCModificar?:         string;
    HCNroArchivo?:        number;
    HCTipoArchivo?:       number;
    HCMarcaDuplicada?:    string;
    HCUltMedSeguim?:      number;
    HCProtocolo?:         number;
    HCProtDesde?:         Date;
    HCProtHasta?:         Date;
    HCCliGen?:            string;
    HCFoto?:              string;
    HCDigitaliz?:         string;
    HCFallecido?:         string;
    HCFecFalle?:          Date;
    HCTelLaboral?:        string;
    HCHCOrig?:            number;
    HCOrigen?:            string;
    HCBiblioteca?:        number;
    HCEstado?:            string;
    HCFecBaja?:           Date;
    HCUsuBaja?:           string;
    HCPdoCod?:            number;
    HCApePadre?:          string;
    HCNomPadre?:          string;
    HCApeMadre?:          string;
    HCNomMadre?:          string;
    HCObservaciones?:     string;
    HCEmpadronado?:       string;
    HCEmpadrono?:         string;
    HCFecEmpadrono?:      Date;
    HCNroAnt?:            number;
    HCDomicilio2?:        string;
    HCNumCalle2?:         number;
    HCPiso2?:             string;
    HCDepto2?:            string;
    HCPais2?:             number;
    HCProvincia2?:        number;
    HCLocalidad2?:        number;
    HCCodPostal2?:        string;
    HCCodArea2?:          string;
    HCTelefono2?:         string;
    HCTelCelular2?:       string;
    HCObsTratAct?:        string;
    HCUsuTratAct?:        string;
    HCFecTratAct?:        Date;
    HCFaceBook?:          string;
    HCCapita?:            string;
    HCTextFalle?:         string;
    HCProg?:              string;
    HCFecDup?:            Date;
    HCUsuDup?:            string;
    HCBloqueada?:         string;
    HCFecBloq?:           Date;
    HCUsuBloq?:           string;
    HCRef3Tel?:           string;
    HCRef3Obs?:           string;
    HCRef3ApeNom?:        string;
    HCRef2Tel?:           string;
    HCRef2Obs?:           string;
    HCRef2ApeNom?:        string;
    HCTransObs?:          string;
    HCCelular?:           number;
    HCProgUpd?:           string;
    HCEntEmp?:            number;
    HCEntId?:             number;
    HCNiegaIntol?:        string;
    HCNiegaAler?:         string;
    HCRecAmiodarona?:     string;
    HCFecAlerFA?:         Date;
    HCMedADom?:           string;
    HCAuditada?:          string;
    HCUsuAudit?:          string;
    HCFecAudit?:          Date;
    HCObsAudit?:          string;
    HCGrupoYFactor?:      string;
    HCNumAfilSer?:        string;
    HCJuzgado?:           string;
    HCJuzNro?:            number;
    HCJuzSecretaria?:     string;
    HCJuzLocalidad?:      string;
    HCJuzAutos?:          string;
    HCWebUsu?:            string;
    HCWebPass?:           string;
    HCToken?:             string;
    HCGeoLoc?:            string;
    HCTokenOperacion?:    number;
    HCTokenAlta?:         Date;
    HCAlertaVistaUsu?:    string;
    HCAlertaVistaFec?:    Date;
    HCAlertaVista?:       string;
    HCNoTransfFec?:       Date;
    HCNoTransfUsu?:       string;
    HCNoTransfunde?:      string;
    HCTrasplantado?:      string;
  }

