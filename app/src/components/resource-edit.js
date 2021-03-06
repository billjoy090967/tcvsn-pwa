import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SaveIcon from 'material-ui-icons/Save'
import { map } from 'ramda'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

const categoryMenuItem = category => {
  return <MenuItem value={category._id}>{category.name}</MenuItem>
}

class EditResourceForm extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <form
        style={{ marginTop: 8 }}
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmit()
        }}
      >
        <FormControl className={classes.input} required>
          <InputLabel htmlFor="categoryId">Category</InputLabel>
          <Select
            name="categoryId"
            value={this.props.editResource.categoryId}
            onChange={e => {
              this.props.onChange('categoryId', e.target.value)
            }}
            input={<Input id="categoryId" required />}
            autoWidth
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {map(categoryMenuItem, this.props.categories)}
          </Select>
        </FormControl>
        <TextField
          name="formalName"
          label="Formal Name"
          value={this.props.editResource.formalName}
          onChange={e => {
            this.props.onChange('formalName', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="name"
          label="Short Name"
          value={this.props.editResource.name}
          onChange={e => {
            this.props.onChange('name', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
        />
        <TextField
          name="shortDesc"
          label="Short Description"
          value={this.props.editResource.shortDesc}
          onChange={e => {
            this.props.onChange('shortDesc', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="primaryPhone"
          label="Primary Phone"
          value={this.props.editResource.primaryPhone}
          onChange={e => {
            this.props.onChange('primaryPhone', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />

        <TextField
          name="purpose"
          label="Purpose"
          value={this.props.editResource.purpose}
          onChange={e => {
            this.props.onChange('purpose', e.target.value)
          }}
          margin="normal"
          className={classes.input}
          required
          multiline
        />
        <TextField
          name="website"
          label="Website"
          value={this.props.editResource.website}
          onChange={e => {
            this.props.onChange('website', e.target.value)
          }}
          margin="normal"
          className={classes.input}
        />

        <Button
          fab
          color="primary"
          type="submit"
          aria-label="edit"
          className="fab-button"
          disabled={this.props.isActive}
        >
          <SaveIcon />
        </Button>
      </form>
    )
  }
}

EditResourceForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditResourceForm)
