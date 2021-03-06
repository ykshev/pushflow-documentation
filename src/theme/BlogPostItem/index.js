/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function BlogPostItem(props) {
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const { siteConfig = {} } = useDocusaurusContext();
  const {
    url: siteUrl,
  } = siteConfig;

  const { date, permalink, tags, readingTime } = metadata;
  const { author, title, image } = frontMatter;

  const authorURL = frontMatter.author_url || frontMatter.authorURL;
  const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  const authorImageURL =
    frontMatter.author_image_url || frontMatter.authorImageURL;
  const imageUrl = useBaseUrl(image, { absolute: true });

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    const match = date.substring(0, 10).split('-');
    const year = match[0];
    const month = MONTHS[parseInt(match[1], 10) - 1];
    const day = parseInt(match[2], 10);

    return (
      <header>
        <TitleHeading
          className={clsx('margin-bottom--sm', styles.blogPostTitle)}>
          {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
        </TitleHeading>
        <div className="margin-vert--md">
          <time dateTime={date} className={styles.blogPostDate}>
            {month} {day}, {year}{' '}
            {readingTime && <> · {Math.ceil(readingTime)} min read</>}
          </time>
        </div>
        <div className="avatar margin-vert--md">
          {authorImageURL && (
            <a
              className="avatar__photo-link avatar__photo"
              href={authorURL}
              target="_blank"
              rel="noreferrer noopener">
              <img src={authorImageURL} alt={author} />
            </a>
          )}
          <div className="avatar__intro">
            {author && (
              <>
                <h4 className="avatar__name">
                  <a href={authorURL} target="_blank" rel="noreferrer noopener">
                    {author}
                  </a>
                </h4>
                <small className="avatar__subtitle">{authorTitle}</small>
              </>
            )}
          </div>
        </div>
      </header>
    );
  };
  const isRu = permalink && permalink.includes('ru');
  const renderSignup = () => {
    if (isRu) {
      return <div className={clsx('margin-top--xl', styles.blogPostSignup)}>
        {/* <img src={useBaseUrl('/img/handbg.svg')} /> */}
        <h2>Регистрируйся в Pushflow</h2>
        <p>Pushflow помогает арбитражникам и вебмастерам собирать свою базу пуш уведомлений</p>
        <a href="/app/signup" className="button button--primary">Попробуй 14 дней бесплатно</a>
      </div>
    } else {
      return <div className={clsx('margin-top--xl', styles.blogPostSignup)}>
        {/* <img src={useBaseUrl('/img/handbg.svg')} /> */}
        <h2>Sign up</h2>
        <p>Pushflow helps affiliates and webmasters build their own push notification database</p>
        <a href="/app/signup" className="button button--primary">Try 14 days for free</a>
      </div>
    }
  }
  return (
    <>
      <Head>
        {image && <meta property="og:image" content={imageUrl} />}
        {image && <meta property="twitter:image" content={imageUrl} />}
        {image && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && (
          <meta property="og:url" content={siteUrl + permalink} />
        )}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
        {isRu ? <html lang="ru" /> : <html lang="en" />}
        {isRu ? <meta property="og:locale" content="ru_RU" /> : <meta property="og:locale" content="en_US" />}
      </Head>

      <article className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}>
        {renderPostHeader()}
        <section className="markdown">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </section>
        {(tags.length > 0 || truncated) && (
          <footer className="row margin-vert--lg">
            {tags.length > 0 && (
              <div className="col">
                <strong>Tags:</strong>
                {tags.map(({ label, permalink: tagPermalink }) => (
                  <Link
                    key={tagPermalink}
                    className="margin-horiz--sm"
                    to={tagPermalink}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
            {truncated && (
              <div className="col text--right">
                <Link
                  to={metadata.permalink}
                  aria-label={`Read more about ${title}`}>
                  <strong>Read More</strong>
                </Link>
              </div>
            )}
          </footer>
        )}
        {isBlogPostPage && renderSignup()}
      </article>
    </>
  );
}

export default BlogPostItem;
