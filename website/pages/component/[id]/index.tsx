import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { css } from 'emotion';
import { GridContainer, GridItem } from '../../../components/grid/Grid';
import Navigation from '../../../components/navigation/Navigation';
import Header from '../../../components/layout/Header';
import markdownToHtml from '../../../utils/markdownToHtml';
import { BaseLayoutProps } from '../../../utils/types';

const containerStyle = css`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const topMargin = css`
  margin-top: 36px;
`;

export default function Component({
  component,
  changelog,
  readme,
}: BaseLayoutProps) {
  console.log(component, changelog, readme);
  return (
    <div className={containerStyle}>
      <Navigation />

      <GridContainer justify="flex-start">
        <GridItem md={6} lg={8}>
          <div className={topMargin}>
            <Header
              component={component}
              changelog={changelog}
              readme={readme}
            />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { props: {} };
  }

  const { id } = params;

  let changelogMarkdown: Buffer, readme: string;

  if (typeof id === 'string') {
    const getFileContent = util.promisify(fs.readFile);
    changelogMarkdown = await getFileContent(
      path.join('../packages', id, 'changelog.md'),
    );

    readme = await getFileContent(
      path.join('../packages', id, 'README.md'),
      'utf-8',
    );
  }

  const changelog = await markdownToHtml(changelogMarkdown);

  return {
    props: {
      changelog,
      readme,
      component: id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const packages = fs.readdirSync('../packages');

  const paths = packages.map(folderName => ({
    params: {
      id: folderName,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
