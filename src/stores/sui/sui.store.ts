import { SuiService } from "@root/pages/sui/services/sui.service";
import {
  Anio,
  Compensacion,
  ControlFormato,
  Mercado,
  RespuestaCargaSui,
  VariablesCompensacion,
} from "@root/pages/sui/types";
import { create, StateCreator } from "zustand";

export interface SuiState {
  mercados: Mercado[];
  anios: Anio[];
  variablesCompensacion: VariablesCompensacion;
  formatosSui: ControlFormato[];
  loading: boolean;
  validaCompensacion: boolean;

  setLoading(estado: boolean): void;
  listarMercados(): Promise<Mercado[]>;
  listarAnios(): Promise<Anio[]>;
  listarVariablesCompensacion(
    anio: number,
    mes: string,
    mercado: number
  ): Promise<VariablesCompensacion>;
  controlFormatosSui(
    tipoFormato: string,
    anio: number,
    mercado: number
  ): Promise<ControlFormato[]>;
  eliminarFormatoSui(
    tipoFormato: string,
    anio: number,
    mes: string,
    mercado: number
  ): Promise<void>;
  cargarFormatoSui(
    tipoFormato: string,
    anio: number,
    mes: string,
    mercado: number,
    formData: FormData
  ): Promise<RespuestaCargaSui>;
  calcularCompensacion(
    anio: number,
    mes: string,
    mercado: number
  ): Promise<void>;
  exportarCompensacion(
    anio: number,
    mes: string,
    mercado: number
  ): Promise<Compensacion[]>;
}

const storeApi: StateCreator<SuiState> = (set) => {
  return {
    mercados: [],
    anios: [],
    variablesCompensacion: {
      tc1: 0,
      cs2: 0,
      consumos: 0,
      cargos: 0,
      cdi: 0,
    },
    formatosSui: [],
    loading: false,
    validaCompensacion: true, // flag para conocer si las variable requeridas para compensar estan completas
    setLoading(estado: boolean) {
      set({ loading: estado });
    },
    listarMercados: async () => {
      const mercados = await SuiService.listarMercados();
      set({ mercados });
      return mercados;
    },
    listarAnios: async () => {
      const anios = await SuiService.listarAnios();
      set({ anios });
      return anios;
    },
    listarVariablesCompensacion: async (anio, mes, mercado) => {
      const variablesCompensacion =
        await SuiService.controlVariablesCompensacion(anio, mes, mercado);

      if (
        variablesCompensacion.tc1 === 0 ||
        variablesCompensacion.cs2 === 0 ||
        variablesCompensacion.consumos === 0 ||
        variablesCompensacion.cdi === 0
      ) {
        set({ validaCompensacion: true });
      } else {
        set({ validaCompensacion: false });
      }

      set({ variablesCompensacion });
      return variablesCompensacion;
    },
    controlFormatosSui: async (tipoFormato, anio, mercado) => {
      const formatosSui = await SuiService.controlFormatosSui(
        tipoFormato,
        anio,
        mercado
      );
      set({ formatosSui: formatosSui });
      return formatosSui;
    },
    eliminarFormatoSui: async (tipoFormato, anio, mes, mercado) => {
      await SuiService.eliminarFormatoSui(tipoFormato, anio, mes, mercado);

      const formatosSui = await SuiService.controlFormatosSui(
        tipoFormato,
        anio,
        mercado
      );
      set({ formatosSui });
    },
    cargarFormatoSui: async (tipoFormato, anio, mes, mercado, formData) => {
      set({ loading: true });
      try {
        const formatosSui = await SuiService.cargarFormatoSui(
          tipoFormato,
          anio,
          mes,
          mercado,
          formData
        );
        return formatosSui;
      } finally {
        set({ loading: false });
      }
    },
    calcularCompensacion: async (anio, mes, mercado) => {
      set({ loading: true, validaCompensacion: true });

      try {
        await SuiService.calcularCompensacion(anio, mes, mercado);
      } finally {
        set({ loading: false, validaCompensacion: false });
      }
    },
    exportarCompensacion: async (anio, mes, mercado) => {
      set({ loading: true });
      try {
        const compensacion = await SuiService.exportarExcel(anio, mes, mercado);

        return compensacion;
      } finally {
        set({ loading: false });
      }
    },
  };
};

export const useSuiStore = create<SuiState>()(storeApi);
