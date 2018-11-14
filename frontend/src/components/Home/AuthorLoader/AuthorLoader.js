import ContentLoader from 'react-content-loader';
import React from 'react';
import classes from './AuthorLoader.module.css';

const AuthorLoader = () => (
  <ContentLoader width={120} height={150} className={classes.container}>
    <rect x="0" y="0" width="120" height="120"></rect>
    <rect x="0" y="125"  width="120" height="20"></rect>
  </ContentLoader>
)

export default AuthorLoader;