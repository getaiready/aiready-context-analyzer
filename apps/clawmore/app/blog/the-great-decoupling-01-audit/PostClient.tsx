'use client';

import BlogLayout from '../_components/BlogLayout';

export default function BlogPost() {
  return (
    <BlogLayout
      metadata={{
        title: 'The Great Decoupling: Part 1 - Auditing the Monolith',
        description:
          'How to audit a legacy repository for serverless agentic readiness. Identifying the "Wall" before your AI agent hits it.',
        date: '2026-03-22',
        image: '/blog-assets/the-great-decoupling-01-audit.png',
        slug: 'the-great-decoupling-01-audit',
      }}
      header={{
        category: 'Decoupling // Part 01',
        hash: 'audit',
        readTime: '9 min read',
        title: 'The Great Decoupling',
        subtitle: 'Auditing the Monolith',
        description:
          'How to audit a legacy repository for serverless agentic readiness.',
        image: '/blog-assets/the-great-decoupling-01-audit.png',
      }}
      breadcrumbItems={[
        { label: 'Blog', href: '/blog' },
        {
          label: 'The Great Decoupling',
          href: '/blog/the-great-decoupling-01-audit',
        },
      ]}
    >
      <section>
        <p className="text-zinc-200 leading-relaxed text-lg">
          The contents of this post are being migrated to our unified agentic
          architecture. The local-first philosophy remains our North Star.
        </p>
      </section>
    </BlogLayout>
  );
}
