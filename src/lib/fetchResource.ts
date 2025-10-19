// src/lib/fetchResource.ts
import { getUserToken, setUserToken, clearUserToken } from "./auth";

/** HTTP methods admitidos */
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Error normalizado para respuestas HTTP o fallos de red */
export class ApiError extends Error {
  status: number | "NETWORK_ERROR";
  data: any;

  constructor(status: number | "NETWORK_ERROR", data: any) {
    super(
      status === "NETWORK_ERROR"
        ? "Network error"
        : `API request failed with status ${status}`
    );
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Opciones del fetch propio.
 * Hacemos body más laxo (any) porque nosotros serializamos a JSON
 * si no es FormData.
 */
type Options = Omit<RequestInit, "body" | "method" | "headers"> & {
  body?: any;
  headers?: Record<string, string>;
  /** Si true, no adjuntamos Authorization */
  noAuth?: boolean;
};

/**
 * Base URL:
 * - Si defines NEXT_PUBLIC_BASE_URL (p.ej. en producción), se usa esa.
 * - Si no, usamos /api (pasará por el proxy/rewrite de Next para evitar CORS).
 */
const BASE =
  (process.env.NEXT_PUBLIC_BASE_URL || "/api").replace(/\/+$/, "");

/** Pequeña utilidad para unir rutas sin dobles barras */
const join = (base: string, path: string) =>
  `${base}/${String(path || "").replace(/^\/+/, "")}`;

/**
 * fetchResource:
 * - Adjunta token (Authorization) salvo que uses { noAuth: true }
 * - Serializa JSON automáticamente si body es objeto (no FormData)
 * - Maneja errores de red y HTTP devolviendo ApiError
 * - Refresca token si el backend devuelve { token }
 * - Es genérico: fetchResource<T>(...)
 */
export default async function fetchResource<T = unknown>(
  method: HTTPMethod,
  path: string,
  options: Options = {}
): Promise<T> {
  const url = join(BASE, path);

  const isFormData = options.body instanceof FormData;
  const token = getUserToken();

  const headers: Record<string, string> = {
    // Solo establecemos JSON si NO es FormData
    ...(!isFormData && { "Content-Type": "application/json" }),
    // Adjuntamos Authorization si hay token y no se pidió noAuth
    ...(token && !options.noAuth ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    method,
    ...options,
    headers,
  };

  // Serializamos JSON si body es un objeto "plano" (no FormData)
  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  // ---- fetch real
  let res: Response;
  try {
    res = await fetch(url, config);
  } catch (err: any) {
    // Error de red / CORS / DNS, etc.
    throw new ApiError("NETWORK_ERROR", { message: err?.message ?? String(err) });
  }

  // Intentamos parsear el cuerpo como JSON, pero lo tratamos como opcional
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // Respuesta sin JSON (204, o texto vacío) → data queda en null
  }

  // Si 401, limpiamos token (si se usó auth) y lanzamos error
  if (res.status === 401 && !options.noAuth) {
    clearUserToken();
  }

  if (!res.ok) {
    // Lanza ApiError con el status real y el payload (si lo hay)
    throw new ApiError(res.status, data);
  }

  // Si el backend devuelve un token (login, refresh, etc.), lo persistimos
  if (data && typeof data === "object" && data.token) {
    setUserToken(data.token);
  }

  return data as T;
}
