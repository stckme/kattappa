import React from 'react';

import TextComponent from '../components/base-editor';
import { baseTextOptions } from '../components/scribe-options';
import { getEmptyContent } from '../utils';

class BlockText extends React.Component {

  constructor(props) {
    super(props);
    this.textBlock = null;
    this.captureReturn = this.captureReturn.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
    this.splitBlock = this.splitBlock.bind(this);
  }

  captureReturn() {
    this.props.addBlock("text", this.props.position);
  }

  onContentChanged(content) {
    if(this.props.onContentChanged) {
      this.props.onContentChanged(this.props.position, content);
    }
  }

  splitBlock(e) {
    this.props.splitBlock(this.props.position, this.textBlock.editor.getHTML());
  }

  render() {
    return (
      <div className="katap-block katap-text">
        <div className="katap-toolbar-wrapper katap-clearfix">
          <button
            className="katap-splitter"
            onClick={this.splitBlock}
            title="Click to split this block. Content should be separated by a new line."
          >&lt;/&gt;</button>
        </div>
        <TextComponent
          ref={(node) => {this.textBlock=node}}
          content={this.props.content}
          options={baseTextOptions}
          onContentChanged={this.onContentChanged} 
        />
      </div>
    );
  }
}

let Text = {
  Name: 'text',
  React: BlockText,
  Icon: '',
  Empty: function() {
    return getEmptyContent();
  },
  maximumBlocks: 0,
  Description: 'Text',
  isEmpty: function(content) {
    return (content.replace(/(<([^>]+)>)/ig,'') === '');
  },
};

export default Text;
