import React from 'react';

import { inject, observer } from 'mobx-react';

import ArticleDetail from '@/client/blog/pages/article/detail';

@inject('store')
@observer
class ArticleDetailPage extends React.Component<any> {
  render() {
    console.log(this.props.store.count);
    return (
      <>
        <ArticleDetail store={this.props.store} />
      </>
    );
  }
}

export default ArticleDetailPage;