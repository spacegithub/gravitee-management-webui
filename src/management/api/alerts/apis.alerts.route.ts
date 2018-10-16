/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import AlertService from '../../../services/alert.service';

export default apisAlertsRouterConfig;

function apisAlertsRouterConfig($stateProvider) {
  'ngInject';
  $stateProvider
    .state('management.apis.detail.alerts', {
      url: '/alerts?:alertId',
      component: 'alertComponent',
      data: {
        menu: {
          label: 'Alerts',
          icon: 'warning',
        },
        docs: {
          page: 'management-api-alerts'
        },
        perms: {
          only: ['api-alert-r']
        }
      },
      resolve: {
        alerts: (AlertService: AlertService, $stateParams) =>
          AlertService.listApiAlerts($stateParams.apiId).then((response) => response.data),
        api: ($stateParams, ApiService) => ApiService.get($stateParams.apiId).then((response) => response.data)
      }
    });
}
