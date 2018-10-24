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

import NotificationService from "../../../services/notification.service";
import PortalPagesService from "../../../services/portalPages.service";

const DocumentationManagementComponent: ng.IComponentOptions = {
  bindings: {
    resolvedPages: '<'
  },
  template: require('./documentation-management.html'),
  controller: function (
    NotificationService: NotificationService,
    PortalPagesService: PortalPagesService
  ) {
    'ngInject';

    this.$onInit = () => {
      this.pages = this.resolvedPages;
    };

    this.togglePublish = (page: any) => {
      page.published = !page.published;
      PortalPagesService.editPage(page.id, page).then( () => {
        NotificationService.show('Page ' + page.name + ' has been ' + (page.published ? '':'un') + 'published with success');
      });
    };

    this.upward = (page: any) => {

    };

    this.downward = (page: any) => {

    };

    this.deleteItem = (page: any) => {

    };
  }
};

export default DocumentationManagementComponent;
