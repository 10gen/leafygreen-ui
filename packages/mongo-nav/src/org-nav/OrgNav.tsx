import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu } from '@leafygreen-ui/menu';
import { OrgNavLink, OnPremUserMenu } from '../helpers/index';
import { breakpoints, facepaint } from '../breakpoints';
import {
  AccountInterface,
  OrganizationInterface,
  Product,
  URLSInterface,
  NavElement,
  CurrentOrganizationInterface,
  HostsInterface,
  OrgPaymentLabel,
} from '../types';
import { OrgSelect } from '../mongo-select/index';
import UserMenu from '../user-menu/index';
import { useOnElementClick } from '../on-element-click-provider/index';

export const orgNavHeight = 60;

const navContainer = css`
  height: ${orgNavHeight}px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${uiColors.gray.dark3};
  border-bottom: 1px solid ${uiColors.gray.light2};
  box-sizing: border-box;
  z-index: 1;
  position: relative;
  background-color: white;
`;

const orgSelectContainer = css`
  margin-left: 20px;
  margin-right: 20px;
`;

const disabledOrgSelect = css`
  cursor: default;
  pointer-events: none;
`;

const supportContainer = css`
  ${facepaint({
    marginRight: ['16px', '16px', '24px'],
    marginLeft: ['16px', '16px', '24px'],
  })}
`;

const rightLinkMargin = css`
  ${facepaint({
    marginRight: ['16px', '16px', '24px'],
  })}
`;

const accessManagerMenuContainer = css`
  padding: 16px;
  width: 220px;
  background-color: white;
  text-align: left;
`;

const accessManagerMenuItem = css`
  font-size: 14px;
  color: ${uiColors.gray.dark2};
  line-height: 19.6px;
  margin-top: 0px;
  margin-bottom: 0px;
  text-decoration: none;
  display: block;
`;

const versionStyle = css`
  color: ${uiColors.green.base};
  display: inline-block;
  font-size: 10px;
  ${facepaint({
    marginRight: ['16px', '16px', '16px'],
  })}
`;

export const Colors = {
  Lightgray: 'lightgray',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
} as const;

export type Colors = typeof Colors[keyof typeof Colors];

const paymentStatusMap: { readonly [K in Colors]: Array<string> } = {
  [Colors.Lightgray]: [
    OrgPaymentLabel.Embargoed,
    OrgPaymentLabel.EmbargoConfirmed,
  ],
  [Colors.Green]: [OrgPaymentLabel.Ok],
  [Colors.Yellow]: [
    OrgPaymentLabel.Warning,
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Closing,
  ],
  [Colors.Red]: [
    OrgPaymentLabel.Dead,
    OrgPaymentLabel.AdminSuspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.Closed,
  ],
};

interface OrgNav {
  account?: AccountInterface;
  activeProduct: Product;
  current?: CurrentOrganizationInterface;
  data?: Array<OrganizationInterface>;
  constructOrganizationURL: (orgID: string) => string;
  urls: Required<URLSInterface>;
  activeNav?: NavElement;
  onOrganizationChange: React.ChangeEventHandler;
  admin: boolean;
  hosts: Required<HostsInterface>;
  currentProjectName?: string;
  onPremEnabled?: boolean;
  onPremVersion?: string;
  onPremMFA?: boolean;
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
  onPremEnabled,
  onPremVersion,
  onPremMFA = false,
}: OrgNav) {
  const [accessManagerOpen, setAccessManagerOpen] = useState(false);
  const [onPremMenuOpen, setOnPremMenuOpen] = useState(false);
  const onElementClick = useOnElementClick();
  const { orgNav } = urls;
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;
  const isMobile = viewportWidth < breakpoints.small;
  const disabled = activeNav === NavElement.UserSettings;

  let paymentVariant: Colors | undefined;
  let key: Colors;

  for (key in paymentStatusMap) {
    if (!current?.paymentStatus) {
      paymentVariant = undefined;
    } else if (paymentStatusMap[key].includes(current?.paymentStatus)) {
      paymentVariant = key;
    }
  }

  const paymentValues: Array<OrgPaymentLabel> = [
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.AdminSuspended,
  ];

  let badgeItem: React.ReactElement | null = null;

  if (
    !isTablet &&
    !onPremEnabled &&
    current?.paymentStatus &&
    paymentVariant &&
    (admin || paymentValues.includes(current.paymentStatus))
  ) {
    const badgeMargin = css`
      margin-right: 25px;
    `;

    badgeItem = (
      <Badge
        className={badgeMargin}
        variant={paymentVariant}
        data-testid="org-nav-payment-status"
      >
        {current.paymentStatus.split('_').join()}
      </Badge>
    );
  }

  const renderedUserMenu = onPremEnabled ? (
    <OnPremUserMenu
      name={account?.firstName ?? ''}
      open={onPremMenuOpen}
      setOpen={setOnPremMenuOpen}
      urls={urls}
      mfa={onPremMFA}
    />
  ) : (
    <UserMenu
      account={account}
      activeProduct={activeProduct}
      urls={urls}
      hosts={hosts}
    />
  );

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
      <Tooltip
        align="bottom"
        justify="start"
        variant="dark"
        usePortal={false}
        trigger={
          <a
            href="/"
            onClick={e => onElementClick(NavElement.OrgNavLeaf, e)}
            data-testid="org-nav-leaf"
          >
            <LogoMark height={30} />
          </a>
        }
      >
        View the Organization Home
      </Tooltip>

      <OrgSelect
        className={cx(orgSelectContainer, { [disabledOrgSelect]: disabled })}
        data={data}
        current={current}
        constructOrganizationURL={constructOrganizationURL}
        urls={urls}
        onChange={onOrganizationChange}
        isActive={activeNav === NavElement.OrgNavOrgSettings}
        loading={!current}
        disabled={disabled}
        isOnPrem={onPremEnabled}
      />

      {!disabled && (
        <>
          {badgeItem}

          {!isMobile && (
            <>
              <OrgNavLink
                href={current && orgNav.accessManager}
                isActive={activeNav === NavElement.OrgNavAccessManager}
                loading={!current}
                data-testid="org-nav-access-manager"
                onClick={e => onElementClick(NavElement.OrgNavAccessManager, e)}
              >
                Access Manager
              </OrgNavLink>

              <IconButton
                ariaLabel="Dropdown"
                active={accessManagerOpen}
                disabled={!current}
                onClick={(e: React.MouseEvent) => {
                  onElementClick(NavElement.OrgNavDropdown, e);
                  setAccessManagerOpen(curr => !curr);
                }}
                data-testid="org-nav-dropdown"
              >
                <Icon glyph={accessManagerOpen ? 'CaretUp' : 'CaretDown'} />

                {current && (
                  <Menu
                    open={accessManagerOpen}
                    setOpen={setAccessManagerOpen}
                    usePortal={false}
                    className={accessManagerMenuContainer}
                  >
                    <a
                      className={accessManagerMenuItem}
                      href={orgNav.accessManager}
                      data-testid="org-nav-dropdown-org-access-manager"
                      onClick={e =>
                        onElementClick(
                          NavElement.OrgNavDropdownOrgAccessManager,
                          e,
                        )
                      }
                    >
                      <strong>Organization Access:</strong> {current.orgName}
                    </a>

                    <a
                      className={accessManagerMenuItem}
                      href={urls.projectNav.accessManager}
                      data-testid="org-nav-dropdown-project-access-manager"
                      onClick={e =>
                        onElementClick(
                          NavElement.OrgNavDropdownProjectAccessManager,
                          e,
                        )
                      }
                    >
                      <strong>Project Access: </strong>
                      {currentProjectName ?? 'None'}
                    </a>
                  </Menu>
                )}
              </IconButton>

              <OrgNavLink
                href={current && orgNav.support}
                isActive={activeNav === NavElement.OrgNavSupport}
                loading={!current}
                className={supportContainer}
                data-testid="org-nav-support"
                onClick={e => onElementClick(NavElement.OrgNavSupport, e)}
              >
                Support
              </OrgNavLink>

              {!onPremEnabled && (
                <OrgNavLink
                  href={current && orgNav.billing}
                  isActive={activeNav === NavElement.OrgNavBilling}
                  loading={!current}
                  data-testid="org-nav-billing"
                  onClick={e => onElementClick(NavElement.OrgNavBilling, e)}
                >
                  Billing
                </OrgNavLink>
              )}
            </>
          )}
        </>
      )}

      <div
        className={css`
          margin-left: auto;
        `}
      >
        {onPremEnabled && onPremVersion && (
          <span className={versionStyle} data-testid="org-nav-on-prem-version">
            {onPremVersion}
          </span>
        )}

        {!isMobile && (
          <OrgNavLink
            href={orgNav.allClusters}
            isActive={activeNav === NavElement.OrgNavAllClusters}
            className={rightLinkMargin}
            data-testid="org-nav-all-clusters-link"
            onClick={e => onElementClick(NavElement.OrgNavAllClusters, e)}
          >
            All Clusters
          </OrgNavLink>
        )}

        {!isTablet && admin && !onPremEnabled && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === NavElement.OrgNavAdmin}
            className={rightLinkMargin}
            data-testid="org-nav-admin-link"
          >
            Admin
          </OrgNavLink>
        )}
      </div>

      {renderedUserMenu}
    </nav>
  );
}
