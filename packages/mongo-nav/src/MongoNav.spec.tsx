import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import { dataFixtures } from './data';
import MongoNav from './MongoNav';

// types
interface ExpectedElements {
  [key: string]: nullableElement;
}

describe('packages/mongo-nav', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId });
    setExpectedElements();
  };

  const setExpectedElements = () => {
    const { queryByTestId = () => null } = queries;
    expectedElements.orgNav = queryByTestId('organization-nav');
    expectedElements.projectNav = queryByTestId('project-nav');
    expectedElements.admin = queryByTestId('org-nav-admin-link');
    expectedElements.billing = queryByTestId('org-nav-billing');
    expectedElements.activityFeed = queryByTestId('project-nav-activity-feed');
    expectedElements.currentOrg = queryByTestId('org-select-active-org');
    expectedElements.currentProject = queryByTestId(
      'project-select-active-project',
    );
    expectedElements.userMenu = queryByTestId('user-menu-trigger');
  };

  let onOrganizationChange: jest.Mock;
  let onProjectChange: jest.Mock;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    onOrganizationChange = jest.fn();
    onProjectChange = jest.fn();
    fetchMock = jest.fn();
    window.fetch = fetchMock;
  });

  afterEach(() => {
    delete window.fetch;
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    setQueries(
      render(
        <MongoNav
          activeProduct="cloud"
          onOrganizationChange={onOrganizationChange}
          onProjectChange={onProjectChange}
          {...props}
        />,
      ),
    );
  };

  describe('by default', () => {
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(dataFixtures),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      renderComponent();

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('the organization nav is rendered', () => {
      const organizationNav = expectedElements['orgNav'];
      expect(organizationNav).toBeInTheDocument();
    });

    test('the project nav is rendered', () => {
      const projectNav = expectedElements['projectNav'];
      expect(projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on data returned from fetch', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${dataFixtures?.currentOrganization?.orgId}/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on data returned from fetch', () => {
      const currentOrg = expectedElements['currentOrg'];
      expect(
        currentOrg?.innerHTML.includes(
          dataFixtures?.currentOrganization?.orgName as string,
        ),
      ).toBe(true);
    });

    test('current projectId is set based on data returned from fetch', () => {
      const activityFeed = expectedElements['activityFeed'];
      expect((activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${dataFixtures?.currentProject?.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on data returned from fetch', () => {
      const currentProject = expectedElements['currentProject'];

      expect(
        currentProject?.innerHTML.includes(
          dataFixtures?.currentProject?.projectName as string,
        ),
      ).toBe(true);
    });

    test('user is set based on data returned from fetch', () => {
      const userMenu = expectedElements['userMenu'];
      expect(userMenu?.innerHTML.includes('DevMode')).toBe(true);
    });
  });

  describe('when activeProjectId is supplied', () => {
    const newActiveProject = dataFixtures.projects[0];
    const activeProjectId = newActiveProject.projectId;
    const expectedPostData = {
      ...dataFixtures,
      currentProject: { ...newActiveProject },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      renderComponent({ activeProjectId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('the organization nav is rendered', () => {
      const organizationNav = expectedElements['orgNav'];
      expect(organizationNav).toBeInTheDocument();
    });

    test('the project nav is rendered', () => {
      const projectNav = expectedElements['projectNav'];
      expect(projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on the new activeProjectId', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      const activityFeed = expectedElements['activityFeed'];
      expect((activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      const currentProject = expectedElements['currentProject'];
      expect(
        currentProject?.innerHTML.includes(newActiveProject.projectName),
      ).toBe(true);
    });
  });

  describe('when activeOrgId is supplied', () => {
    const newActiveOrg = dataFixtures.organizations[1];
    const activeOrgId = newActiveOrg.orgId;
    const expectedPostData = {
      ...dataFixtures,
      currentOrganization: { ...newActiveOrg },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      renderComponent({ activeOrgId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('the organization nav is rendered', () => {
      const organizationNav = expectedElements['orgNav'];
      expect(organizationNav).toBeInTheDocument();
    });

    test('the project nav is rendered', () => {
      const projectNav = expectedElements['projectNav'];
      expect(projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on the new activeOrgId', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveOrg.orgId}/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on the new activeOrgId', () => {
      const currentOrg = expectedElements['currentOrg'];
      expect(currentOrg?.innerHTML.includes(newActiveOrg.orgName)).toBe(true);
    });
  });

  describe('when activeProjectId and activeOrgID are both supplied', () => {
    const newActiveOrg = dataFixtures.organizations[1];
    const newActiveProject = dataFixtures.projects[0];

    const activeProjectId = newActiveProject.projectId;
    const activeOrgId = newActiveOrg.orgId;

    const expectedPostData = {
      ...dataFixtures,
      currentProject: { ...newActiveProject },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      renderComponent({ activeOrgId, activeProjectId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('current orgId is set based on the new activeProjectId', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      const activityFeed = expectedElements['activityFeed'];
      expect((activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      const currentProject = expectedElements['currentProject'];
      expect(
        currentProject?.innerHTML.includes(newActiveProject.projectName),
      ).toBe(true);
    });
  });

  describe('when user passes host override', () => {
    const cloudHost = 'https://cloud-dev.mongodb.com';
    beforeEach(() =>
      renderComponent({ mode: 'dev', hosts: { cloud: cloudHost } }),
    );

    test('link is properly constructured based on host override prop', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/${dataFixtures.currentOrganization?.orgId}/billing/overview`,
      );
    });
  });

  describe('when user passes url override', () => {
    const activityFeedHref = 'https://cloud.mongodb.com/activityfeed-test-url';
    beforeEach(() =>
      renderComponent({
        mode: 'dev',
        urls: { projectNav: { activityFeed: activityFeedHref } },
      }),
    );

    test('link is properly constructured based on host override prop', () => {
      const activityFeed = expectedElements['activityFeed'];
      expect((activityFeed as HTMLAnchorElement).href).toBe(activityFeedHref);
    });
  });
});
