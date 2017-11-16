import React from 'react'
import { Drawer } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import InboxIcon from 'material-ui-icons/Inbox'
import HomeIcon from 'material-ui-icons/Home'
import HelpIcon from 'material-ui-icons/Help'
import FavoriteIcon from 'material-ui-icons/Favorite'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const sideList = (
  <div>
    <List>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link to="/resources">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <Link to="/about">
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </Link>
      <Link to="/in-memory">
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="In Memory" />
        </ListItem>
      </Link>
    </List>
  </div>
)

const withDrawer = function(PageComponent) {
  const WrapDrawerComponent = props => {
    return (
      <div>
        <PageComponent />
        <Drawer open={props.open} onRequestClose={props.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={props.toggleDrawer}
            onKeyDown={props.toggleDrawer}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
  const mapStateToProps = state => {
    return { open: state.drawer.open }
  }
  const mapActionsToProps = dispatch => {
    return {
      toggleDrawer: () => {
        dispatch({ type: 'TOGGLE_DRAWER' })
      }
    }
  }
  const connector = connect(mapStateToProps, mapActionsToProps)
  return connector(WrapDrawerComponent)
}

export default withDrawer
