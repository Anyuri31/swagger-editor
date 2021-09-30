import TopbarPlugin from '../topbar';
import LayoutDefault from './components/LayoutDefault';
// import TopbarPlugin from './components/Topbar'; // todo: proposal to use component directly, w/o plugin
import EditorPane from '../../components/EditorPane';
import EditorTextArea from '../../components/EditorTextArea';
import SplitPaneMode from '../../components/SplitPaneMode';

const LayoutDefaultPlugin = () => {
  return {
    components: {
      LayoutDefault,
      EditorPane,
      EditorTextArea,
      SplitPaneMode,
      // Topbar,
    },
    // statePlugins: {
    //   ide: {},
    // },
    // wrapComponents: {},
  };
};

// load into swagger-ui as a 'preset' collection of plugins
export default function layoutDefaultPreset() {
  return [LayoutDefaultPlugin, TopbarPlugin];
}
