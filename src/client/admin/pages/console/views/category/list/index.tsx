import React from 'react';

import { useHistory } from 'react-router-dom';

import PageHeaderStyled from '@/client/admin/components/page-header';

const CategoryList = () => {
  const history = useHistory();

  return (
    <div>
      <PageHeaderStyled
        onBack={history.goBack}
        title="分类列表"
      />
    </div>
  );
};

export default React.memo(CategoryList);
