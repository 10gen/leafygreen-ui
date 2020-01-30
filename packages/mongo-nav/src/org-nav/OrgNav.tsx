import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu } from '@leafygreen-ui/menu';
import {
  AccountInterface,
  OrganizationInterface,
  Product,
  URLSInterface,
  NavItem,
  CurrentOrganizationInterface,
  HostsInterface,
} from '../types';

import MongoSelect from '../mongo-select/index';
import MongoMenu from '../mongo-menu/index';

const navContainer = css`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${uiColors.gray.dark3};
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const leftSideContainer = css`
  display: flex;
  align-items: center;
`;

const orgSelectContainer = css`
  margin-left: 20px;
  margin-right: 20px;
`;

const ulContainer = css`
  list-style: none;
  display: flex;
  align-items: center;
  padding-inline-start: 0px;
`;

const linkText = css`
  text-decoration: none;
  color: ${uiColors.gray.dark3};
`;

const activeLink = css`
  font-weight: bold;
  color: ${uiColors.green.base};
`;

const supportContainer = css`
  margin-left: 30px;
  margin-right: 30px;
`;

const rightSideLinkStyle = css`
  margin-right: 30px;
`;

const accessManagerMenuContainer = css`
  padding: 16px;
  width: 220px;
`;

const accessManagerMenuItem = css`
  font-size: 14px;
  color: ${uiColors.gray.dark1};
  line-height: 19.6px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const Colors = {
  Lightgray: 'lightgray',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
} as const;

export type Colors = typeof Colors[keyof typeof Colors];

const paymentStatusMap: { readonly [K in Colors]: Array<string> } = {
  [Colors.Lightgray]: ['embargoed', 'embargo confirmed'],
  [Colors.Green]: ['ok'],
  [Colors.Yellow]: ['warning', 'suspended', 'closing'],
  [Colors.Red]: ['dead', 'locked', 'closed'],
};

interface OrgNav {
  account: AccountInterface;
  activeProduct: Product;
  current: CurrentOrganizationInterface;
  data: Array<OrganizationInterface>;
  constructOrganizationURL: (orgID: string) => string;
  urls: Required<URLSInterface>;
  activeNav?: NavItem;
  onOrganizationChange: React.ChangeEventHandler;
  admin: boolean;
  hosts: Required<HostsInterface>;
  currentProjectName?: string;
}

export default function OrgNav({
  account,
  activeNav,
  activeProduct,
  current,
  data,
  constructOrganizationURL,
  onOrganizationChange,
  urls,
  admin,
  hosts,
  currentProjectName,
}: OrgNav) {
  const [open, setOpen] = useState(false);
  const { orgNav } = urls;

  let variant: Colors | undefined;
  let key: Colors;

  for (key in paymentStatusMap) {
    if (!current.paymentStatus) {
      variant = undefined;
    } else if (paymentStatusMap[key].includes(current?.paymentStatus)) {
      variant = key;
    }
  }

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
      <div className={leftSideContainer}>
        <LogoMark height={30} />
        <MongoSelect
          className={orgSelectContainer}
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          variant="organization"
          urls={urls}
          onChange={onOrganizationChange}
          isActive={activeNav === 'orgSettings'}
        />
        <ul className={ulContainer}>
          {variant && current.paymentStatus && (
            <li>
              <Badge
                className={css`
                  margin-right: 25px;
                `}
                variant={variant}
              >
                {current.paymentStatus.toUpperCase()}
              </Badge>
            </li>
          )}
          <li
            role="none"
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a
                  href={orgNav.accessManager}
                  className={cx(linkText, {
                    [activeLink]: activeNav === 'accessManager',
                  })}
                >
                  Access Manager
                </a>
              }
            >
              Organization Access Manager
            </Tooltip>
            <Menu
              open={open}
              setOpen={setOpen}
              trigger={
                <IconButton ariaLabel="Dropdown">
                  <Icon glyph={open ? 'CaretUp' : 'CaretDown'} />
                </IconButton>
              }
              className={accessManagerMenuContainer}
            >
              <p className={accessManagerMenuItem}>
                <strong>Organization Access:</strong> {current.orgName}
              </p>
              <p className={accessManagerMenuItem}>
                <strong>Project Access:</strong> {currentProjectName ?? 'None'}
              </p>
            </Menu>
          </li>
          <li role="none" className={supportContainer}>
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a
                  href={orgNav.support}
                  className={cx(linkText, {
                    [activeLink]: activeNav === 'support',
                  })}
                >
                  Support
                </a>
              }
            >
              Organization Support
            </Tooltip>
          </li>
          <li role="none">
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a
                  href={orgNav.billing}
                  className={cx(linkText, {
                    [activeLink]: activeNav === 'billing',
                  })}
                >
                  Billing
                </a>
              }
            >
              Billing
            </Tooltip>
          </li>
        </ul>
      </div>
      <div>
        <Tooltip
          align="bottom"
          justify="middle"
          variant="dark"
          trigger={
            <a
              href={orgNav.allClusters}
              className={cx(rightSideLinkStyle, linkText, {
                [activeLink]: activeNav === 'allClusters',
              })}
            >
              All Clusters
            </a>
          }
        >
          View All Clusters
        </Tooltip>

        {admin && (
          <a
            href={orgNav.admin}
            className={cx(rightSideLinkStyle, linkText, {
              [activeLink]: activeNav === 'admin',
            })}
          >
            Admin
          </a>
        )}
        <MongoMenu
          account={account}
          activeProduct={activeProduct}
          urls={urls}
          hosts={hosts}
        />
      </div>
    </nav>
  );
}
