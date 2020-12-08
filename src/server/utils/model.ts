import { MONGODB } from '@/server/config';

export default {
  getProviderByModel(model: any) {
    return {
      useValue: model,
      provide: `${model.modelName}${MONGODB.token}`
    };
  }
};


