export type EnerbitBorders = {
  datos: Border[];
  paginaActual: number;
  totalElementos: number;
  totalPaginas: number;
};

export type Border = {
  sic: string;
  nombre: string;
  producto: string;
  medidor: string;
  estado: string;
  fechaInicio: Date;
  ultimaLectura: Date;
  id?: number;
};

export type ReadState = {
  process: string;
  message: string;
};

export type LoadProfile = {
  sic: string;
  producto: string;
  fecha: string;
  AI01: number;
  AI02: number;
  AI03: number;
  AI04: number;
  AI05: number;
  AI06: number;
  AI07: number;
  AI08: number;
  AI09: number;
  AI10: number;
  AI11: number;
  AI12: number;
  AI13: number;
  AI14: number;
  AI15: number;
  AI16: number;
  AI17: number;
  AI18: number;
  AI19: number;
  AI20: number;
  AI21: number;
  AI22: number;
  AI23: number;
};

export type ExportDataLoadProfile = {
  datos: LoadProfile[];
};
