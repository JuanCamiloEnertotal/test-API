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
