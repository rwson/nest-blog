import React from 'react';

import { useHistory } from 'react-router-dom';

import PageHeaderStyled from '@/client/admin/components/page-header';

const ArticleList = () => {
  const history = useHistory();

  return (
    <div>
      <PageHeaderStyled onBack={history.goBack} title="文章列表" />
    </div>
  );
};

export default React.memo(ArticleList);
