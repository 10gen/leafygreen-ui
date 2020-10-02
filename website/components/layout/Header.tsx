import React from 'react';
import Button from '@leafygreen-ui/button';
import ArrowDownIcon from '@leafygreen-ui/icon/dist/ArrowDown';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { H2 } from '@leafygreen-ui/typography';

function transformComponentName(string) {
  return string
    .replace(/\w*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase())
    .replace('-', ' ');
}

const componentsStyle = css`
  height: 16px;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
}
`;

const marginBotton = css`
  margin-bottom: 36px;
`;

const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface HeaderProps {
  component: string;
  changelog: string;
  readme: string;
}

function Header({ component, changelog, readme }: HeaderProps) {
  if (!component) {
    return null;
  }

  return (
    <div>
      <div className={marginBotton}>
        <small className={componentsStyle}>Components</small>
        <div className={flexContainer}>
          <H2>{transformComponentName(component)}</H2>

          <Button glyph={<ArrowDownIcon />} variant="primary">
            Download Sketch Library
          </Button>
        </div>
      </div>
      <Tabs>
        <Tab name="Live Example">Live Example</Tab>
        <Tab name="Design Guidelines">Design Guidelines</Tab>
        <Tab name="Code Docs">Code docs!</Tab>
      </Tabs>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
