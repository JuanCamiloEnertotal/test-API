export type Compensacion = {
  ano: number;
  mes: string;
  niu: string;
  cargoDt: number;
  descuento: number;
  diug: number;
  dium: number;
  diu: number;
  thc: number; // Total Horas Acumuladas compensadas Diu
  hc: number; // horas a compensar Diu
  vcd: number;
  fiug: number;
  fium: number;
  fiu: number;
  tvc: number; // Total horas Acumuladas compensadas fiu
  vcf: number;
  vc: number;
  exc: number;
  cec: number;
  nt: number;
  grupo: number;
  consumo: number;
  total: number;
  cdiu: string;
  cfiu: string;
  mercadoId: number;
};

export type ProcessResponse = {
  ok: boolean;
  message: string;
};

export type Mercado = {
  id: number;
  nombre: string;
};

export type Anio = {
  id: number;
  descripcion: string;
};

export type VariablesCompensacion = {
  tc1: number;
  cs2: number;
  consumos: number;
  cargos: number;
  cdi: number;
};

export type ControlFormato = {
  mes: string;
  total: number;
};

export type RespuestaCargaSui = {
  mensaje: string;
  registros: number;
};
