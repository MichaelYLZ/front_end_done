import React from 'react';
import { render } from 'react-dom';
import uuid from "uuid";
import './App.css'; 
import CreateContainer from './components/CreateContainer.js';
import SenContainer from './components/SenContainer.js';



class App extends React.Component {
    
    state = {
        sentences: [
            {
                sentence: '我是高邮人。',
                id: uuid.v4()
            },
            {
                sentence: '今天天气很好。',
                id: uuid.v4()
            },
            {
                sentence: '马上要春节啦。。',
                id: uuid.v4()
            },
            {
                sentence: '最后一句。。',
                id: uuid.v4()
            }
        ]
    };

    handleEditSubmit = (attrs) => {
        this.updateSen(attrs);
    };

    handleDeleteClick = (senID) => {
        this.deleteSen(senID)
    }
    
    handleCreateSen = senObjNew => {
        this.createSentece(senObjNew)
    }
    
    createSentece = (senObj) => {
        const s = helpers.createNewSen(senObj);
        this.setState({
            sentences: [...this.state.sentences, s]
        })
    }

    updateSen = (attrs) => {
        
     this.setState({
      sentences: this.state.sentences.map((senInState)=>{
            if(senInState.id === attrs.id) {
                return Object.assign({}, senInState, {
                    sentence: attrs.sentence
                })
            } else {
                return senInState;
            }
        })
     })
        
    };

    deleteSen = (senID) => {
     this.setState({
       sentences: this.state.sentences.filter((s) => {
              return s.id !== senID; 
           }) 
        })
    }
    
    render() {
        
        const {
            sentences
        } = this.state;
        
        return (
          <main>
            
          {
             sentences.map(sentenceObj => {
               return <SenContainer 
                       words={sentenceObj.sentence} 
                       key={sentenceObj.id}
                       id={sentenceObj.id}
                       onEditSubmit={this.handleEditSubmit}
                       onDeleteClick={this.handleDeleteClick}
                       />
             }) 
          }
          
          <CreateContainer 
          onHandleCreateSen={this.handleCreateSen}
          />
            
          </main>
        )
    }
}

render(<App />, document.getElementById('app'));
