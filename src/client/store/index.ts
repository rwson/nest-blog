import { observable, action } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

type SerializedStore = {
  mobxData: string;
};

export class Store {
  @observable
  mobxData: string | undefined;

  @action
  hydrate(serializedStore: SerializedStore) {
    this.mobxData = serializedStore.mobxData ?? undefined;
  }

  @action
  changeData(data: string) {
    this.mobxData = data;
  }
}

export default new Store();

export async function fetchInitialStoreState() {
  return {
    mobxData: 'test data',
  };
}
