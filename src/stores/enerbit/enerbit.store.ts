import {
  Border,
  EnerbitBorders,
  ExportDataLoadProfile,
  ReadState,
} from "@root/pages/enerbit/types";
import { create, StateCreator } from "zustand";
import { EnerbitService } from "../../pages/enerbit/services/enerbit.service";

export interface EnerbitState {
  accion: string;
  terminoBusqueda: string;
  spinner: boolean;
  mostrarModalFrontera: boolean;
  mostrarModalExportarDatos: boolean;
  frontera: Border;
  fronteras: {
    datos: Border[];
    paginaActual: number;
    totalElementos: number;
    totalPaginas: number;
  };
  abrirModalFrontera: (accion: string) => void;
  cerrarModalFrontera: () => void;
  abrirModalExportarDatos: () => void;
  cerrarModalExportarDatos: () => void;
  mostrarSpinner: (estado: boolean) => void;
  setFrontera: (frontera: Border) => void;
  setTerminoBusqueda: (termino: string) => void;
  listadoFronteras: (pagina?: number) => Promise<EnerbitBorders>;
  buscarFrontera: (sic: string, pagina: number) => Promise<EnerbitBorders>;
  crearFrontera: (frontera: Border) => Promise<Border>;
  actualizarFrontera(frontera: Border): Promise<Border>;
  cambiarEstadoFrontera(frontera: Border): Promise<void>;
  lecturaMasivaFronteras(): Promise<ReadState>;
  lecturaFrontera(sic: string): Promise<ReadState>;
  exportarDatosLecturas(
    fechaInicial: string,
    fechaFinal: string
  ): Promise<ExportDataLoadProfile[]>;
}

const storeApi: StateCreator<EnerbitState> = (set, get) => ({
  accion: "",
  spinner: false,
  terminoBusqueda: "",
  mostrarModalFrontera: false,
  mostrarModalExportarDatos: false,
  frontera: {
    sic: "",
    nombre: "",
    producto: "",
    medidor: "",
    estado: "A",
    fechaInicio: new Date(),
    ultimaLectura: new Date(),
  },
  fronteras: {
    datos: [],
    paginaActual: 1,
    totalElementos: 0,
    totalPaginas: 0,
  },

  abrirModalFrontera: (accion: string) => {
    set({ accion: accion });
    set({ mostrarModalFrontera: true });
  },
  cerrarModalFrontera: () => set({ mostrarModalFrontera: false }),
  abrirModalExportarDatos: () => set({ mostrarModalExportarDatos: true }),
  cerrarModalExportarDatos: () => set({ mostrarModalExportarDatos: false }),
  setFrontera: (frontera: Border) => set({ frontera: frontera }),
  mostrarSpinner: (estado: boolean) => set({ spinner: estado }),
  setTerminoBusqueda: (termino: string) => set({ terminoBusqueda: termino }),
  listadoFronteras: async (pagina: number = 1) => {
    try {
      const borders = await EnerbitService.listarFronteras(pagina);

      set({ fronteras: { ...borders } });
      return borders;
    } catch (error) {
      set({
        fronteras: {
          datos: [],
          paginaActual: 1,
          totalElementos: 0,
          totalPaginas: 0,
        },
      });
      throw error;
    }
  },
  buscarFrontera: async (sic: string, pagina: number = 1) => {
    try {
      const borders = await EnerbitService.buscarFrontera(sic, pagina);
      set({ fronteras: { ...borders } });
      return borders;
    } catch (error) {
      set({
        fronteras: {
          datos: [],
          paginaActual: 1,
          totalElementos: 0,
          totalPaginas: 0,
        },
      });
      throw error;
    }
  },
  crearFrontera: async (frontera: Border) => {
    try {
      const border = await EnerbitService.crearFrontera(frontera);
      const borders = await EnerbitService.listarFronteras();
      set({ fronteras: { ...borders } });
      return border;
    } catch (error) {
      throw error;
    }
  },
  actualizarFrontera: async (frontera: Border): Promise<Border> => {
    try {
      const terminoBusqueda = get().terminoBusqueda;

      if (terminoBusqueda.length > 0) {
        const border = await EnerbitService.actualizarFrontera(frontera);
        const borders = await EnerbitService.buscarFrontera(terminoBusqueda);
        set({ fronteras: { ...borders } });
        return border;
      } else {
        const border = await EnerbitService.actualizarFrontera(frontera);
        const borders = await EnerbitService.listarFronteras(
          get().fronteras.paginaActual
        );
        set({ fronteras: { ...borders } });
        return border;
      }
    } catch (error) {
      throw error;
    }
  },
  cambiarEstadoFrontera: async (frontera: Border): Promise<void> => {
    try {
      const terminoBusqueda = get().terminoBusqueda;

      if (terminoBusqueda.length > 0) {
        await EnerbitService.cambiarEstadoFrontera(frontera);
        const borders = await EnerbitService.buscarFrontera(terminoBusqueda);
        set({ fronteras: { ...borders } });
      } else {
        await EnerbitService.cambiarEstadoFrontera(frontera);
        const borders = await EnerbitService.listarFronteras(
          get().fronteras.paginaActual
        );
        set({ fronteras: { ...borders } });
      }
    } catch (error) {
      throw error;
    }
  },
  lecturaMasivaFronteras: async (): Promise<ReadState> => {
    try {
      const data = await EnerbitService.lecturaMasivaFronteras();
      return data;
    } catch (error) {
      throw error;
    }
  },
  lecturaFrontera: async (sic: string): Promise<ReadState> => {
    try {
      const data = await EnerbitService.lecturaFrontera(sic);
      return data;
    } catch (error) {
      throw error;
    }
  },
  exportarDatosLecturas: async (
    fechaInicial: string,
    fechaFinal: string
  ): Promise<ExportDataLoadProfile[]> => {
    try {
      const datos = await EnerbitService.exportarDatosLecturas(
        fechaInicial,
        fechaFinal
      );
      return datos;
    } catch (error) {
      throw error;
    }
  },
});

export const useEnerbitStore = create<EnerbitState>()(storeApi);
