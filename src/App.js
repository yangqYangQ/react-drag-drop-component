import React, {useReducer} from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop';

function App() {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_DROP_DEPTH':
                return {...state, dropDepth: action.dropDepth};
            case 'SET_IN_DROP_ZONE':
                return {...state, inDropZone: action.inDropZone};
            case 'SET_FILES_TO_DROP':
                return {...state, fileList: state.fileList.concat(action.filesToDrop)};
            default:
                return {...state};
        }
    };

    const [data, dispatch] = useReducer(reducer, {
        dropDepth: 0,        //在拖拽区的文件个数
        inDropZone: false,   //是否在拖拽区
        fileList: []         //被拖拽进来的文件
    });

    return (
        <div className="App">
            <h1>React drap and drop component</h1>
            <DragAndDrop data={data} dispatch={dispatch}/>
            <ol className='dropedFiles'>
                {
                    data.fileList.map((file) => <li key={file.name}>{file.name}</li>)
                }
            </ol>
        </div>
    );
}

export default App;
