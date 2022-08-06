'use babel';

import MenangDongSlotView from './menang-dong-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  menangDongSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.menangDongSlotView = new MenangDongSlotView(state.menangDongSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.menangDongSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'menang-dong-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.menangDongSlotView.destroy();
  },

  serialize() {
    return {
      menangDongSlotViewState: this.menangDongSlotView.serialize()
    };
  },

  toggle() {
    console.log('MenangDongSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
