import { cgmApi } from "@root/api/cmgApi";
import * as XLSX from "xlsx";
import {
  Anio,
  Compensacion,
  ControlFormato,
  Mercado,
  RespuestaCargaSui,
  VariablesCompensacion,
} from "../types";
import { AxiosError } from "axios";

export class SuiService {
  static listarMercados = async (): Promise<Mercado[]> => {
    try {
      const { data } = await cgmApi.get<Mercado[]>("/sui/mercados");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Error al obtener los mercados");
    }
  };

  static listarAnios = async (): Promise<Anio[]> => {
    try {
      const { data } = await cgmApi.get<Anio[]>("/sui/anos");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al obtener los Años");
    }
  };

  static controlVariablesCompensacion = async (
    anio: number,
    mes: string,
    mercado: number
  ): Promise<VariablesCompensacion> => {
    try {
      const { data } = await cgmApi.get<VariablesCompensacion>(
        `/sui/variables/compensacion?anio=${anio}&mes=${mes}&mercado=${mercado}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al obtener las variables de compensacion");
    }
  };

  static controlFormatosSui = async (
    tipoFormato: string,
    anio: number,
    mercado: number
  ): Promise<ControlFormato[]> => {
    try {
      const { data } = await cgmApi.get<ControlFormato[]>(
        `/sui/${tipoFormato}/listar?anio=${Number(anio)}&mercado=${Number(
          mercado
        )}`
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al obtener los formatos de SUI");
    }
  };

  static eliminarFormatoSui = async (
    tipoFormato: string,
    anio: number,
    mes: string,
    mercado: number
  ): Promise<void> => {
    try {
      if (tipoFormato === "cs2") {
        await cgmApi.delete(
          `/sui/eliminar/formato?tipo=cs2&anio=${anio}&mes=${mes}&mercado=${mercado}`
        );
      } else if (tipoFormato === "tc1") {
        await cgmApi.delete(`/sui/eliminar/formato?tipo=tc1`);
      } else if (tipoFormato === "dt") {
        await cgmApi.delete(
          `/sui/eliminar/formato?tipo=cargos&anio=${anio}&mes=${mes}&mercado=${mercado}`
        );
      } else if (tipoFormato === "cdi") {
        await cgmApi.delete(
          `/sui/eliminar/formato?tipo=cdi&anio=${anio}&mes=${mes}&mercado=${mercado}`
        );
      } else if (tipoFormato === "cns") {
        await cgmApi.delete(
          `/sui/eliminar/formato?tipo=consumos&anio=${anio}&mes=${mes}&mercado=${mercado}`
        );
      } else if (tipoFormato === "compensacion") {
        await cgmApi.delete(
          `/sui/eliminar/formato?tipo=compensacion&anio=${anio}&mes=${mes}&mercado=${mercado}`
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al eliminar los formatos de SUI");
    }
  };

  static cargarFormatoSui = async (
    tipoFormato: string,
    anio: number,
    mes: string,
    mercado: number,
    formData: FormData
  ): Promise<RespuestaCargaSui> => {
    try {
      let request = "/sui/cargar/formato?tipo=";

      if (tipoFormato === "cs2") request += "cs2";
      if (tipoFormato === "tc1" && anio !== 0 && mes !== "")
        request += `tc1&anio=${anio}&mes=${mes}`;
      if (tipoFormato === "dt") request += `dt`;
      if (tipoFormato === "cns") request += `cns`;
      if (tipoFormato === "cdi") request += `cdi`;
      if (tipoFormato === "reinicio")
        request += `reinicio&anio=${anio}&mes=${mes}&mercado=${mercado}`;

      const { data } = await cgmApi.post<RespuestaCargaSui>(request, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al cargar los formatos de SUI");
    }
  };

  static calcularCompensacion = async (
    anio: number,
    mes: string,
    mercado: number
  ): Promise<void> => {
    try {
      await cgmApi.post(`/sui/compensacion/calculo`, {
        anio: anio,
        mes: mes,
        mercado: mercado,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      if (error instanceof Error) {
        throw error.message;
      }
      throw new Error("Error al calcular la compensacion");
    }
  };

  static exportarExcel = async (
    anio: number,
    mes: string,
    mercado: number
  ): Promise<Compensacion[]> => {
    try {
      const { data } = await cgmApi.get<Compensacion[]>(
        `sui/compensacion/consulta?anio=${anio}&mercado=${mercado}&mes=${mes}`
      );

      if (data.length === 0) throw new Error("No hay datos para exportar");

      const cleanData = data.map((item: Compensacion) => ({
        ...item,
        descuento: Number(item.descuento),
        cargoDt: Number(item.cargoDt),
        diug: Number(item.diug),
        diu: Number(item.diu),
        thc: Number(item.thc),
        hc: Number(item.hc),
        vc: Number(item.vc),
        tvc: Number(item.tvc),
        vcd: Number(item.vcd),
        vcf: Number(item.vcf),
        exc: Number(item.exc),
        fiug: Number(item.fiug),
        fium: Number(item.fium),
        cec: Number(item.cec),
        consumo: Number(item.consumo),
        total: Number(item.total),
      }));

      const libro = XLSX.utils.book_new();

      const hoja = XLSX.utils.json_to_sheet(cleanData);
      XLSX.utils.book_append_sheet(libro, hoja, "Compensaciones");

      setTimeout(() => {
        XLSX.writeFile(
          libro,
          `Compensaciones-${mercado}-${new Date().getTime()}.xlsx`
        );
      }, 1000);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      if (error instanceof Error) {
        throw error.message;
      }
      throw new Error("Error al exportar el excel");
    }
  };
}
