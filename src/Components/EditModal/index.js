import React from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';

export default class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      open: nextProps.open,
      handleClose: nextProps.handleClose,
      handleSave: nextProps.handleSave,
      clickedRow: nextProps.clickedRow,
      saving: nextProps.saving,
    }
  }



  componentDidMount = () => {
    let { name, age } = this.state.clickedRow
    this.setState({
      name,
      age
    })
  }




  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edit info
          {this.state.saving && <CircularProgress />}
          </DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={this.state.name}
              fullWidth
              onChange={(e) => {
                let { value } = e.target
                this.setState({
                  name: value
                })
              }}
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              fullWidth
              value={this.state.age}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                let { value } = e.target
                const onlyNums = value.replace(/[^0-9]/g, '');
                this.setState({ age: onlyNums });
              }}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={
              this.state.handleClose
            }
              color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              this.state.handleSave(this.props.match.params.id, this.state.name, this.state.age).then(this.state.handleClose)
            }}
              disabled={this.state.saving}
              color={!this.state.saving ? "primary" : "secondary"}>
              {this.state.saving ? 'Saving in progress' : 'Edit'}
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}