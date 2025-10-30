// src/lib/fetchResource.ts
import { getUserToken, setUserToken, clearUserToken } from "./auth";

/** Métodos HTTP soportados */
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Opciones para fetchResource */
export type FetchOptions<TBody = unknown> = {
  /** Si true, NO enviamos Authorization */
  noAuth?: boolean;
  /** Query string como objeto simple (se aplanan primitivos) */
  query?: Record<string, string | number | boolean | null | undefined>;
  /** Cuerpo; si es FormData lo enviamos tal cual, si es objeto lo serializamos a JSON */
  body?: TBody | FormData;
  /** Headers extra (se mezclan con los nuestros) */
  headers?: Record<string, string>;
};

/** Error normalizado para todas las peticiones */
export class ApiError extends Error {
  status: number | "NETWORK_ERROR";
  data: unknown;

  constructor(status: number | "NETWORK_ERROR", data: unknown) {
    super(
      status === "NETWORK_ERROR" ? "Network error" : `API error: ${status}`
    );
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/* ------------------------------- helpers ------------------------------- */

function buildSearchParams(query?: FetchOptions["query"]): string {
  if (!query) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

/** Detecta FormData sin usar `any` ni directivas */
function isFormData(x: unknown): x is FormData {
  if (typeof FormData === "undefined") return false;
  return x instanceof FormData;
}

/** Intenta parsear JSON; si falla, devuelve null */
async function safeJson<T = unknown>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/* ------------------------------ función core ------------------------------ */

/**
 * `fetchResource` centraliza llamadas a `/api/*`.
 * - Añade Authorization con el token del usuario (salvo `noAuth`).
 * - Serializa body (FormData pasa tal cual).
 * - Si la respuesta incluye `token`, lo guarda con `setUserToken`.
 */
export default async function fetchResource<TResult = unknown, TBody = unknown>(
  method: HTTPMethod,
  path: string,
  opts: FetchOptions<TBody> = {}
): Promise<TResult> {
  const { noAuth, query, body, headers } = opts;

  const url = `/api/${path.replace(/^\/+/, "")}${buildSearchParams(query)}`;

  const finalHeaders = new Headers({
    Accept: "application/json",
    ...headers,
  });

  // Solo ponemos Content-Type si NO es FormData
  let payload: BodyInit | undefined;
  if (isFormData(body)) {
    payload = body;
  } else if (body !== undefined) {
    finalHeaders.set("Content-Type", "application/json");
    payload = JSON.stringify(body);
  }

  // Authorization
  if (!noAuth) {
    const token = getUserToken();
    if (token) finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: payload,
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", null);
  }

  // Intentamos parsear json (sea OK o error)
  const data = await safeJson<unknown>(res);

  // Si nos devuelven `token`, lo guardamos
  if (data && typeof data === "object" && "token" in data) {
    const token = (data as { token?: string }).token;
    if (token) setUserToken(token);
  }

  if (!res.ok) {
    // 401 → opcional: limpiar token
    if (res.status === 401) clearUserToken();
    throw new ApiError(res.status, data);
  }

  return (data as TResult | null) ?? (undefined as unknown as TResult);
}
