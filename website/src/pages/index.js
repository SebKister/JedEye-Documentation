import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="JedEye Documentation">
      <main>
        <img
          src={useBaseUrl('/img/3.jpeg')}
          alt="JedEye"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </main>
    </Layout>
  );
}
