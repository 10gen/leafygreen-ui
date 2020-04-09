# Mongo Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-nav.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/mongo-nav @leafygreen-ui/leafygreen-provider@1.1.0
```

### NPM

```shell
npm install @leafygreen-ui/mongo-nav @leafygreen-ui/leafygreen-provider@1.1.0
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
<MongoNav
  mode="dev"
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```

## Properties

| Prop                       | Type                                                                            | Description                                                                                                                                                                                                                                                                                                                              | Default                                                   |
| -------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `activeProduct`            | `'account', 'charts', 'cloud', 'realm', 'support', 'university'`                | Describes what product is currently active                                                                                                                                                                                                                                                                                               |                                                           |
| `activeNav`                | `ActiveNavElement` (see below for possible values)                              | Determines what nav item is currently active                                                                                                                                                                                                                                                                                             |                                                           |
| `admin`                    | `boolean`                                                                       | Describes whether or not user is an `admin`                                                                                                                                                                                                                                                                                              | `false`                                                   |
| `mode`                     | `production` or `dev`                                                           | Describes what environment the component is being used in, defaults to `production`                                                                                                                                                                                                                                                      | `production`                                              |
| `onOrganizationChange`     | `({value: string, setData: Function, event: React.ChangeEvent}) => void`        | Callback invoked when user types in the OrgSelect filter box. The function receives an object as its argument with three keys. The first is the current value of the filter box, the second is a Function that allows the consumer to control what data is rendered based on the current search, and the final is the `ChangeEvent`.     |                                                           |
| `onProjectChange`          | `({value: string, setData: Function, event: React.ChangeEvent}) => void`        | Callback invoked when user types in the ProjectSelect filter box. The function receives an object as its argument with three keys. The first is the current value of the filter box, the second is a Function that allows the consumer to control what data is rendered based on the current search, and the final is the `ChangeEvent`. |
| `constructOrganizationURL` | `(Organization) => string`                                                      | Function to determine destination URL when user selects an organization from the organization picker, see also `hosts`                                                                                                                                                                                                                   | `(org) => '${hosts.cloud}/v2#/org/${org.orgId}/projects'` |
| `constructProjectURL`      | `(Project) => string`                                                           | Function to determine destination URL when user selects a project from the project picker, see also `hosts`                                                                                                                                                                                                                              | `(project) => '${hosts.cloud}/v2#/${project.projectId}'`  |
| `showProjectNav`           | `boolean`                                                                       | Determines whether the project navigation should be shown                                                                                                                                                                                                                                                                                | `true`                                                    |
| `hosts`                    | `{cloud: '', realm: '', charts: '', account: '', university: '', support: ''}`  | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments                                                                                                                                                                                |
| `urls`                     | `URLInterface` (see below for type)                                             | Object to enable custom overrides for every `href` used in `<MongoNav />`                                                                                                                                                                                                                                                                |
| `onError`                  | `(ErrorCode) => {}`,                                                            | Function that is passed an error code as a string, so that consuming application can handle fetch failures                                                                                                                                                                                                                               | `() => {}`                                                |
| `onSuccess`                | `(response) => {}`                                                              | Callback that receives the response of the fetched data, having been converted from JSON into an object                                                                                                                                                                                                                                  | `() => {}`                                                |
| `onPrem`                   | `{enabled: boolean, mfa: boolean, version: string}`                             | onPrem config object with three keys: enabled, version and mfa                                                                                                                                                                                                                                                                           | `{enabled: false, mfa: false, version: ''}`               |
| `onPrem.enabled`           | `boolean`                                                                       | Determines whether or not a user is onPrem                                                                                                                                                                                                                                                                                               | `false`                                                   |
| `onPrem.mfa`               | `boolean`                                                                       | Determines if an onPrem user has multi-factor authentication enabled                                                                                                                                                                                                                                                                     | `false`                                                   |
| `onPrem.version`           | `string`                                                                        | Describes the version of Ops Manager that an `onPrem` user is using                                                                                                                                                                                                                                                                      | `''`                                                      |
| `activeOrgId`              | `string`                                                                        | ID for active organization, will cause a POST request to cloud to update current active organization.                                                                                                                                                                                                                                    |                                                           |
| `activeProjectId`          | `string`                                                                        | ID for active project, will cause a POST request to cloud to update current active project.                                                                                                                                                                                                                                              |
| `className`                | `string`                                                                        | Applies a className to the root element                                                                                                                                                                                                                                                                                                  |
| `loadData`                 | `boolean`                                                                       | Determines whether or not the component will fetch data from cloud                                                                                                                                                                                                                                                                       | `true`                                                    |
| `onElementClick`           | `(type: 'logout', 'cloud', 'realm', 'charts', event: React.MouseEvent => void)` | Click EventHandler that receives a `type` as its first argument and the associated `MouseEvent` as its second. This prop provides a hook into product link and logout link clicks and allows consuming applications to handle routing internally                                                                                         | `() => {}`                                                |
| `dataFixtures`             | `DataInterface`                                                                 | Allows consumers to control fixture data when in dev mode                                                                                                                                                                                                                                                                                |                                                           |

_Any other properties will be spread on the root element_

### `ActiveNavElement` Values

#### Org Nav Elements

`OrgNavAccessManager`
`OrgNavAdmin`
`OrgNavAllClusters`
`OrgNavBilling`
`OrgNavDropdownOrgAccessManager`
`OrgNavDropdownProjectAccessManager`
`OrgNavOrgSettings`
`OrgNavSupport`

#### Project Nav Elements

`ProjectNavActivityFeed`
`ProjectNavAlerts`
`ProjectNavInvite`
`ProjectNavProjectIntegrations`
`ProjectNavProjectSettings`
`ProjectNavProjectSupport`

#### Cloud User Menu Elements

`UserMenuCloudInvitations`
`UserMenuCloudMFA`
`UserMenuCloudOrganizations`
`UserMenuCloudOther`
`UserMenuCloudUserPreferences`

#### On Prem User Menu Elements

`UserMenuOnPremInvitations`
`UserMenuOnPremOrganizations`
`UserMenuOnPremOther`
`UserMenuOnPremPersonalization`
`UserMenuOnPremProfile`
`UserMenuOnPremPublicApiAccess`
`UserMenuOnPremTwoFactorAuth`

### URLInterface

```typescript
export interface URLSInterface {
  userMenu?: {
    cloud?: {
      userPreferences: string;
      organizations: string;
      invitations: string;
      mfa: string;
    };
    university?: {
      universityPreferences: string;
    };
    support?: {
      userPreferences: string;
    };
    account?: {
      homepage?: string;
    };
    logout?: string;
  };
  mongoSelect?: {
    viewAllProjects?: string;
    viewAllOrganizations?: string;
    newProject?: string;
    orgSettings?: string;
  };
  orgNav?: {
    settings?: string;
    accessManager?: string;
    support?: string;
    billing?: string;
    allClusters?: string;
    admin?: string;
  };
  projectNav?: {
    settings?: string;
    accessManager?: string;
    support?: string;
    integrations?: string;
    alerts?: string;
    activityFeed?: string;
    invite?: string;
    realm?: string;
    charts?: string;
  };
  onPrem?: {
    profile?: string;
    mfa?: string;
    personalization?: string;
    invitations?: string;
    organizations?: string;
    publicApiAccess?: string;
    featureRequest?: string;
  };
}
```
