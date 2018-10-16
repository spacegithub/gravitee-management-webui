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
import _ = require('lodash');
import AlertService from "../../services/alert.service";
import NotificationService from "../../services/notification.service";
import {ConditionType} from "../api/analytics/logs/configure-logging-editor.dialog.controller";
import {AlertType} from "./alertType";
const AlertComponent: ng.IComponentOptions = {
  bindings: {
    api: '<',
    alerts: '<'
  },
  template: require('./alert.html'),
  controller: function(AlertService: AlertService, NotificationService: NotificationService) {
    'ngInject';
    this.$onInit = () => {
      this.types = [];
      this.types.push(new AlertType('HEALTH_CHECK', 'Health-check',
        'Configuration of email notification of API owner when the health-check status change'));
      this.types.push(new AlertType('QUOTA', 'Quota',
        'Configuration of email notification of API owner when the quota is exceeded'));
      this.selectAlertByType(this.types[0]);
    };

    this.selectAlertByType = (alertType) => {
      this.selectedAlertType = alertType;
      this.selectedAlert = _.find(this.alerts, {type: alertType.id});
      if (!this.selectedAlert) {
        this.selectedAlert = {type: alertType.id, referenceType: 'API', referenceId: this.api.id};
      }
    };

    this.save = () => {
      console.log(this.selectedAlert)
      if (this.selectedAlert.id) {
        AlertService.update(this.selectedAlert).then(() => {
          this.formAlert.$setPristine();
          NotificationService.show('Alert updated with success');
        });
      } else {
        AlertService.create(this.selectedAlert).then((response) => {
          this.selectedAlert = response.data;
          this.formAlert.$setPristine();
          NotificationService.show('Alert created with success');
        });
      }
    };
  }
};

export default AlertComponent;
