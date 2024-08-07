import dynamic from 'next/dynamic';

const BlockNavigationNoSSR = dynamic(() => import('./BlockNavigation'), { ssr: false });

const NoSSR = () => {
  return <BlockNavigationNoSSR />;
};

export default NoSSR;
