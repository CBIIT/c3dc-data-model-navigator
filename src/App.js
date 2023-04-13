import React from 'react';
import './App.css';
import { ReduxDataDictionary, getModelExploreData } from 'data-model-navigator';
import store from './store';
import {
  filterConfig,
  pdfDownloadConfig,
  readMeConfig,
  controlVocabConfig,
  graphViewConfig,
} from './dataDictionaryData';

const DATA_MODEL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tools/master/model-desc/icdc-model.yml?token=GHSAT0AAAAAAB7VEUK4VKTLAQPJLOTJVPFMZBYKXCQ';
const DATA_MODEL_PROPS = 'https://raw.githubusercontent.com/CBIIT/c3dc-model-data-viz/main/model-desc/c3dc-model-props.yml';
const DATA_MODEL_README = 'https://raw.githubusercontent.com/CBIIT/c3dc-model-data-viz/main/README.md';

async function getData() {
  const response = await getModelExploreData(DATA_MODEL, DATA_MODEL_PROPS);
  Promise.all(
    [
      store.dispatch({
        type: 'REACT_FLOW_GRAPH_DICTIONARY',
        dictionary: response.data,
        pdfDownloadConfig,
        graphViewConfig,
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        payload: {
          data: response.data,
          facetfilterConfig: filterConfig,
          readMeConfig: {
            readMeUrl: DATA_MODEL_README,
            readMeTitle: readMeConfig.title,
          },
          ctrlVocabConfig: controlVocabConfig,
          pdfDownloadConfig,
          graphViewConfig,
        },
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: response.version,
      }),
    ],
  );
}

function App() {
  if (!DATA_MODEL || !DATA_MODEL_PROPS || !DATA_MODEL_README) {
    return (
      <ul>
        {(!DATA_MODEL) && (<li>Provided URL for Data model </li>)}
        {(!DATA_MODEL_PROPS) && (<li>Provided URL for Data model Properties</li>)}
        {(!DATA_MODEL_README) && (<li>Provided URL for Data model ReadMe</li>)}
      </ul>
    );
  }
  getData();
  return (
    <ReduxDataDictionary pdfDownloadConfig={pdfDownloadConfig} />
  );
}

export default App;
