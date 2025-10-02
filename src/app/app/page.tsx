import React, { Suspense } from 'react';

const AppPage = () => {
  return(
    <Suspense fallback={<div className='h-screen-header'></div>}>

    </Suspense>
  )
};

export default AppPage;
