'use client';

import BlogLayout from '../_components/BlogLayout';

export default function BlogPost() {
  return (
    <BlogLayout
      metadata={{
        title: 'OpenClaw Chronicles',
        description: 'Evolving AI Agents',
        date: '2026-03-31',
        image: '/blog-assets/default.png',
        slug: 'mutation-001-smb-swarm',
      }}
      header={{
        category: 'Mutation Log // Part 01',
        hash: 'mutation-001-smb-swarm',
        readTime: '7 min read',
        title: 'OpenClaw Chronicles',
        subtitle: 'Evolving the Future of Agents',
        description: 'Evolving AI Agents',
        image: '/blog-assets/default.png',
      }}
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
