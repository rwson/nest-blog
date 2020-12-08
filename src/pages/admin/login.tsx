import 'antd/dist/antd.css';

import { noSSRWithLoadingDynamic } from '@/client/admin/util/loading';

export default noSSRWithLoadingDynamic(import('@/client/admin/pages/login/index'));