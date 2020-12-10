import { observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

type SerializedStore = {
  mobxData: string;
};

export class Store {
  @observable mobxData: string | undefined;

  hydrate(serializedStore: SerializedStore) {
    this.mobxData = serializedStore.mobxData ?? undefined;
  }
}

export default new Store;

export async function fetchInitialStoreState() {
  return {
    mobxData: 'test data'
  };
}