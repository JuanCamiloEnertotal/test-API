import { cgmApi } from "@root/api/cmgApi";
import {
  Border,
  EnerbitBorders,
  ExportDataLoadProfile,
  ReadState,
} from "@root/pages/enerbit/types";
import { AxiosError } from "axios";

export class EnerbitService {
  static listarFronteras = async (
    pagina: number = 1
  ): Promise<EnerbitBorders> => {
    try {
      const { data } = await cgmApi.get<EnerbitBorders>(
        `fronteras/listar?limite=10&pagina=${pagina}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };
  static buscarFrontera = async (
    sic: string,
    pagina: number = 1
  ): Promise<EnerbitBorders> => {
    try {
      const { data } = await cgmApi.get<EnerbitBorders>(
        `fronteras/listar/${sic}?limite=10&pagina=${pagina}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static crearFrontera = async (border: Border): Promise<Border> => {
    try {
      const { data } = await cgmApi.post<Border>(`fronteras/nuevo`, border);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static actualizarFrontera = async (border: Border): Promise<Border> => {
    const { id, ...rest } = border;

    try {
      const { data } = await cgmApi.patch<Border>(
        `fronteras/actualizar/${id}`,
        rest
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static cambiarEstadoFrontera = async (border: Border): Promise<Border> => {
    const { sic } = border;

    try {
      const { data } = await cgmApi.delete<Border>(`fronteras/${sic}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static lecturaMasivaFronteras = async () => {
    try {
      const { data } = await cgmApi.get<ReadState>(
        `fronteras/perfil/fronteras-activas`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static lecturaFrontera = async (sic: string) => {
    try {
      const { data } = await cgmApi.get<ReadState>(
        `fronteras/perfil/frontera-activa/${sic}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };

  static exportarDatosLecturas = async (
    fechaInicial: string,
    fechaFinal: string
  ) => {
    try {
      const { data } = await cgmApi.get<ExportDataLoadProfile[]>(
        `fronteras/perfil/data/consumos/${fechaInicial}/${fechaFinal}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Error al obtener las fronteras");
    }
  };
}
