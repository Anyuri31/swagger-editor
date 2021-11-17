import { getLanguageService, isJsonDoc, FORMAT } from '@swagger-api/apidom-ls';
import { TextDocument } from 'vscode-languageserver-textdocument';
import YAML from 'js-yaml';

import config from '../workers/apidom/config/config';

export async function dereference(editor) {
  const apidomContext = {
    metadata: config(),
  };
  const languageService = getLanguageService(apidomContext);

  try {
    const textDoc = TextDocument.create(
      editor.getModel().uri.toString(),
      editor.getModel().getModeId(),
      editor.getModel().getVersionId(),
      editor.getModel().getValue()
    );
    const context = {
      format: isJsonDoc(textDoc) ? FORMAT.JSON : FORMAT.YAML,
      baseURI: window.location.href,
    };
    const result = await languageService.doDeref(textDoc, context);

    if (!result) {
      return { error: 'an error has occured for: dereference' };
    }
    if (!isJsonDoc(textDoc)) {
      const tempjsContent = YAML.load(result);
      const tempyamlContent = YAML.dump(tempjsContent);
      editor.setValue(tempyamlContent);
    } else {
      editor.setValue(result);
    }
    return { data: 'ok' };
  } catch (e) {
    return { error: e.message };
  }
}

export default { dereference };
