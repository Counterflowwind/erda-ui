// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import getAppRouter from 'application/router';
import i18n from 'i18n';
import { PROJECT_TABS, AUTO_TEST_TABS, MANUAL_TEST_TABS, ITERATION_DETAIL_TABS } from './tabs';

function getProjectRouter(): RouteConfigItem[] {
  return [
    {
      path: 'projects/:projectId',
      breadcrumbName: '{projectName}',
      mark: 'project',
      routes: [
        {
          path: 'apps',
          breadcrumbName: i18n.t('project:applications'),
          layout: { fullHeight: true },
          getComp: (cb) => cb(import('project/pages/apps/app-list'), 'ProjectAppList'),
        },
        {
          path: 'apps/createApp',
          breadcrumbName: i18n.t('add application'),
          getComp: (cb) => cb(import('project/pages/apps/app-form')),
        },
        {
          path: 'issues',
          mark: 'issues',
          breadcrumbName: i18n.t('project:issues'),
          routes: [
            {
              path: 'all',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/issue/all')),
              layout: {
                noWrapper: true,
                fullHeight: true,
              },
            },
            {
              path: 'requirement',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/issue/requirement')),
              layout: {
                noWrapper: true,
              },
            },
            {
              path: 'task',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/issue/task')),
              layout: {
                noWrapper: true,
              },
            },
            {
              path: 'bug',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/issue/bug')),
              layout: {
                noWrapper: true,
              },
            },
            {
              path: 'backlog',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              layout: { noWrapper: true, fullHeight: true },
              getComp: (cb) => cb(import('project/pages/backlog')),
            },
            {
              path: 'iteration',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              routes: [
                {
                  tabs: PROJECT_TABS,
                  getComp: (cb) => cb(import('project/pages/iteration/table'), 'Iteration'),
                },
                {
                  path: ':iterationId/:issueType',
                  mark: 'iterationDetail',
                  ignoreTabQuery: true,
                  tabs: ITERATION_DETAIL_TABS,
                  getComp: (cb) => cb(import('project/pages/issue/')),
                  layout: {
                    noWrapper: true,
                  },
                },
              ],
            },
            {
              path: 'milestone',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/milestone'), 'Milestone'),
              layout: { noWrapper: true, fullHeight: true },
            },
            {
              path: 'dashboard',
              tabs: PROJECT_TABS,
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/issue/issue-dashboard')),
              layout: {
                noWrapper: true,
              },
            },
          ],
        },
        {
          path: 'ticket',
          breadcrumbName: i18n.t('project:tickets'),
          getComp: (cb) => cb(import('project/pages/ticket')),
        },
        {
          path: 'pipelines',
          breadcrumbName: i18n.t('pipeline'),
          layout: { fullHeight: true },
          getComp: (cb) => cb(import('project/pages/pipelines')),
        },
        {
          path: 'manual',
          pageName: i18n.t('project:manual test'),
          routes: [
            {
              path: 'testCase',
              tabs: MANUAL_TEST_TABS,
              layout: { fullHeight: true },
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/test-manage/case/manual-test')),
            },
            {
              path: 'testPlan',
              tabs: MANUAL_TEST_TABS,
              ignoreTabQuery: true,
              breadcrumbName: i18n.t('project:manual test'),
              routes: [
                {
                  getComp: (cb) => cb(import('project/pages/test-plan/test-plan')),
                },
                {
                  path: ':testPlanId',
                  mark: 'testPlanDetail',
                  layout: { fullHeight: true },
                  breadcrumbName: i18n.t('project:plan details'),
                  getComp: (cb) => cb(import('project/pages/plan-detail')),
                },
              ],
            },
            {
              path: 'testEnv',
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/test-env/test-env'), 'ManualTestEnv'),
              tabs: MANUAL_TEST_TABS,
            },
          ],
        },
        {
          path: 'auto',
          pageName: i18n.t('project:auto test'),
          routes: [
            {
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/auto-test/index')),
            },
            {
              path: 'testCase',
              tabs: AUTO_TEST_TABS,
              ignoreTabQuery: true,
              breadcrumbName: i18n.t('project:auto test'),
              routes: [
                {
                  getComp: (cb) => cb(import('project/pages/auto-test/index')),
                },
                {
                  path: ':spaceId/scenes',
                  mark: 'autoTestSpaceDetail',
                  breadcrumbName: `${i18n.t('project:Scenes')}({testSpaceName})`,
                  routes: [
                    {
                      layout: { fullHeight: true },
                      getComp: (cb) => cb(import('project/pages/auto-test/scenes')),
                    },
                  ],
                },
              ],
            },
            {
              path: 'config-sheet',
              tabs: AUTO_TEST_TABS,
              ignoreTabQuery: true,
              layout: { fullHeight: true },
              getComp: (cb) => cb(import('project/pages/config-sheet')),
            },
            {
              path: 'testPlan',
              tabs: AUTO_TEST_TABS,
              ignoreTabQuery: true,
              breadcrumbName: i18n.t('project:auto test'),
              routes: [
                {
                  getComp: (cb) => cb(import('project/pages/test-plan/test-plan-protocol')),
                },
                {
                  path: ':testPlanId',
                  mark: 'testPlanDetail',
                  layout: { fullHeight: true },
                  breadcrumbName: i18n.t('project:plan details'),
                  getComp: (cb) => cb(import('project/pages/test-plan/auto-test-plan-detail')),
                },
              ],
            },
            {
              path: 'data-source',
              tabs: AUTO_TEST_TABS,
              layout: { fullHeight: true },
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/data-source')),
            },
            {
              path: 'testEnv',
              ignoreTabQuery: true,
              getComp: (cb) => cb(import('project/pages/test-env/test-env'), 'AutoTestEnv'),
              tabs: AUTO_TEST_TABS,
            },
          ],
        },
        {
          path: 'code-coverage',
          breadcrumbName: i18n.t('project:code coverage statistics'),
          routes: [
            {
              getComp: (cb) => cb(import('project/pages/test-plan/code-coverage')),
            },
          ],
        },
        {
          path: 'service',
          breadcrumbName: i18n.t('project:addon'),
          layout: { fullHeight: true },
          getComp: (cb) => cb(import('project/pages/addon/addon-category'), 'AddonCategory'),
        },
        {
          path: 'resource',
          breadcrumbName: i18n.t('resource summary'),
          getComp: (cb) => cb(import('project/pages/resource')),
        },
        {
          path: 'setting',
          breadcrumbName: `${i18n.t('project setting')}`,
          layout: { fullHeight: true },
          getComp: (cb) => cb(import('project/pages/settings')),
        },
        getAppRouter(),
        {
          path: 'perm',
          pageName: i18n.t('role permissions description'),
          layout: { showSubSidebar: false, fullHeight: true },
          getComp: (cb) => cb(import('user/common/perm-editor/perm-editor'), 'PermEditor'),
        },
      ],
    },
  ];
}

export default getProjectRouter;