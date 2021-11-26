import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncApiReactComponent from '@asyncapi/react-component';
import '@asyncapi/react-component/styles/default.min.css';
import { parse } from '@asyncapi/parser';

export default function AsyncApiComponent(props) {
  const [isValid, setIsValid] = useState(false);
  const [parsedSpec, setParsedSpec] = useState(null);

  // Todo: extract into a helper utiL
  const useDebounce = (value, delay) => {
    // eslint-disable-next-line no-unused-vars
    useEffect(() => {
      const timer = setTimeout(() => {
        parse(value)
          .then((doc) => {
            setIsValid(true);
            setParsedSpec(doc);
          })
          .catch(() => {
            setIsValid(false);
          });
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
    return parsedSpec;
  };

  const getSelectorSpecStr = () => {
    const { specSelectors } = props;
    const initialValue = 'Welcome to the AsyncAPI React Component';
    // get spec from swagger-ui state.spec
    const spec = specSelectors.specStr();
    return spec || initialValue;
  };

  const spec = getSelectorSpecStr();
  const debouncedParsedSpec = useDebounce(spec, 500);

  const config = {
    show: {
      errors: true, // config setting to show error pane
    },
  };
  if (!isValid) {
    return (
      <div id="ui-pane" className="ui-pane">
        <div className="flex flex-1 overflow-hidden h-full justify-center items-center text-2xl mx-auto px-6 text-center">
          <p>Empty or invalid document. Please fix errors/define AsyncAPI document.</p>
        </div>
      </div>
    );
  }
  return (
    <div id="ui-pane" className="ui-pane">
      <AsyncApiReactComponent schema={debouncedParsedSpec} config={config} />
    </div>
  );
}

AsyncApiComponent.propTypes = {
  specSelectors: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
