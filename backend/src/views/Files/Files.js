import React, { Component } from "react";
import {Button, Header, Icon, Input, Label, Modal, Table} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import {DraggableTableRow} from "../../components/CustomTable";
import { FireStore, Storage } from '../../services/firebase';

let collection = FireStore.collection('files');

class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: {
        name: '',
        url: '',
      },
      files: [],
      play: false,
      addModal: false,
      deleteModal: false,
    };
  }

  async componentDidMount() {
    const files = await this.getFiles();
    this.setState({
      files,
    });
    console.log(files);
  }

  togglePlay = url => async () => {
    const audio = new Audio(this.props.url);
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? audio.play() : audio.pause();
    });
  };

  getFiles = async () => {
    try {
      let snapshot = await collection.get();
      let files = await snapshot.docs.map(file => this.getFileById(file.id));
      return Promise.all(files);
    } catch (e) {
      throw e;
    }
  };

  getFileById = async fileId => new Promise((resolve, reject) => {
    let fileDoc = collection.doc(fileId);
    fileDoc.onSnapshot(async snapshot => {
      resolve(snapshot.data());
    })
  });

  addFile = () => {
    this.setState({
      addModal: !this.state.addModal,
    });
  };

  editFile = () => {
    this.setState({
      addModal: !this.state.addModal,
    });
  };

  deleteFile = () => {
    this.setState({
      deleteModal: !this.state.deleteModal,
    });

  };

  closeModal = () => {
    this.setState({
      addModal: false,
      deleteModal: false,
    })
  };

  swap(a, b) {
    let { files } = this.state;
    files[a] = files.splice(b, 1, files[a])[0];
    this.setState({
      ...this.state,
      files
    });
  }

  render() {
    let { files } = this.state;
    return (
      <div className="animated fadeIn">
        <Button
          onClick={this.addFile}
        ><Icon name='plus' />ADD</Button>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              {/*<Table.HeaderCell>Play</Table.HeaderCell>*/}
              {/*<Table.HeaderCell>Active</Table.HeaderCell>*/}
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {files.map((obj, i) => (
              <DraggableTableRow key={i} i={i} action={this.swap.bind(this)}>
                <Table.Cell>{obj.order}</Table.Cell>
                <Table.Cell>{obj.name}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={this.editFile}
                  >
                    <Icon name='edit' />
                  </Button>
                  <Button
                    onClick={this.deleteFile}
                  >
                    <Icon name='trash alternate' />
                  </Button>
                </Table.Cell>
                {/*<Table.Cell><button onClick={this.togglePlay(obj.url)}>{this.state.play ? 'Pause' : 'Play'}</button></Table.Cell>*/}
                {/*<Table.Cell>{String(obj.active)}</Table.Cell>*/}
              </DraggableTableRow>
            ))}
          </Table.Body>
        </Table>
        <Modal open={this.state.addModal} size='small'>
          <Header icon='plus' content='Add file' />
          <Modal.Content>
            <span>File Name: </span>
            <Input />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color='red'
              onClick={this.closeModal}
            >
              <Icon name='remove' /> Cancel
            </Button>
            <Button
              color='green'
              inverted
              onClick={this.addFile}
            >
              <Icon name='checkmark' /> Save
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal open={this.state.deleteModal} basic size='small'>
          <Header icon='remove' content='Delete file' />
          <Modal.Content>
            <p>
              Are you sure you want to delete this file?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color='red'
              inverted
              onClick={this.closeModal}
            >
              <Icon name='remove' /> No
            </Button>
            <Button
              color='green'
              inverted
              onClick={this.deleteFile}
            >
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };
}

export default Files;
