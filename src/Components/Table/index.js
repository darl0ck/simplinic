import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';

import EditModal from '../EditModal'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedRow: {},
      open: false
    }
  }

  handleClose = (props) => {
    this.setState({ exit: true });
    return props.history.push('/')
  }


  handleSave = (id, name, age) => {
    this.setState({
      saving: true
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let info = JSON.parse(localStorage.getItem('data'));

        let dataClone = [...info]
        dataClone[id] = {
          id,
          name,
          age
        }

        localStorage.setItem('data', JSON.stringify(dataClone))
        this.setState({
          saving: false
        })
        return resolve("result");
      }, 5000)
    });
  }

  render() {
    const { classes } = this.props;
    let info = JSON.parse(localStorage.getItem('data'));
    return (
      <Router>
        <>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              {info && <TableBody>
                {info.map((row, id) => (
                  <TableRow
                    hover
                    key={id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        aria-label="Edit"
                        onClick={() => {
                          this.setState({
                            open: true,
                            clickedRow: { ...row, id },
                          })
                        }}
                        to={`/modal/${id}`}

                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              }

            </Table>
          </Paper>
          <Route exact path="/modal/:id" render={(props) =>
            <>
              <EditModal
                {...props}
                open={true}
                handleClose={() => this.handleClose(props)}
                handleSave={this.handleSave}
                saving={this.state.saving}
                clickedRow={info[props.match.params.id]} />

            </>
          }
          />
        </>
      </Router>
    )
  }
}

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableComponent);