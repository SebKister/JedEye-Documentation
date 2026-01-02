import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="JedEye Documentation">
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: 'var(--ifm-color-primary)'
      }}>
        JedEye
      </main>
    </Layout>
  );
}
