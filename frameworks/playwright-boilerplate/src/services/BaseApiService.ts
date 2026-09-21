import { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from '../utils/logger';
import { env } from '../config/env';

/**
 * Base API service – extend for domain-specific clients.
 */
export abstract class BaseApiService {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseURL: string = env.apiBaseUrl
  ) {}

  protected async get(
    path: string,
    options?: { headers?: Record<string, string>; params?: Record<string, string | number> }
  ): Promise<APIResponse> {
    const url = this.buildUrl(path, options?.params);
    logger.info(`GET ${url}`);
    return this.request.get(url, { headers: this.defaultHeaders(options?.headers) });
  }

  protected async post(
    path: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    const url = this.buildUrl(path);
    logger.info(`POST ${url}`);
    return this.request.post(url, {
      data,
      headers: this.defaultHeaders(options?.headers),
    });
  }

  protected async put(
    path: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    const url = this.buildUrl(path);
    logger.info(`PUT ${url}`);
    return this.request.put(url, {
      data,
      headers: this.defaultHeaders(options?.headers),
    });
  }

  protected async patch(
    path: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    const url = this.buildUrl(path);
    logger.info(`PATCH ${url}`);
    return this.request.patch(url, {
      data,
      headers: this.defaultHeaders(options?.headers),
    });
  }

  protected async delete(
    path: string,
    options?: { headers?: Record<string, string> }
  ): Promise<APIResponse> {
    const url = this.buildUrl(path);
    logger.info(`DELETE ${url}`);
    return this.request.delete(url, { headers: this.defaultHeaders(options?.headers) });
  }

  protected defaultHeaders(extra?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extra,
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number>): string {
    const base = this.baseURL.replace(/\/$/, '');
    const p = path.startsWith('/') ? path : `/${path}`;
    let url = `${base}${p}`;
    if (params && Object.keys(params).length) {
      const qs = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString();
      url += `?${qs}`;
    }
    return url;
  }

  protected async json<T = any>(response: APIResponse, expectedStatus = 200): Promise<T> {
    if (response.status() !== expectedStatus) {
      const body = await response.text();
      throw new Error(
        `Expected status ${expectedStatus}, got ${response.status()}. Body: ${body.slice(0, 500)}`
      );
    }
    return response.json() as Promise<T>;
  }
}

export default BaseApiService;
