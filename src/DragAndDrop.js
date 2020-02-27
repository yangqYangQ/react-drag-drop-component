//拖拽组件

import React from 'react';

const dragAndDrop = ({data, dispatch}) => {
    //拖入
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1});
    };

    //拖出
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1});
        if (data.dropDepth > 0) return;
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: false});
    };

    //正在当前元素范围内拖拽
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = 'copy';
        dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: true});
    };

    //完成拖入动作
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];
        if (files && files.length > 0) {
            const existingFiles = data.fileList.map((file) => file.name);
            files = files.filter((file) => !existingFiles.includes(file.name));

            dispatch({type: 'SET_FILES_TO_DROP', filesToDrop: files});
            e.dataTransfer.clearData();
            dispatch({type: 'SET_DROP_DEPTH', dropDepth: 0});
            dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: false});
        }
    };

    return (
        <div className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
             onDragEnter={(e) => handleDragEnter(e)}
             onDragLeave={(e) => handleDragLeave(e)}
             onDragOver={(e) => handleDragOver(e)}
             onDrop={(e) => handleDrop(e)}
        >
            <p>Drap files here to Upload</p>
        </div>
    );
};

export default dragAndDrop;