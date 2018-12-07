import ContentLoader from 'react-content-loader';
import React from 'react';

const AuthorLoader = () => (
  <ContentLoader width={760} height={495} style={{
    width: '760px',
    height: '495px'
  }}>
    <rect x="0" y="20" width="300" height="30"></rect>
    <rect x="0" y="55"  width="200" height="20"></rect>
    <rect x="0" y="95"  width="760" height="400"></rect>
  </ContentLoader>
)

export default AuthorLoader;