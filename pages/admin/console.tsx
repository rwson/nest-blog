import 'formdata-polyfill';
import { noSSRWithLoadingDynamic } from '@/client/admin/util/loading';

export default noSSRWithLoadingDynamic(
  import('@/client/admin/pages/console/index'),
);
