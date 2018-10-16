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

import {IHttpPromise} from "angular";

class AlertService {
  private apisURL: string;

  constructor(private $http: ng.IHttpService, Constants) {
    'ngInject';
    this.apisURL = `${Constants.baseURL}apis/`;
  }

  listApiAlerts(apiId: string): IHttpPromise<any> {
    return this.$http.get(this.apisURL + apiId + '/alerts');
  }

  create(apiAlert: any): IHttpPromise<any> {
    return this.$http.post(this.apisURL + apiAlert.referenceId + '/alerts', apiAlert);
  }

  update(apiAlert: any): IHttpPromise<any> {
    return this.$http.put(this.apisURL + apiAlert.referenceId + '/alerts/' + apiAlert.id, apiAlert);
  }
}

export default AlertService;
