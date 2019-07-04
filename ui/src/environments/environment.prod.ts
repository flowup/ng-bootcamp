import { EnvironmentModel } from '../app/models/environment.model';

export const environment: EnvironmentModel = {
  production: true,
  apiBaseUri: 'localhost:8080',
  apiHttpProtocol: 'http',
  apiWsProtocol: 'ws',
};
