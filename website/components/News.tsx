import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import { uiColors } from "@leafygreen-ui/palette";
import { Overline, Subtitle, H2 } from '@leafygreen-ui/typography';

const newsContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 24px;
`

interface UpdateProps {
  date: string;
  story: string;
  path?: string;
  href?: string;
}

function Update({ date, story, path, href }: UpdateProps) {
  const { push } = useRouter();
  let renderedStory: React.ReactElement | null;

  if (path) {
    renderedStory = (
      <Subtitle
        className={css`
          cursor: pointer;
        `}
        onClick={() => push(path)}
      >
        {story}
      </Subtitle>
    );
  } else {
    renderedStory = (
      <Subtitle
        className={css`
          cursor: pointer;
        `}
        href={href}
      >
        {story}
      </Subtitle>
    );
  }

  return (
    <div
      className={css`
        margin-top: 28px;
      `}
    >
      <Overline className={css`color: ${uiColors.gray.dark1}`}>{date}</Overline>
      {renderedStory}
    </div>
  );
}

function News() {
  return (
    <div
      className={newsContainer}
    >
      <H2>What's New</H2>
      <Update
        date="December 8, 2020"
        story="Copyable v1.0.0 – @leafygreen-ui/copyable"
        path="/component/copyable/example"
      />
      <Update
        date="December 2, 2020"
        story="Support for React 17"
        href="https://github.com/mongodb/leafygreen-ui/commit/c18f16e6632a6688e771334fd1672c9ef7e0f9b4"
      />
      <Update
        date="November 29, 2020"
        story="Installing LeafyGreen in Figma"
        path=""
      />

    </div>
  );
}

News.displayName = 'News';

export default News;
