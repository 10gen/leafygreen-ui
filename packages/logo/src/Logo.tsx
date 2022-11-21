import React from 'react';

import MongoDBLogo from './MongoDBLogo';
import MongoDBLogoMark from './MongoDBLogoMark';
import AtlasNavGraphic from './AtlasNavGraphic';

// Product Family Logo Lockups
import AtlasLogoLockup from './AtlasLogoLockup';
import AtlasForGovernmentLogoLockup from './AtlasForGovernmentLogoLockup';
import RealmLogoLockup from './RealmLogoLockup';
import EnterpriseAdvancedLogoLockup from './EnterpriseAdvancedLogoLockup';
import CommunityEditionLogoLockup from './CommunityEditionLogoLockup';
import UniversityLogoLockup from './UniversityLogoLockup';

import { LogoProps } from './utils';

export const LogoNames = [
  'MongoDBLogoMark',
  'MongoDBLogo',
  'AtlasNavGraphic',
  'AtlasLogoLockup',
  'AtlasForGovernmentLogoLockup',
  'RealmLogoLockup',
  'EnterpriseAdvancedLogoLockup',
  'CommunityEditionLogoLockup',
  'UniversityLogoLockup',
] as const;

export type LogoName = typeof LogoNames[number];

interface GenericLogoProps extends LogoProps {
  /**
   * The name of the logo to render
   * @required
   */
  name: LogoName;
}

/**
 * A generic logo component that accepts a logo name as well as other LogoProps.
 *
 * Note: For performance, it's recommended to import a specific logo explicitly rather than rely on this generic component
 */
export default function GenericLogo({
  name = 'MongoDBLogo',
  ...rest
}: GenericLogoProps) {
  const LogoMap = {
    MongoDBLogo,
    MongoDBLogoMark,
    AtlasNavGraphic,
    AtlasLogoLockup,
    AtlasForGovernmentLogoLockup,
    RealmLogoLockup,
    EnterpriseAdvancedLogoLockup,
    CommunityEditionLogoLockup,
    UniversityLogoLockup,
  };

  const Logo = LogoMap[name];

  return <Logo {...rest} />;
}
